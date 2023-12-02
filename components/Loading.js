import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as Font from "expo-font";

import Database from './Database';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            color: "white"
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/sup2.ttf'),
        });
        this.setState({ loaded: true, color: "white" })

        await Database.createTable()
    }

    test = () => {
        this.props.navigation.navigate("main")
    }

    render() {
        return (
            <View style={styles.center}>
                {this.state.loaded
                    ?
                    <TouchableOpacity onPress={() => this.test()} style={[styles.center]}>
                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 60,
                            color: "white",
                        }}>Alarm</Text>

                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 20,
                            color: "white"
                        }}>You can have</Text>

                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 20,
                            color: "white"
                        }}>alarm</Text>
                    </TouchableOpacity>
                    :
                    <ActivityIndicator size="large" color="#2196F3" />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFA000",
    }
});