import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import TopicsScreen from "./screens/TopicsScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";

class App extends React.Component {
  render() {
    return (
      <HomeScreen />
    );
  }
}

const MainNavigator = createStackNavigator({
    HomeScreen,
    TopicsScreen,
    ChatRoomScreen

},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(MainNavigator);
