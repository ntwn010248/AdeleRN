import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Picker, Button} from 'native-base';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as firebase from 'firebase';
export default class EditProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = ({
        name: '',
        gender: 'Male',
        birthday: ''
      });
  }
  /* Send survey answer to database */
  sendSurvey = (name, gender, birthday) => {
    var user = firebase.auth().currentUser;
    var userID = user.uid;
    firebase.database().ref('/users/' + userID).update({
      name: name,
      gender: gender,
      birthday: birthday
    });
  }
  render() {
    return (
        <Container style = {styles.container}>

          <Label style={styles.profile_title}>Name</Label>
          <Item>
            <Input
              secureTextEntry = {false}
              autoCorrect = {false}
              autoCapitalize = "none"
              placeholder = "Type in name"
              onChangeText = {(name) => this.setState({ name })}
            />
          </Item>

          <Label style={styles.profile_title}>Gender</Label>

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


          <Label style={styles.profile_title}>Birthday</Label>
          <DatePicker
            style = {styles.date_picker}
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
            style={styles.profile_button}
            onPress = {() => {this.sendSurvey(this.state.name, this.state.gender, this.state.birthday); this.props.navigation.navigate('MainScreen');}}
          >
            <Text style = {{ color: 'white' }}>Send answer</Text>
          </Button>

      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  profile_title: {
    fontSize: 18,
    marginTop: 30,
    textAlign: 'left',
    marginLeft: '5%'
  },
  date_picker: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 20
  },
  profile_button: {
    marginTop: 100,
  }
});
