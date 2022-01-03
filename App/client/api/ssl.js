import { readData, storeData } from "../LocalStore";

const createPublicKey = () => {

}


export function encrypt(data, publicKey){
    return data;
}

export function decrypt(){

}

export function getClientPublicKey(){
    if(dataExists('@public_key_client')){
        readData('@public_key_client').then((data) => {
            return data
        })
    }
    else{
        fetchPublicKey().then((data) => {
            storeData('@public_key_client', data)
            return data
        })
    }
}

export default { encrypt, decrypt }