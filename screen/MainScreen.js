import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Right, Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
      email: '123',
      password: '123456',
      states: 'login'
    });
  }

  render() {
    return (
      <Container>
        <Grid>
            <Row style={{ backgroundColor: '#FFF'}} onPress={() => {this.props.navigation.navigate('LoginScreen');}}>
                <Text style = {{fontSize: 50, textAlign: 'right'}}>{'\n'}Messenger</Text>
            </Row>
            <Row style={{ backgroundColor: '#ffd306'}} onPress={() => {this.props.navigation.navigate('FriendScreen');}}>
                <Text style = {{fontSize: 50, textAlign: 'right'}}>{'\n'}Friends</Text>
            </Row>
            <Row style={{ backgroundColor: '#00CE9F'}} onPress={() => {this.props.navigation.navigate('SignUpScreen');}}>
                <Text style = {{fontSize: 50, textAlign: 'justify'}}>{'\n'}Calling</Text>
            </Row>
            <Row style={{ backgroundColor: '#ff79bc'}} onPress={() => {this.props.navigation.navigate('SurveyScreen');}}>
                <Text style = {{fontSize: 50, textAlign: 'justify'}}>{'\n'}Survey</Text>
            </Row>

        </Grid>
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
