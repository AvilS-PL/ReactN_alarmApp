import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import ListItem from './ListItem';
import Database from './Database';

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: [],
            generatedTab: [],
            loaded: false,
        };
    }

    componentDidMount = async () => {
        this.get()
        this.props.navigation.addListener('focus', () => {
            this.get()
        });
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
            return <ListItem fun={this.remove} h={x.h} m={x.m} key={x.id} id={x.id} />
        })
        this.setState({
            generatedTab: generate,
            loaded: true
        })
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
