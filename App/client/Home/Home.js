import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchCurrentPools } from '../api/api'

const styles = StyleSheet.create({
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

    currentPoolsTitleText: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    },

    currentPoolsTitle: {
        marginTop: 30,
        marginLeft: 75,
        marginRight: 75,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
    },

    currentPoolContainer: {
        marginTop: 5,
        marginLeft: 100,
        width: 200,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#ffffff",
        color: "#20232a",
    },
    currentPoolText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },

    createPoolButton: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 35,
        paddingVertical: 4,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
    },

    circleButtonContainer: {
        zIndex: 0,
    },

    circleButton: {
        backgroundColor: "#61dafb",
        borderWidth: 3,
        borderRadius: (40 / 2),
        justifyContent: 'center',
        alignContent: 'center',
        width: 40,
        height: 40,
    },

    PoolsCompContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: "center"
    },
    buttonNum: {
        textAlign: "center"
    }

})

const PoolsComp = (props) => {
    const buttonPress = () => {
        console.log("im gay")
    }

    let poolsHTML = [...new Array(props.pools.length)].map((x, index) => {
        return (
            <View style={styles.PoolsCompContainer} key={index}>
                <View style={styles.currentPoolContainer}>
                    <Text style={styles.currentPoolText}> {props.pools[index]["sport"]} </Text>
                </View>
                <View style={styles.circleButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8} //The opacity of the button when it is pressed
                        style={styles.circleButton}
                        onPress={buttonPress}
                    >
                        <Text style={styles.buttonNum}>
                            {props.pools[index]["members"].toString()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    })
    return (
        <View>
            {poolsHTML}
        </View>
    )
}

const CurrentPools = () => {
    const [pools, setPools] = useState([])

    useEffect(() => {
        fetchCurrentPools().then((data) => {
            setPools(data)
        })
    }, [])

    return (
        <PoolsComp pools={pools}></PoolsComp>
    )
}

function HomePage(props) {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Pool Bet</Text>
            </View>
            <View style={styles.currentPoolsTitle}>
                <Text style={styles.currentPoolsTitleText}>Current Pools</Text>
            </View>
            <CurrentPools />
            <View style={styles.createPoolButton}>
                <Button
                    onPress={() => { props.navigation.navigate("NewPool") }}
                    title="Create Pool"
                    color="#20232a"
                    textAlign="center"
                    fontSize="20"
                    fontWeight="bold"
                />
            </View>
            <View style={styles.createPoolButton}>
                <Button
                    onPress={() => { props.navigation.navigate("BrowsePublicPools")}}
                    title="Browse Public Pools"
                    color="#20232a"
                    textAlign="center"
                    fontSize="20"
                    fontWeight="bold"
                />
            </View>
        </View>
    )
}

export default HomePage;