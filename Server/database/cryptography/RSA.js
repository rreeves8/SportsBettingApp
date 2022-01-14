import RSAKey from 'react-native-rsa'
import { getServerKey } from "../mongo/fetch.js"
import { addServerKey } from '../mongo/insert.js';

const bits = 1024;
const exponent = '10001';

export async function rsa(){
    let pubKey = await getServerKey('Public')
    let privKey = await getServerKey('Private')

    var rsa = new RSAKey();

    if(pubKey === null){
        rsa.generate(bits, exponent);
        addServerKey(rsa.getPublicString(), 'Public')
        addServerKey(rsa.getPrivateString(), 'Private')
    }
    else{
        rsa.setPrivateString(privKey.key)
        rsa.setPublicString(pubKey.key)
    }  

    return rsa
}

export function clientRSA(publicKey){
    var clientRsa = new RSAKey();
    clientRsa.setPublicString(publicKey)
    return clientRsa
}
