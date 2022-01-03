import React, { Component, useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PublicPools from './PublicPools'
import CreatePool from './CreatePool'
import LogIn from './LogIn';
import Social from "./Social/Social"
import Casino from "./Casino/Casino"
import Home from "./Home/Home"

const styles = StyleSheet.create({
    socialContainer: {
        flex: 1,
        backgroundColor: "#61dafb",
    },
    casinoContainer: {
        flex: 1,
        backgroundColor: "#61dafb",
    },
    logInContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#20232a"
    },
    title: {
        marginTop: 55,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },


    logInButton: {
        marginLeft: 150,
        marginRight: 150,
        marginTop: 10,
        paddingVertical: 4,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

const MainPage = ({ navigation }) => {
    return (
        <Swiper loop={false} index={1}>
            <Casino></Casino>
            <Home navigation={navigation}></Home>
            <Social></Social>
        </Swiper>
    );
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            page: "MainPage",
            Stack: createNativeStackNavigator()
        }
        /*
        this.state = {
            page: <LogIn LogInHandeler={this.LogInHandeler} />
        }
        */
    }

    LogInHandeler = (data) => {
        this.setState({
            page: "MainPage"
        })
    }

    render() {
        const Stack = this.state.Stack
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="MainPage"
                        component={MainPage}
                    />
                    <Stack.Screen
                        name="NewPool"
                        component={CreatePool}
                    />
                    <Stack.Screen
                        name = "BrowsePublicPools"
                        component ={PublicPools}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;