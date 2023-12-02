import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ListItem from './ListItem';

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: []
        };
    }

    componentDidMount = () => {
        let generate = []
        for (let i = 0; i < 9; i++) {
            generate.push(<ListItem id={i} />)
        }
        this.setState({
            tab: generate
        })
    }

    render() {
        return (
            <View>
                {this.state.tab}
            </View>
        );
    }
}
