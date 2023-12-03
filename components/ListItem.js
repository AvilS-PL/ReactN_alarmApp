import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, Animated, FlatList } from 'react-native';
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
            days: [],
            week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        };

        this.toValue = 0
    }

    componentDidMount = () => {
        let temp = []
        if (this.props.days != null) {
            temp = this.props.days.split("|")
        }

        this.setState({
            days: temp
        })
    }

    days = (x) => {
        let temp = [...this.state.days]
        if (temp.includes(x)) {
            temp.splice(temp.indexOf(x), 1)
        } else {
            temp.push(x)
        }

        coded = ""
        for (let i = 0; i < temp.length; i++) {
            if (i == temp.length - 1) {
                coded += temp[i]
            } else {
                coded += temp[i] + "|"
            }
        }
        Database.change(coded, this.props.id)

        this.setState({
            days: temp
        })
    }

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
                                    <MaterialCommunityIcons name="speaker-wireless" size={24} color="white" style={{ opacity: this.state.sound ? 1 : 0.5 }} />
                                    <Switch
                                        style={{ marginLeft: 10 }}
                                        trackColor={{ false: '#aaaaaa55', true: '#FFA000' }}
                                        thumbColor={this.state.sound ? '#ffffff' : '#cccccc'}
                                        onValueChange={this.changeSound}
                                        value={this.state.sound}
                                    />
                                </View>
                                <View style={styles.swi}>
                                    <MaterialCommunityIcons name="vibrate" size={24} color="white" style={{ opacity: this.state.vibrations ? 1 : 0.5 }} />
                                    <Switch
                                        style={{ marginLeft: 10 }}
                                        trackColor={{ false: '#aaaaaa55', true: '#FFA000' }}
                                        thumbColor={this.state.vibrations ? '#ffffff' : '#cccccc'}
                                        onValueChange={this.changeVibrations}
                                        value={this.state.vibrations}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            <MyButton fun={this.del} text="trash-can" color="#FFA000" tcolor="white" x="4" y="4" r="4" />
                            <MyButton fun={this.toggle} text="arrow-down" color="#FFA000" tcolor="white" x="4" y="4" r="4" rotated={this.state.expanded} />
                        </View>
                        <View style={styles.bottom2}>
                            <FlatList
                                style={{ flex: 1 }}
                                horizontal={true}
                                data={this.state.week}
                                renderItem={({ item }) =>
                                    <View style={{ justifyContent: 'center', width: 45 }}>
                                        <MySelect
                                            fun={this.days}
                                            text={item}
                                            color="#FFA000"
                                            acolor="#212121"
                                            tcolor="white"
                                            x="4"
                                            sel={this.state.days.includes(item) ? true : false}
                                        />
                                    </View>}
                                keyExtractor={item => item}
                            />
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFA000",
    },
    swi: {
        flexDirection: "row",
        alignItems: 'center',
    }
});