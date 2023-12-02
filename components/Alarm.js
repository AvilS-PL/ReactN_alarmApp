import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MyButton from './MyButton';
import Database from './Database';


export default class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    add = () => {
        Database.add()
    }

    render() {
        return (
            <View style={{ backgroundColor: "#212121", flex: 1 }}>
                <Text style={{ color: "white", fontSize: 80, textAlign: "center", fontFamily: "myfont" }}>Create alarm</Text>
                <View style={{ position: "absolute", left: 0, right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ elevation: 3, backgroundColor: "#FFA000", borderRadius: 4 }}>
                        <MyButton fun={this.add} text="plus-box-outline" color="#FFA000" tcolor="white" x="6" y="6" r="4" s="40" />
                    </View>
                </View>
            </View>
        );
    }
}
