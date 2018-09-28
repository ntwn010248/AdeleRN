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
import NewsScreen from './screen/NewsScreen';
import DrawerContainer from './container/DrawerContainer';

const config = {
    apiKey: "AIzaSyBXRkuNij7fyKJpdOPJ1WjKUGGDVxaL9PM",
    authDomain: "cs-project-2b4c7.firebaseapp.com",
    databaseURL: "https://cs-project-2b4c7.firebaseio.com",
    projectId: "cs-project-2b4c7",
    storageBucket: "cs-project-2b4c7.appspot.com",
    messagingSenderId: "532843476695"
  };
firebase.initializeApp(config);



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
  icon_style: {
    color: 'white'
  }
});
const Drawer = new DrawerNavigator({
  NewsScreen: {screen: NewsScreen},
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
    <Icon
      name="menu"
      style={styles.icon_style} />
  </Button>
);
const DrawerStack = new StackNavigator({
  Drawer : {screen: Drawer},
},
{
  headerMode:"float",
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#76448A'},
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
  NewsScreen: {screen: NewsScreen},
  MainScreen : {screen: MainScreen},
  LoginScreen : {screen: LoginScreen},
  FriendScreen : {screen: FriendScreen},
  SignUpScreen: {screen: SignUpScreen},
  EditProfileScreen: {screen: EditProfileScreen}
},
{
  headerMode: 'none',
});
