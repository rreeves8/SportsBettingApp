import { v4 as uuidv4 } from 'uuid';
var RSAKey = require('react-native-rsa');

export function newUUID() {
    return uuidv4()
}
export function serverRSA(publicKey){
    var rsa = new RSAKey();
    rsa.setPublicString(publicKey);

    return rsa
}

export function clientRSA() {
    const bits = 1024;
    const exponent = '10001';

    var clientRsa = new RSAKey();
    var cr = clientRsa.generate(bits, exponent);
    return cr
}
