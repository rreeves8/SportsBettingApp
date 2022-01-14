import crypto from 'crypto-js'

export function encryptDB(data, password) {
    var ciphertext = crypto.AES.encrypt(data, password).toString()
    return ciphertext
}

export function decryptDB(data, password) {
    var bytes = crypto.AES.decrypt(data, password);
    var decryptedData = bytes.toString(crypto.enc.Utf8);
    return decryptedData
}

export function createKeys() {
    generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
        }
    }, (err, publicKey, privateKey) => {
        console.log(publicKey)
        console.log(privateKey)
    });
}