import AsyncLocalStorage from "async-local-storage"

export async function storeData(key, value){
    try {
        await AsyncLocalStorage.setItem(key, value)
    } catch (e) {
        console.log("error")
    }
}

export async function readData(key){
    let data
    try {
        data = await AsyncLocalStorage.getItem(key)
    } catch (e) {
        console.log("error")
    }

    return data
}

export async function dataExists(key){
    let data = await getData(key)
 
    if (typeof data === 'undefined'){
        return false
    }
    else{
        return true
    }
}

export default { dataExists, readData, storeData }