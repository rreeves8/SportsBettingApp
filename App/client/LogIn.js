import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import styles from './Styles';
import * as LocalAuthentication from 'expo-local-authentication'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isLoggedIn } from './KeyStore';
import { logInAPI } from './api/api'

const Stack = createNativeStackNavigator();

class InputUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: "",
            pass: "",
            nav: props.nav
        }
    }

    onChangeUSR = (event) => {
        this.setState({
            usr: event.value
        })
    }

    onChangePASS = (event) => {
        this.setState({
            pass: event.value
        })
    }

    buttonPress = () => {
        logInAPI().then((data) => {
            console.log(data)
            if (data === 'ok') {
                this.state.nav.navigate("MainPage")
            }
        })


    }

    render() {
        return (
            <View style={styles.logInContainer}>
                <Text style={styles.title}>LOGIN</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onChangeUSR}
                        value={this.state.usr}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onChangePASS}
                        value={this.state.pass}
                        keyboardType="default"
                    />
                </SafeAreaView>
                <View style={styles.logInButton}>
                    <Button
                        onPress={this.buttonPress}
                        title="LOGIN"
                        color="#20232a"
                        textAlign="center"
                        fontSize="20"
                        fontWeight="bold"
                    />
                </View>

                <Text>

                </Text>
            </View>
        )
    }
}

const onFaceId = async (navigation) => {
    try {
        // Checking if device is compatible
        const isCompatible = await LocalAuthentication.hasHardwareAsync();

        if (!isCompatible) {
            throw new Error('Your device isn\'t compatible.')
        }

        // Checking if device has biometrics records
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isEnrolled) {
            throw new Error('No Faces / Fingers found.')
        }

        // Authenticate user
        await LocalAuthentication.authenticateAsync();

        Alert.alert('Authenticated', 'Welcome back !')
    } catch (error) {
        navigation.navigate('NewUser')
    }
};

const FaceId = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>That is a simple example on how to use Face ID / Touch ID on React Native!</Text>
            <Button title="Sign in with Face ID" onPress={onFaceId(navigation)} />
        </View>
    )
}

const LogIn = (properties) => {
    const [type, setType] = useState("NewUser")
    useEffect(() => {
        async function HollyFuckThisISGay() {
            const yesno = await isLoggedIn()
            if (yesno) {
                setType("FaceId")
            }
            else {
                setType("InputUser")
            }
        }
        HollyFuckThisISGay()
    }, [])

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                initialRouteName={type}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="InputUser"
                >
                    {props => <InputUser {...props} nav={properties.navigation} />}
                </Stack.Screen>

                <Stack.Screen
                    name="FaceId"
                    component={FaceId}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default LogIn;