import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../Styles';
import { getFreinds } from '../api/api';

const FriendsComp = (props) => {
    let freinds = props.freinds
    let freindsHTML = [...new Array(freinds.length)].map((x, index) => {
        return (
            <View key = {index}>
                <Text>
                    {freinds[index]['name']}
                </Text>
            </View>
        )
    })
    return (
        <View>
            {freindsHTML}
        </View>
    )
}

const Friends = () => {
    const [freinds, setFreinds] = useState([])

    useEffect(() => {
        getFreinds().then((data) => {
            setFreinds(data)
        })
    }, [])

    return (
        <FriendsComp freinds = {freinds}/>
    )
}


const SocialPage = () => {
    return (
        <View style={styles.socialContainer}>
            <Text style={styles.title}>Social</Text>
            <Friends/>
        </View>
    )
}

export default SocialPage;