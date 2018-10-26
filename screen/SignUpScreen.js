import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Picker, Button} from 'native-base';
import {StyleSheet, BackHandler } from 'react-native';
import AppLink from 'react-native-app-link';
import ScreenRecorderManager from 'react-native-screen-recorder'
export default class SignUpScreen extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
  );
  }
  start() {
    ScreenRecorderManager.start()
  }
  stop() {
    ScreenRecorderManager.stop()

  }
  componentDidMount() {

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  onBackButtonPressAndroid = () => {
    if (this.isSelectionModeEnabled()) {
      this.disableSelectionMode();
      alert('wow')
      return true;
    } else {
      alert('yes')
      return false;
    }
  };
  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
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
      <Text style={styles.call_title}>Choose a mean of communication.</Text>
      <Button
        style = {styles.call_button}
            full
            rounded
            primary
            block
            bordered
            onPress = {() => this.skypeCall()}
          >
            <Text style = {styles.call_button_text}>Skype call</Text>
          </Button>

            <Button
            style = {styles.call_button}
            full
            rounded
            bordered
            success
            onPress = {() => this.lineCall()}
          >
            <Text style = {styles.call_button_text}>Line call</Text>
          </Button>
          <Button
            style = {styles.call_button}
            full
            rounded
            bordered
            success
            onPress = {() => this.start()}
        >
          <Text style = {styles.call_button_text}>start</Text>
          </Button>
        <Button
            style = {styles.call_button}
            full
            rounded
            bordered
            success
            onPress = {() => this.stop()}
        >
            <Text style = {styles.call_button_text}>stop</Text>
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
  call_title: {
    fontSize: 19,
    color: '#1B4F72',
    position: 'absolute',
    top: 0,
    margin: 20
  },
  call_button: {
    margin: 20,
    height: '25%',
  },
  call_button_text: {
    fontSize: 20
  }
});
