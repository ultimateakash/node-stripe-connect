 module.exports = {
    clientId: process.env.STRIPE_CLIENT_ID,  // Client ID: https://dashboard.stripe.com/account/applications/settings
    secretKey: process.env.STRIPE_SECRET_KEY,   // Secret KEY: https://dashboard.stripe.com/account/apikeys
    redirectUri: process.env.STRIPE_REDIRECT_URI, // Redirect Uri https://dashboard.stripe.com/account/applications/settings
	authorizationUri: 'https://connect.stripe.com/oauth/authorize'
}
