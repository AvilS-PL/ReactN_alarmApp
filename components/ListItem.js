import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MyButton from './MyButton';
import MySelect from './MySelect';
import Database from './Database';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vibrations: false,
            sound: false,
            height: new Animated.Value(140),
            expanded: false,
        };

        this.toValue = 0
    }

    componentDidMount = () => { }

    changeSound = () => {
        this.setState({
            sound: !this.state.sound
        })
    }

    changeVibrations = () => {
        this.setState({
            vibrations: !this.state.vibrations
        })
    }

    del = async () => {
        this.props.fun(this.props.id)
    }

    days = (x) => {
        console.log(x)
    }

    toggle = () => {
        if (this.state.expanded) this.toValue = 140
        else this.toValue = 200

        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();

        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (

            <Animated.View style={{
                overflow: 'hidden',
                height: this.state.height,
                backgroundColor: "#FF0000",
                margin: 10,
                borderRadius: 4,
            }} >
                {
                    <View style={styles.main}>
                        <View style={styles.top}>
                            <View style={styles.topLeft}>
                                <Text style={styles.txt}> {this.props.h}:{this.props.m}</Text>
                            </View>
                            <View style={styles.topRight}>
                                <View style={styles.swi}>
                                    <MaterialCommunityIcons name="speaker-wireless" size={24} color="white" />
                                    <Switch
                                        style={{ marginLeft: 10 }}
                                        trackColor={{ false: '#aaaaaa99', true: '#ffffff' }}
                                        thumbColor={this.state.sound ? '#ffffff' : '#cccccc'}
                                        onValueChange={this.changeSound}
                                        value={this.state.sound}
                                    />
                                </View>
                                <View style={styles.swi}>
                                    <MaterialCommunityIcons name="vibrate" size={24} color="white" />
                                    <Switch
                                        style={{ marginLeft: 10 }}
                                        trackColor={{ false: '#aaaaaa99', true: '#ffffff' }}
                                        thumbColor={this.state.vibrations ? '#ffffff' : '#cccccc'}
                                        onValueChange={this.changeVibrations}
                                        value={this.state.vibrations}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            <MyButton fun={this.del} text="trash-can" color="#FFA000" tcolor="white" x="4" y="4" r="4" />
                            <MyButton fun={this.toggle} text="arrow-down" color="#FFA000" tcolor="white" x="4" y="4" r="4" />
                        </View>
                        <View style={styles.bottom2}>
                            <MySelect fun={this.days} text="Mon" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Tue" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Wed" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Thu" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Fri" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Sat" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                            <MySelect fun={this.days} text="Sun" color="#FFA000" acolor="#212121" tcolor="white" x="4" />
                        </View>
                    </View>
                }
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#FFC107",
        flex: 1,
        flexDirection: "column",
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
    },
    txt: {
        color: "white",
        fontSize: 60,
        fontFamily: 'myfont',
    },
    topRight: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
    },
    topLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: 'flex-end',
    },
    bottom2: {
        height: 60,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#FFA000",
    },
    swi: {
        flexDirection: "row",
        alignItems: 'center',
    }
});