import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import Swiper from 'react-native-swiper'

import LogIn from './LogIn';
import Social from "./Social/Social"
import Casino from "./Casino/Casino"
import styles from './Styles';
import Home from "./Home/Home"

const MainPage = () => {
    return (
        <Swiper loop={false} index={1}>
            <Casino></Casino>
            <Home></Home>
            <Social></Social>
        </Swiper>
    );
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            page: <LogIn LogInHandeler={this.LogInHandeler} />
        }
    }

    LogInHandeler = (data) => {
        this.setState({
            page: <MainPage/>
        })
    }

    render() {
        return (
            this.state.page
        )
    }
}

export default App;