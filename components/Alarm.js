import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Dimensions } from 'react-native';

import MyButton from './MyButton';
import AlarmButton from './AlarmButton';
import Database from './Database';


export default class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            h: "00",
            m: "00",
            prevM: 0,
            mode: true,
        };
    }

    add = () => {
        Database.add(this.state.h, this.state.m)
    }

    changeMode = (x) => {
        if (x == "h") {
            this.setState({
                mode: true
            })
        } else {
            this.setState({
                mode: false
            })
        }
    }

    setHour = (x) => {
        let hour = ""
        if (x < 10) {
            hour = "0" + x
        } else {
            hour = x
        }
        this.setState({
            h: hour
        })
    }

    setMinute = (x) => {
        let prev = this.state.prevM
        let minute = Number(this.state.m)

        if (prev == x) {
            if (minute >= x + 4) {
                minute = x
            } else {
                minute += 1
            }
        } else {
            prev = x
            minute = x
        }

        if (minute < 10) {
            minute = "0" + minute
        }

        this.setState({
            m: minute,
            prevM: prev,
        })

    }

    render() {
        let obj1 = []
        let obj2 = []
        let wid = Dimensions.get('window').width
        let big = Math.floor(wid / 50) - 2
        let small = Math.floor(wid / 50) - 4
        if (this.state.mode) {
            for (let i = 1; i <= 12; i++) {
                x = Math.abs((((big * 50) / 2) * (Math.cos(((30 * (i + 3)) * Math.PI) / 180) + 1))) + ((wid - (big * 50) - (big * 10)) / 2)
                y = Math.abs((((big * 50) / 2) * (Math.sin(((30 * (i - 3)) * Math.PI) / 180) + 1)))
                x2 = Math.abs((((small * 50) / 2) * (Math.cos(((30 * (i + 3)) * Math.PI) / 180) + 1))) + ((wid - (small * 50) - (small * 10)) / 2)
                y2 = Math.abs((((small * 50) / 2) * (Math.sin(((30 * (i - 3)) * Math.PI) / 180) + 1))) + (big * 10) + (big * 50 - small * 50) / 10
                obj1.push(
                    <View
                        style={{ position: "absolute", right: x, top: y }}>
                        <AlarmButton
                            fun={this.setHour}
                            key={i}
                            text={i}
                            color="#FFC107"
                            tcolor="white"
                            x={big}
                        />
                    </View>
                )
                obj2.push(
                    <View
                        style={{ position: "absolute", right: x2, top: y2 }}>
                        <AlarmButton
                            fun={this.setHour}
                            key={i == 12 ? 0 : i + 12}
                            text={i == 12 ? 0 : i + 12}
                            color="#FFA000"
                            tcolor="white"
                            x={small}
                        />
                    </View>
                )
            }
        } else {
            for (let i = 1; i <= 12; i++) {
                x = Math.abs((((big * 50) / 2) * (Math.cos(((30 * (i + 3)) * Math.PI) / 180) + 1))) + ((wid - (big * 50) - (big * 10)) / 2)
                y = Math.abs((((big * 50) / 2) * (Math.sin(((30 * (i - 3)) * Math.PI) / 180) + 1)))
                obj1.push(
                    <View
                        style={{ position: "absolute", right: x, top: y }}>
                        <AlarmButton
                            fun={this.setMinute}
                            key={i == 12 ? 0 : i * 5}
                            text={i == 12 ? 0 : i * 5}
                            color="#FFC107"
                            tcolor="white"
                            x={big}
                        />
                    </View>
                )
            }
        }
        return (
            <View style={{ backgroundColor: "#212121", flex: 1 }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <TouchableNativeFeedback
                        onPress={() => this.changeMode("h")}
                        background={TouchableNativeFeedback.Ripple('#555555', true)}
                    >
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 100,
                            width: 120,
                            height: 120,
                            backgroundColor: this.state.mode ? "#555555" : "#212121",
                        }}>
                            <Text style={{
                                color: "white",
                                fontFamily: "myfont",
                                fontSize: 80
                            }}>{this.state.h}</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <Text style={{
                        color: "white",
                        fontFamily: "myfont",
                        fontSize: 80
                    }}> : </Text>

                    <TouchableNativeFeedback
                        onPress={() => this.changeMode("m")}
                        background={TouchableNativeFeedback.Ripple('#555555', true)}
                    >
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 100,
                            width: 120,
                            height: 120,
                            backgroundColor: this.state.mode ? "#212121" : "#555555",
                        }}>
                            <Text style={{
                                color: "white",
                                fontFamily: "myfont",
                                fontSize: 80
                            }}>{this.state.m}</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{
                    flex: 2,
                }}>
                    {obj1}
                    {obj2}
                </View>
                <View style={{ position: "absolute", left: 0, right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ elevation: 3, backgroundColor: "#FFA000", borderRadius: 4 }}>
                        <MyButton fun={this.add} text="plus-box-outline" color="#FFA000" tcolor="white" x="6" y="6" r="4" s="40" />
                    </View>
                </View>
            </View>
        );
    }
}
