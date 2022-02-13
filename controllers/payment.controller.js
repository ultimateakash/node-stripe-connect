const config = require('../config/stripe');
const stripe = require('stripe')(config.secretKey);
const httpBuildQuery = require('http-build-query');

const index = (req, res) => {
	const queryData = {
		response_type: 'code',
		client_id: config.clientId,
		scope: 'read_write',
		redirect_uri: config.redirectUri
	}
	const connectUri = config.authorizationUri + '?' + httpBuildQuery(queryData);
	res.render('index', { connectUri, error: req.flash('error') })
}

const redirect = async (req, res) => {
	if (req.query.error) {
		req.flash('error', req.query.error.error_description)
		return res.redirect('/');
	}
	const token = await getToken(req.query.code);
	if (token.error) {
		req.flash('error', token.error)
		return res.redirect('/');
	}
	const connectedAccountId = token.stripe_user_id;
	const account = await getAccount(connectedAccountId);
	if (account.error) {
		req.flash('error', account.error)
		return res.redirect('/');
	}
	res.render('account', { account });
}

const getToken = async (code) => {
	let token = {};
	try {
		token = await stripe.oauth.token({ grant_type: 'authorization_code', code });
	} catch (error) {
		token.error = error.message;
	}
	return token;
}

const getAccount = async (connectedAccountId) => {
	let account = {};
	try {
		account = await stripe.account.retrieve(connectedAccountId);
	} catch (error) {
		account.error = error.message;
	}
	return account;
}

module.exports = {
	index,
	redirect
}
