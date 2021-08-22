const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:jhonatan.vanegas@divergente.net.co',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

module.exports = webpush;