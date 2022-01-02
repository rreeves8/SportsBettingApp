import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../Styles';

const Stack = createNativeStackNavigator();

class HomePage extends Component {
    homeScreen() {
        const fetchPools = () => {
            return (["Hockey", "BasketBall"])
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Pool Bet</Text>
                </View>
                <View>
                    <Text>Current Pools</Text>
                    <View>
                        <Text>{fetchPools()}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={this.homeScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default HomePage;