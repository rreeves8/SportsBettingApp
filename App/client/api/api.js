import axios from "axios"
import api from './connection'
import { encrypt, decrypt } from "./ssl"
import { readData, storeData, dataExists } from "../LocalStore"

const getServerPublicKey = () => {
    if(dataExists('@public_key_server')){
        readData('@public_key_server').then((data) => {
            return data
        })
    }
    else{
        fetchPublicKey().then((data) => {
            storeData('@public_key_server', data)
            return data
        })
    }
}


const fetchPublicKey = async () => {
    return await api.get('/publicKey')
}

const LogIn = async (credentials) => {
    const key = getServerPublicKey()
    
    let data = {
        credentials: credentials,

    }

    const encrypted = encrypt(credentials, key)

    const encrpytedResponse = await api.post('/login', {
        ...encrypted
    })

}

const Register = async (credentials) => {
    const response = await api.post('/register', {
        ...credentials
    })

    if(response.data === "OK"){
        
    }
}

const AppStates = async (credentials) => {
    const resposne = await api.get('/')
}

export async function fetchCurrentPools(){
    return [{sport: "Hockey", members: 4}, {sport: "Foot Ball", members: 8}]
}

export async function getFreinds(){
    return [ {name: "Mac", id: 'dsfw3', image: 'null'},{name: "Mac", id: 'dsfw3', image: 'null'},{name: "Mac", id: 'dsfw3', image: 'null'}, ]
}

export default { getFreinds, fetchCurrentPools}