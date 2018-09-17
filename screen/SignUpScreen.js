import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Picker, Button} from 'native-base';
import {StyleSheet} from 'react-native';
import AppLink from 'react-native-app-link';
import DatePicker from 'react-native-datepicker'
export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
      email: '123',
      password: '123456',
      states: 'login',
      name: 'meow'
    });
  }
  /* Skype call */
  skypeCall = () => {
    const url = 'skype://';
    const appName = 'Skype';
    const appStoreId = 'id304878510';
    const playStoreId = 'com.skype.raider';
    AppLink.maybeOpenURL(url, { appName, appStoreId, playStoreId }).then(() => {
      console.log("Open Skype")
    })
    .catch((err) => {
      console.log("Error in opening Skype!")
    });
  }

  /* Line call */
  lineCall = () => {
    const url = 'line://';
    const appName = 'Line';
    const appStoreId = 'id443904275';
    const playStoreId = 'jp.naver.line.android';
    AppLink.maybeOpenURL(url, { appName, appStoreId, playStoreId }).then(() => {
      console.log("Open Line")
    })
    .catch((err) => {
      console.log("Error in opening Line!")
    });
  }
  render() {
    return (
      <Container style = {styles.container}>
          <Button style = {{ marginTop: 20 }}
            full
            rounded
            primary
            block
            onPress = {() => this.skypeCall()}
          >
            <Text style = {{ color: 'white' }}>Skype call</Text>
          </Button>

          <Button style = {{ marginTop: 20 }}
            full
            rounded
            success
            onPress = {() => this.lineCall()}
          >
            <Text style = {{ color: 'white' }}>Line call</Text>
          </Button>
      </Container>
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
