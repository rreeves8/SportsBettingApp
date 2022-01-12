import api from './connection'
import { encrypt, decrypt } from "./ssl"
import { addUser, isCorrect, isLoggedIn , logOut } from "../KeyStore"


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

export async function logInAPI(credentials){
    return await encrypt(credentials)
    // const encrypted = encrypt(credentials)

    /*
    const encrpytedResponse = await api.post('/login', {
        ...encrypted
    })
    encrpytedResponse.then((data)=> {
        return decrypt(data)
    })
    */
}

export async function fetchCurrentPools(){
    return [{sport: "Hockey", members: 4}, {sport: "Foot Ball", members: 8}]
}

export async function getFreinds(){
    return [{name: "Mac", id: 'dsfw3', image: 'null'},{name: "Mac", id: 'dsfw3', image: 'null'},{name: "Mac", id: 'dsfw3', image: 'null'}, ]
}

export default { getFreinds, fetchCurrentPools, logInAPI }