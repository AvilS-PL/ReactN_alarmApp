import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={() => this.props.fun()}
                background={TouchableNativeFeedback.Ripple('#ffffff', false)}
            >
                <View style={{
                    backgroundColor: this.props.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1 * this.props.r,
                    height: 10 * this.props.y,
                    width: 10 * this.props.x,
                    transform: [this.props.rotated ? { rotate: "180deg" } : { rotate: "0deg" }]
                }}>
                    <MaterialCommunityIcons
                        name={this.props.text}
                        size={
                            this.props.s ? this.props.s * 1 : 22
                        }
                        color={this.props.tcolor} />
                </View>
            </TouchableNativeFeedback>
        );
    }
}
