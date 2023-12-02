import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: "#212121", flex: 1 }}>
                <Text> Clock </Text>
            </View>
        );
    }
}
