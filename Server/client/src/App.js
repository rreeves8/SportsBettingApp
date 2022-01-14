import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { component } from "react"
import ls from 'local-storage'
import { newUUID } from './tools.js'
var RSAKey = require('react-native-rsa');

const api = axios.create({ baseURL: 'http://localhost:5000' })

const keyExists = (key) => {
    let data = ls.get(key)

    if (data !== null) {
        return true
    }
    else {
        return false
    }
}

const getServerkey = async (forceUpdate) => {
    let sKey
    if (!keyExists('sKey') || forceUpdate) {
        const keyObj = await api.get('/getPublicKey')
        sKey = JSON.parse(keyObj.data.key)
        ls.set('sKey', sKey)
    }
    else {
        sKey = ls.get('sKey')
    }
    return sKey
}

class LogIn extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async logIn() {
        console.log("LoggedIn pressed")

        let uuid;
        if (keyExists('id')) {
            uuid = ls.get('id')
        }
        else {
            uuid = newUUID()
            ls.set('id', uuid)
        }

        let sKey = await getServerkey()

        let fixedSKey = {
            "n": sKey.n,
            "e": sKey.e
        }
        sKey = JSON.stringify(fixedSKey)

        var rsa = new RSAKey()
        rsa.setPublicString(sKey)

        var cRSA = new RSAKey()

        if (keyExists('cKeys')) {
            let cKeys = ls.get('cKeys')
            cRSA.setPublicString(cKeys.pub)
            cRSA.setPrivateString(cKeys.priv)
        }
        else {
            cRSA.generate(1024, '10001')
            ls.set('cKeys', { pub: cRSA.getPublicString(), priv: cRSA.getPrivateString() })
        }

        let data = {
            credentials: {
                email: rsa.encrypt(this.state.email),
                password: rsa.encrypt(this.state.password)
            },
            deviceID: rsa.encrypt(uuid),
            publicKey: cRSA.getPublicString()
        }

        const response = await api.post('/login', { ...data }, {
            headers: {
                'Content-Type': 'json',
            }
        })

        let decryptedRes = cRSA.decrypt(response.data.status)

        console.log(decryptedRes)
        if (decryptedRes === "bad key") {
            getServerkey(true)
            this.logIn()
        }
        else{
            alert(decryptedRes)
        }
    }

    handleChange(event) {

        if (event.target.type === 'password') {
            this.setState({
                password: event.target.value
            })
        }
        else {
            this.setState({
                email: event.target.value,
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <h1> Log In </h1>
                <div>
                    <ul>
                        <label>Username : </label>
                        <input value={this.state.email} onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" />
                    </ul>
                    <ul>
                        <label>Password : </label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" />
                    </ul>
                    <button className='entry' onClick={() => this.logIn()}>LogIn</button>


                </div>
            </div>
        )
    }
}

function App() {
    return (
        <div className="App">
            <LogIn />
        </div>
    );
}

export default App;
