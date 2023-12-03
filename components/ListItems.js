import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Vibration } from 'react-native';
import { Audio } from 'expo-av';

import ListItem from './ListItem';
import Database from './Database';

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: [],
            generatedTab: [],
            loaded: false,
            music: {},
            playing: false,
        };

    }

    componentDidMount = async () => {
        this.get()
        this.props.navigation.addListener('focus', () => {
            if (this.state.tab.length == 0) {
                this.setState({
                    loaded: false
                })
            }
            this.get()
        });
        this.interval = setInterval(() => this.check(), 1000);
        const sound = new Audio.Sound();
        this.setState({
            music: sound
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    get = async () => {
        let temp = []
        await Database.getAll().then((all) => {

            let ob = JSON.parse(all)
            temp = ob.rows._array
        })

        this.setState({
            tab: temp
        }, () => this.load())
    }

    remove = async (x) => {
        await Database.remove(x)
        temp = [...this.state.tab]
        console.log(temp)
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == x) {
                temp.splice(i, 1)
                break
            }
        }
        console.log(temp)
        this.setState({
            tab: temp
        }, () => this.load())
    }

    load = async () => {
        let generate = []
        generate = this.state.tab.map((x) => {
            return <ListItem fun={this.remove} h={x.h} m={x.m} key={x.id} id={x.id} days={x.days} s={x.s} v={x.v} update={this.update} />
        })
        this.setState({
            generatedTab: generate,
            loaded: true
        })
    }

    update = async (id, what, x) => {
        for (let i = 0; i < this.state.tab.length; i++) {
            if (this.state.tab[i].id == id) {
                if (what == "days") {
                    this.state.tab[i].days = x
                } else if (what == "sound") {
                    this.state.tab[i].s = x
                } else if (what == "vibrations") {
                    this.state.tab[i].v = x
                }
                break
            }
        }
    }


    check = async () => {
        for (let i = 0; i < this.state.tab.length; i++) {
            let temp = this.state.tab[i]
            let tempDays = temp.days.split("|")

            let date = new Date()
            let day = date.getDay()
            if (day == 0) {
                day = "Sun"
            } else if (day == 1) {
                day = "Mon"
            } else if (day == 2) {
                day = "Tue"
            } else if (day == 3) {
                day = "Wed"
            } else if (day == 4) {
                day = "Thu"
            } else if (day == 5) {
                day = "Fri"
            } else if (day == 6) {
                day = "Sat"
            }

            let hour = date.getHours()
            if (hour < 10) {
                hour = "0" + hour
            }
            let minute = date.getMinutes()
            if (minute < 10) {
                minute = "0" + minute
            }

            let check = true

            if (!(tempDays.includes(day))) {
                check = false
            } else if (!(hour == temp.h)) {
                check = false
            } else if (!(minute == temp.m)) {
                check = false
            }
            if (check) {
                if (temp.v == true) {
                    console.log(temp.v)
                    Vibration.vibrate(1000, true)
                } else {
                    Vibration.cancel()
                }
                if (temp.s == true) {
                    this.play()
                    this.setState({
                        playing: true
                    })
                } else {
                    this.stop()
                    this.setState({
                        playing: false
                    })
                }
            } else {
                this.stop()
                this.setState({
                    playing: false
                })
                Vibration.cancel()
            }

        }
    }

    play = async () => {
        console.log(!this.state.playing)
        if (!this.state.playing) {
            await this.state.music.loadAsync(require('../assets/music.mp3'))
            await this.state.music.playAsync();
        }
    }
    stop = async () => {
        if (this.state.playing) {
            await this.state.music.unloadAsync()
        }
    }

    render() {
        return (
            <>
                {this.state.loaded == false
                    ? <ActivityIndicator size="100%" color="white" />
                    : this.state.generatedTab}
                <View style={{ height: 90 }}></View>
            </>
        );
    }
}
