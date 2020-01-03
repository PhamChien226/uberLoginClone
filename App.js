import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/auth/LoginScreen';

export default function App() {
  return (
      <AppNavigator />
  );
}

const ModalNavigator = createStackNavigator({
  LoginScreen: { 
    screen: LoginScreen,
   navigationOptions:{
     header:null
   }
  }
},{
  // initialRouteName: 'LoginScreen',
  mode: 'modal',

})

const AppNavigator = createAppContainer(ModalNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8ec',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
