import React from 'react';
import {Button,Icon } from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerActions } from 'react-navigation';
import WelcomeScreen  from './screen/WelcomeScreen';
import LoginScreen  from './screen/LoginScreen';
import SignUpScreen  from './screen/SignUpScreen';
import MainScreen from './screen/MainScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import FriendScreen from './screen/FriendScreen';
import DrawerContainer from './container/DrawerContainer';

const firebaseConfig = {
  apiKey: "AIzaSyBNlR1obPdvgp0nrypjWLq7E6Q5-xwv7bM",
  authDomain: "login-test-da0d1.firebaseapp.com",
  databaseURL: "https://login-test-da0d1.firebaseio.com",
  projectId: "login-test-da0d1",
  storageBucket: "login-test-da0d1.appspot.com",
  messagingSenderId: "5932728296",
  };
firebase.initializeApp(firebaseConfig);



export default class App extends React.Component {
  constructor() {
    super();

  }
  render() {
    return (

      <AppStackNavigator/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
const Drawer = new DrawerNavigator({
  MainScreen : {screen: MainScreen},
  LoginScreen : {screen: LoginScreen},
  FriendScreen : {screen: FriendScreen},
  SignUpScreen: {screen: SignUpScreen},
  EditProfileScreen: {screen: EditProfileScreen}
},{
  contentComponent: DrawerContainer
}
)
const MenuButton = (navigation) => (
  <Button
    transparent
    onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}
  >
    <Icon name="menu" />
  </Button>
);
const DrawerStack = new StackNavigator({
  Drawer : {screen: Drawer},
},
{
  headerMode:"float",
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
    headerLeft: MenuButton(navigation)
  })
}
)
const LoginStack = new StackNavigator({
  WelcomScreen: {screen: WelcomeScreen},
  SignUpScreen: {screen: SignUpScreen},
},
  {
    headerMode:"float",
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#E73536'},
      title: 'You are not logged in!',
      headerTintColor: 'white',
    })
  })
const AppStackNavigator = new StackNavigator({
  LoginStack : {screen: LoginStack},
  DrawerStack : {screen: DrawerStack},
  MainScreen : {screen: MainScreen},
  LoginScreen : {screen: LoginScreen},
  FriendScreen : {screen: FriendScreen},
  SignUpScreen: {screen: SignUpScreen},
  EditProfileScreen: {screen: EditProfileScreen}
},
{
  headerMode: 'none',
});
