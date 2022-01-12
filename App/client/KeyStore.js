import AsyncStorage from '@react-native-async-storage/async-storage'
import random from "secure-random"

const getEncryptedPassword = (password) => {
    return crypto.scryptSync(password, random(10, { type: 'Buffer' }), 32);
}

const storeData = async (type, data) => {
    try {
        await AsyncStorage.setItem('@' + type, data)
    } catch (e) {
        console.log(e)
        throw e
    }
}

const getData = async (type) => {
    try {
        return await AsyncStorage.getItem('@' + type)
    } catch (e) {
        console.log(e)
        throw e
    }
}

export function addUser(user, password) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(getKey(password), new aesjs.Counter(5));
    var textBytes = aesjs.utils.utf8.toBytes(password)
    var encryptedBytes = aesCtr.encrypt(textBytes)
    //storeData(aesjs.utils.hex.fromBytes(encryptedBytes))
}

export function isCorrect(password) {
    var aesCtr = new aesjs.ModeOfOperation.ctr(getKey(password), new aesjs.Counter(5));

    getData('@password').then((encryptedBytes) => {
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

        if (decryptedText === password) {
            return true;
        }
        else {
            return false;
        }
    })
}

export async function isLoggedIn() {
    let data = await getData('@password')

    if (typeof data === 'undefined') {
        return false
    }
    else {
        return true
    }
}

export async function getKey(key) {
    return await getData(key)
}

export function storeKey(key, data) {
    storeData(key, data)
}

export async function logOut() {
    try {
        await AsyncStorage.removeItem('@password');
        return true;
    }
    catch (exception) {
        return false;
    }
}


export default { addUser, isCorrect, isLoggedIn, logOut, getKey, storeKey }