import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Picker, Right, Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';

export default class NewsScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container>
        <Label>News</Label>
      </Container>
    );
  }
}
