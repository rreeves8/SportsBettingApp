import React, { Component, useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, StyleSheet } from 'react-native';

import Slider from '@react-native-community/slider';
import { Switch } from 'react-native-material-kit';

const Freinds = () => {
    let freinds = ['magnus', 'james']

    return (
        <Text>{freinds}</Text>
    )
}

const NewPool = ({ navigation }) => {
    const [text, setText] = useState("")

    return (
        <View>
            <View>
                <Text></Text>
            </View>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={e => setText(e.value)}
                    value={text}
                    keyboardType="default"
                />
            </SafeAreaView>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <View>
                <Text>Rebuy</Text>
                <Switch
                    onColor="rgba(255,152,0,.3)"
                    rippleColor="rgba(255,152,0,.2)"
                    onPress={() => console.log('orange switch pressed')}
                    onCheckedChange={(e) => console.log('orange switch checked', e)}
                />
            </View>
            <View>
                <Text>Buy In $</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => setText(e.value)}
                        value={text}
                        keyboardType="default"
                    />
                </SafeAreaView>
            </View>
            <View>
                <Text>Invite Freinds</Text>

                <Button
                    onPress={() => { console.log("added freind") }}
                    title="Add freind"
                    color="#20232a"
                    textAlign="center"
                    fontSize="20"
                    fontWeight="bold"
                />

                <Freinds />
            </View>

            <View>
                <Text>Public</Text>
                <Switch
                    onColor="rgba(255,152,0,.3)"
                    rippleColor="rgba(255,152,0,.2)"
                    onPress={() => console.log('orange switch pressed')}
                    onCheckedChange={(e) => console.log('orange switch checked', e)}
                />
            </View>
            <View>
                <Button
                    onPress={() => { navigation.goBack()}}
                    title="Go Back"
                    color="#20232a"
                    textAlign="center"
                    fontSize="20"
                    fontWeight="bold"
                />
                <Button
                    onPress={() => { console.log("added freind") }}
                    title="Create Pool"
                    color="#20232a"
                    textAlign="center"
                    fontSize="20"
                    fontWeight="bold"
                />
            </View>
        </View>
    )
}


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
    appleButton: {
        width: '100%',
        height: 45,
        shadowColor: '#555',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginVertical: 15,
    }
})

export default NewPool;