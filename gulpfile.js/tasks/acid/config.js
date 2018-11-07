require('dotenv').config();

module.exports = {
    'mailgun': {
        'api_key': process.env.MAILGUN_API_KEY,
        'domain':  process.env.MAILGUN_DOMAIN,
        'from_address': process.env.MAILGUN_FROM_ADDRESS
    }
};
