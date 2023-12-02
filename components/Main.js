import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import MyButton from './MyButton';
import ListItems from './ListItems';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    test = () => {
        this.props.navigation.navigate("alarm")
    }

    render() {
        return (
            <View style={{ backgroundColor: "#212121", }}>
                <ScrollView>
                    <ListItems />
                </ScrollView>
                <View style={{ position: "absolute", left: 0, right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ elevation: 3, backgroundColor: "#FFA000", borderRadius: 4 }}>
                        <MyButton fun={this.test} text="plus-box-outline" color="#FFA000" tcolor="white" x="6" y="6" r="4" s="40" />
                    </View>
                </View>
            </View>
        );
    }
}
