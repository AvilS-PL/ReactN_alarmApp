import { StatusBar } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loading from './components/Loading';
import Main from './components/Main';
import Alarm from './components/Alarm';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="loading" component={Loading} />
          <Stack.Screen
            options={{
              title: 'Alarms',
              headerStyle: { backgroundColor: '#FFA000' },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontFamily: 'myfont',
              }
            }}
            name="main"
            component={Main} />
          <Stack.Screen
            options={{
              title: 'Set Alarm',
              headerStyle: { backgroundColor: '#FFA000' },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontFamily: 'myfont',
              }
            }}
            name="alarm"
            component={Alarm} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}