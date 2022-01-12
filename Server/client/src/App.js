import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { component, useState, useEffect } from "react"

const resposneReporter = (res) => {
    if(res.data === 'noToken'){
        return "LOGIN REQUIRED"
    }
    if(res.data === 'badTOKEN'){
        

        return "GETTING NEW KEY"
    }
}


const LogIn = () => {
    const [response, setResponse] = useState("")

    useEffect(() => {
        const login = async () => {
            try{
                let data = await axios.get('http://localhost:3001/getPublicKey')
                setResponse(data)
                console.log(data)
            }
            catch(e){
                console.log(e)
            }
        }
        login()
    })

    return (
        <div>
            {JSON.stringify(response.data)}
        </div>
    )
}

const GetFriends = () => {
    const [response, setResponse] = useState("")

    useEffect(() => {
        const login = async () => {
            try{
                let data = await axios.get('http://localhost:8080/freindList')
                


                
                setResponse(data)
            }
            catch(e){
                console.log(e)
            }
        }
        login()
    })

    return (
        <div>
            {JSON.stringify(response.data)}
        </div>
    )
}

function App() {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </header>

                    <LogIn />
                    <GetFriends></GetFriends>

                </div>
            );
        }

export default App;
