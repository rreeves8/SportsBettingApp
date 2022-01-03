import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const PublicPools = ({navigation}) => {
    return (
        <View>
            <View>
                <Text>Title</Text>
            </View>
            <View>
                <Text>Title</Text>
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
            </View>
        </View>
    )
}

export default PublicPools;