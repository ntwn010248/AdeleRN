import React from 'react';
import {Button,Icon, Label } from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, DrawerNavigator, DrawerActions,TabNavigator, TabBarBottom } from 'react-navigation';
import WelcomeScreen  from './screen/WelcomeScreen';
import MessageScreen  from './screen/MessageScreen';
import SignUpScreen  from './screen/SignUpScreen';
import MainScreen from './screen/MainScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import FriendScreen from './screen/FriendScreen';
import DrawerContainer from './container/DrawerContainer';
import ArticleScreen   from './screen/ArticleScreen';
import StartScreen   from './screen/StartScreen';
import SearchScreen from './screen/SearchScreen'
const firebaseConfig = {
  apiKey: "AIzaSyBNlR1obPdvgp0nrypjWLq7E6Q5-xwv7bM",
  authDomain: "login-test-da0d1.firebaseapp.com",
  databaseURL: "https://login-test-da0d1.firebaseio.com",
  projectId: "login-test-da0d1",
  storageBucket: "login-test-da0d1.appspot.com",
  messagingSenderId: "5932728296",
  };
firebase.initializeApp(firebaseConfig);
// It's highly recommended to keep listeners registration at global scope rather than at screen-scope seeing that
// component mount and unmount lifecycle tend to be asymmetric!

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
const Drawer = new TabNavigator({
  新聞: {screen: MainScreen},
  文章 : {screen: MainScreen},
  聯絡 : {screen: SearchScreen},
  通訊: {screen: SignUpScreen},
  設定: {screen: EditProfileScreen}
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '新聞') {
          iconName = 'ios-alert';
        } else if (routeName === '文章') {
          iconName = 'ios-document';
        } else if (routeName === '聊天') {
          iconName = 'ios-mail';
        } else if (routeName === '聯絡') {
          iconName = 'ios-people';
        } else if (routeName === '通訊') {
          iconName = 'ios-call';
        } else if (routeName === '設定') {
          iconName = 'ios-settings';
        } else {
          iconName = 'ios-close';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const DrawerMenu = new DrawerNavigator({
  Friend : {screen: FriendScreen},
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

  //StartScreen : {screen: StartScreen},
  LoginStack : {screen: LoginStack},
  DrawerStack : {screen: DrawerStack},
  MainScreen : {screen: MainScreen},
  SearchScreen : {screen: SearchScreen},
  MessageScreen : {screen: MessageScreen},
  FriendScreen : {screen: FriendScreen},
  SignUpScreen: {screen: SignUpScreen},
  EditProfileScreen: {screen: EditProfileScreen},
  ArticleScreen: {screen: ArticleScreen}
},
{
  headerMode: 'none',
});
