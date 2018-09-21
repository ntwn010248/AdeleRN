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
        <Label style={styles.article_title}>Main Screen (Article)</Label>
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
  article_title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10
  }
});
