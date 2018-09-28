import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Container, Content, Header, Form, Item, Input, Button, Label, Text, Icon } from 'native-base';
import { NavigationActions, DrawerActions } from 'react-navigation'
import * as firebase from 'firebase';
export default class DrawerContainer extends React.Component {

  logoutUser = () => {
    const { pop } = this.props.navigation;
    try {
      firebase.auth().signOut().then(() => {
        pop();
        console.log("Log out!")
      })
    }
    catch(error) {
      console.log(error.toString())
    }
  }
  render() {
    const { navigation } = this.props;
    const user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
    return (
      <Container>
        <Header>
          <Text style={styles.header_title}>Email: {user? user.email: No}</Text>
        </Header>
        <Text
          onPress={() => {navigation.navigate('NewsScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          NewsScreen
        </Text>
        <Text
          onPress={() => {navigation.navigate('MainScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          MainScreen
        </Text>
        <Text
          onPress={() => {navigation.navigate('LoginScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          Messenger
        </Text>
        <Text
          onPress={() => {navigation.navigate('SignUpScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          Calling
        </Text>
        <Text
          onPress={() => {navigation.navigate('FriendScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          Find Friends
        </Text>
        <Text
          onPress={() => {navigation.navigate('EditProfileScreen'); navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.uglyDrawerItem}>
          EditProfile
        </Text>
        <Text
          onPress={() => {this.logoutUser();  navigation.dispatch(DrawerActions.closeDrawer());}}
          style={styles.logout_button}>
          LogOut
        </Text>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEF8',
    paddingTop: 40,
    paddingHorizontal: 10
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
  header_title: {
    fontSize: 16,
  },
  logout_button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#E73536',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})
