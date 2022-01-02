import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import styles from './Styles';
import * as LocalAuthentication from 'expo-local-authentication'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isLoggedIn, logOut, addUser } from './KeyStore';

const Stack = createNativeStackNavigator();

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usr: "",
            pass: "",
            LogInHandeler: props.LogInHandeler
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
        addUser('@' + this.state.usr, '@' + this.state.pass)
        this.state.LogInHandeler()
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
        }
        HollyFuckThisISGay()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={type}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="NewUser"
                >
                    {props => <NewUser {...props} LogInHandeler={properties.LogInHandeler} />}
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