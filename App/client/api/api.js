import axios from "axios"
import api from './connection'

const LogIn = async (credentials) => {
    const response = await api.post('/login', {
        ...credentials
    })

    if(response.data === "OK"){
        
    }
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