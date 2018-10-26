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
    return (
        <Container style = {styles.container}>

          <Label style={styles.profile_title}>姓名</Label>
          <Item>
            <Input
              secureTextEntry = {false}
              autoCorrect = {false}
              autoCapitalize = "none"
              placeholder = "請在此輸入姓名"
              onChangeText = {(name) => this.setState({ name })}
            />
          </Item>

          <Label style={styles.profile_title}>性別</Label>

            <Picker
              mode = "dropdown"
              iosIcon = {<Icon name="ios-arrow-down" />}
              style = {{ width: undefined }}
              placeholder = "Select gender"
              placeholderStyle = {{ color: "#bfc6ea" }}
              placeholderIconColor = "#007aff"
              selectedValue = {this.state.gender}
              onValueChange = {(gender) => this.setState({gender})}
            >
              <Picker.Item label = "男" value = "Male" />
              <Picker.Item label = "女" value = "Female" />
              <Picker.Item label = "其他" value = "Other" />
            </Picker>


          <Label style={styles.profile_title}>生日</Label>
          <DatePicker
            style = {styles.date_picker}
            date = {this.state.birthday}
            mode = "date"
            placeholder = {this.state.birthday}
            format = "YYYY-MM-DD"
            minDate = "1901-01-01"
            maxDate = "2099-12-31"
            confirmBtnText = "確定"
            cancelBtnText = "取消"
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

          <Button
            full
            rounded
            warning
            style={styles.profile_button}
            onPress = {() => {this.sendSurvey(this.state.name, this.state.gender, this.state.birthday); this.props.navigation.navigate('MainScreen');}}
          >
            <Text style = {{ color: 'white' }}>更新個人資訊</Text>
          </Button>

          <Button
            full
            rounded
            danger
            style={styles.profile_button}
            onPress = {() => {this.logoutUser(); this.props.navigation.navigate('WelcomScreen');}}
          >
            <Text style = {{ color: 'white' }}>登出</Text>
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
    marginTop: 30,
  }
});
