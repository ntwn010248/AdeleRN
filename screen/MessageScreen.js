import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Right, Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
export default class MessageScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
      messages: [],
      messages2: [],
    });
    this.receive = 0
}
  componentDidUpdate() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    if(this.receive == 0)
    {
      
      firebase.database().ref('/users/' + userId).child('messages').update({
        [this.props.navigation.state.params.uid]: this.state.messages,
      });
      firebase.database().ref('/users/' + this.props.navigation.state.params.uid).child('messages').update({
        [userId]: this.state.messages2,
      });
    }
    else
    {
      this.receive = 0
    }
  }
  componentDidMount(){
    
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let dataRef = firebase.database().ref('/users/' + userId).child('messages').child(this.props.navigation.state.params.uid)
    let dataRef2 = firebase.database().ref('/users/' + this.props.navigation.state.params.uid).child('messages').child(userId);
    dataRef.on('value', (datasnapshot) =>{
     let sentId = datasnapshot.child('0/_id').val()
      if(this.state.messages.length)
      {
        console.log('1')
        if(sentId != this.state.messages[0]._id)
        {
          console.log('sentId')
          
          dataRef2.child('0').ref.once('value').then((datasnapshot2)=>{
            if(datasnapshot2!== null)
            {
              this.receive = 1
              this.setState(previousState =>({
                messages: GiftedChat.append(previousState.messages, datasnapshot.child('0').val()),
                messages2: GiftedChat.append(previousState.messages2, datasnapshot2.val())
              }))
            }
          })

        }
      }
      else
      {
        console.log('createContent')
        dataRef2.ref.once('value').then((datasnapshot2)=>{
          if(datasnapshot2.val() !== null)
          {
            this.receive = 1
            this.setState({
              messages: datasnapshot.val(),
              messages2: datasnapshot2.val()
            })
          }
        })
      } 
    });
    
  }
  componentWillMount() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    var message1 = []
    var message2 = []
    let dataRef = firebase.database().ref('/users/' + userId).child('messages').child(this.props.navigation.state.params.uid);
    let dataRef2 = firebase.database().ref('/users/' + this.props.navigation.state.params.uid).child('messages').child(userId);
    dataRef.once('value').then( (datasnapshot) =>{
      if(datasnapshot)
      {
        message1 = datasnapshot.val()
      }
    }).then(() =>{
      dataRef2.once('value').then( (datasnapshot) =>{
        if(datasnapshot)
        {
          message2 = datasnapshot.val()
        }
      }).then(() =>{
        if(message1 !== null && message2 === null)
        {
          this.setState({
            messages: message1,
            messages2: message2,
          })
        }
    });
  })



  }
  
//_.cloneDeep(obj)
  onSend(messages = []) {
  if(this.state.messages.length)
  {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      messages2: GiftedChat.append(previousState.messages2, {
        _id: Math.round(Math.random() * 1000000),
        text: messages[0].text,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'opposite',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }
      })
    }));
  }
  else
  {
    let messages2 = _.cloneDeep(messages)
    messages2[0]._id = Math.round(Math.random() * 1000000)
    messages2[0].user._id = 2
    messages2[0].user.name = 'opposite'
    messages2[0].user.avatar = 'https://facebook.github.io/react/img/logo_og.png'
    this.setState({
      messages: messages,
      messages2: messages2
    })
  }
}

  render() {
    return (
      <Container>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
         _id: 1,
         name: '123',
         avatar: 'https://placeimg.com/140/140/any',
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
