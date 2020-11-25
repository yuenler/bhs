import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { clone } from '../clone';
import MapScreen from '../screens/Map.Screen';

const Stack = createStackNavigator();

export default class MapNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={clone(this.props.user, MapScreen)} name="Map" />
      </Stack.Navigator>
    )
  }
}