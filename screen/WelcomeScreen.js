import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Picker, Right, Button} from 'native-base';
import * as firebase from 'firebase';
import {StyleSheet, AppRegistry} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Modal from "react-native-modal";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:172eedcc-ff0b-4207-a326-1608621bdd34";
const YOUR_KEY = "1b9ae5a8-0d36-409a-9b2f-1979ab9e4b56:V8RwgDQtwj2ZUktYnD7t5SzIaH2zZeXCZzUKYCQOxp8="


export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
      email: 'aaaaaa@gmail.com',
      password: 'zxc12300',
      isVisible: false,
      name: '',
      gender: 'Male',
      birthday: ''
    });
    this.loginUser = this.loginUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
  }
  signUpUser = (email, password, name, gender, birthday) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase.database().ref('/users/' + userId).update({
          name: name,
          gender: gender,
          birthday: birthday
        });
      }).catch((error) => {alert(error.toString());});
  }

  loginUser = (email, password, navigation) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){
        navigation.navigate('DrawerStack');
        console.log(user);
      }).catch((error) => {alert(error.toString());});

  }
  render() {
    return (
      <Container>

        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>PassWord</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <Button
          full
          primary
          onPress = {() => this.loginUser(this.state.email, this.state.password, this.props.navigation)}
          >
            <Text>Login </Text>
          </Button>
          <Button
          full
          primary
          onPress = {() => this.setState({
            isVisible: !this.state.isVisible
          })
        }
          >
          <Text>Sign up </Text>
          </Button>
          <Modal isVisible={this.state.isVisible}
                 backdropColor = 'white'
                 backdropOpacity = {1.0}
                 >
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>PassWord</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>       
          <Label>Name</Label>
          <Item>
            <Input
              secureTextEntry = {false}
              autoCorrect = {false}
              autoCapitalize = "none"
              placeholder = "Type in name"
              onChangeText = {(name) => this.setState({ name })}
            />
          </Item>

          <Label>Gender</Label>
          
            <Picker
              mode = "dropdown"
              iosIcon = {<Icon name="add" />}
              style = {{ width: undefined }}
              placeholder = "Select gender"
              placeholderStyle = {{ color: "#bfc6ea" }}
              placeholderIconColor = "#007aff"
              selectedValue = {this.state.gender}
              onValueChange = {(gender) => this.setState({gender})}
            >
              <Picker.Item label = "Male" value = "Male" />
              <Picker.Item label = "Female" value = "Female" />
              <Picker.Item label = "Other" value = "Other" />
            </Picker>
         

          <Label>Birthday</Label>
          <DatePicker
            style = {{width: 200}}
            date = {this.state.birthday}
            mode = "date"
            placeholder = {this.state.birthday}
            format = "YYYY-MM-DD"
            minDate = "1901-01-01"
            maxDate = "2099-12-31"
            confirmBtnText = "Confirm"
            cancelBtnText = "Cancel"
            customStyles = {{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange = {(date) => {this.setState({birthday: date})}}
          />

          <Button style = {{ marginTop: 10 }}
            full
            rounded
            warning
            onPress = {() => {this.signUpUser(this.state.email,this.state.password,this.state.name, this.state.gender, this.state.birthday);
                              this.setState({
                               isVisible: !this.state.isVisible
                      })}}
          >
            <Text style = {{ color: 'white' }}>Confirm</Text>
          </Button>
            <Button
            full
            rounded
            onPress = {() => this.setState({
              isVisible: !this.state.isVisible
            })
          }
          >
            <Text>Cancel</Text>
            </Button>
          </Modal>
        </Form>
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
