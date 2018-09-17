import React from 'react';
import Chatkit from "@pusher/chatkit";
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Right, Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
const CHATKIT_TOKEN_PROVIDER_ENDPOINT =
"https://us1.pusherplatform.io/services/chatkit_token_provider/v1/172eedcc-ff0b-4207-a326-1608621bdd34/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:172eedcc-ff0b-4207-a326-1608621bdd34";
const CHATKIT_ROOM_ID = 8451998;
const CHATKIT_USER_NAME = "haha"; // Let's chat as "Dave" for this tutorial
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
      messages: [],
    });
    this.onSend = this.onSend.bind(this);
}
componentDidMount() {
      // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
      const tokenProvider = new Chatkit.TokenProvider({
        url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
      });

      // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
      // For the purpose of this example we will use single room-user pair.
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: CHATKIT_USER_NAME,
        tokenProvider: tokenProvider
      });

      // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
      chatManager.connect().then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onNewMessage: this.onReceive.bind(this)
          }
        });
      });
    }
    onReceive(data) {
      console.log(data);
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }
  onSend([message]) {
  this.currentUser.sendMessage({
    text: message.text,
    roomId: CHATKIT_ROOM_ID
  });
  }
/*
  componentDidUpdate()
  {
      firebase.database().ref().child('UserMessages').set({
        messages: this.state.messages
      });
  }

  componentWillMount() {
      let dataRef = firebase.database().ref().child('UserMessages').child('messages');
      dataRef.once('value').then( (datasnapshot) =>{
        this.setState({
          messages: datasnapshot.val(),
        })

      });
  }

  onSend(messages = []) {
  console.log(messages[0]._id);
  messages[0]._id = 2;
  this.setState(previousState => ({
    messages: GiftedChat.append(previousState.messages, messages),
  }));
}
*/
  render() {
    return (
      <Container>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
         _id: CHATKIT_USER_NAME
        }}
      />
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
