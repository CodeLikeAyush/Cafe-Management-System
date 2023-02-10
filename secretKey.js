const secretKeyGenerator = () => {

    const crypto = require('crypto');


    const secretKey = crypto.randomBytes(64).toString('hex');

    return secretKey;

}

module.exports = secretKeyGenerator;