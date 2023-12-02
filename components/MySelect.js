import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MySelect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={() => this.props.fun(this.props.text)}
                background={TouchableNativeFeedback.Ripple('#ffffff', true)}
            >
                <View style={{
                    backgroundColor: this.props.sel ? this.props.acolor : this.props.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10 * this.props.x,
                    height: 10 * this.props.x,
                    width: 10 * this.props.x,
                }}>
                    <Text style={{ fontSize: 16, color: this.props.tcolor, fontFamily: 'myfont', }}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableNativeFeedback>

        );
    }
}
