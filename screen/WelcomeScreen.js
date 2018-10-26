import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Picker, Right, Button, Title} from 'native-base';
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
  componentDidMount() {
    	    const { navigate } = this.props.navigation;
    	    // Listening for auth state changes.
    	    firebase.auth().onAuthStateChanged(function(user) {
    	      if (user) {
    	        // User is signed in. Auto login.
    	        navigate('DrawerStack');
    	      }
    	    })
    	  }
  signUpUser = (email, password, name, gender, birthday) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        firebase.database().ref('/users/' + userId).update({
          email: email,
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
      <Container style={styles.container}>
         <Text style={styles.small_title}>歡迎!</Text>
        <Text style={styles.big_title}>行動諮詢師</Text>
        <Form>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>電子郵件</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              style={{color: 'white'}}
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label style={{ color: 'white' }}>密碼</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={{color: 'white'}}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <Button
          full
          success
        
          style = {styles.welcome_login_button}
          onPress = {() => this.loginUser(this.state.email, this.state.password, this.props.navigation)}
          >
            <Text>登入</Text>
          </Button>
          <Button
          full
          primary
          
          style = {styles.welcome_signin_button}
          onPress = {() => this.setState({
            isVisible: !this.state.isVisible
          })
        }
          >
          <Text>新建帳戶</Text>
          </Button>
          <Modal isVisible={this.state.isVisible}
                 backdropColor = '#FFF'
                 backdropOpacity = {1.0}
                 >
          <Text style={styles.signin_title}>建立一個「行動諮詢師」帳戶</Text>
          <Item floatingLabel>
            <Label>電子郵件</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>密碼</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>       
          <Label style={styles.signin_subtitle}>姓名</Label>
          <Item>
            <Input
              secureTextEntry = {false}
              autoCorrect = {false}
              autoCapitalize = "none"
              placeholder = "Type in name"
              onChangeText = {(name) => this.setState({ name })}
            />
          </Item>

          <Label style={styles.signin_subtitle}>選擇性別</Label>
          
            <Picker
            headerComponent={
              	                <Header>
              	                  <Button transparent>
              	                    上一頁
              	                  </Button>
              	                  <Title>選擇性別</Title>
                              </Header>
              	              }
              mode = "dropdown"
              iosIcon = {<Icon name="ios-arrow-down" />}
              style = {{ width: undefined }}
              placeholder = "性別"
              placeholderStyle = {{ color: "#bfc6eb" }}
              placeholderIconColor = "#007aff"
              selectedValue = {this.state.gender}
              onValueChange = {(gender) => this.setState({gender})}
            >
              <Picker.Item label = "男" value = "Male" />
              <Picker.Item label = "女" value = "Female" />
              <Picker.Item label = "其他" value = "Other" />
            </Picker>
         

          <Label style={styles.signin_subtitle}>選擇生日</Label>
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
            style = {styles.signin_button}
            full
            rounded
            warning
            onPress = {() => {this.signUpUser(this.state.email,this.state.password,this.state.name, this.state.gender, this.state.birthday);
                              this.setState({
                               isVisible: !this.state.isVisible
                      })}}
          >
            <Text style = {{ color: 'white' }}>確定送出</Text>
          </Button>
            <Button
            style = {styles.signin_button}
            full
            rounded
            onPress = {() => this.setState({
              isVisible: !this.state.isVisible
            })
          }
          >
            <Text>取消</Text>
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
    backgroundColor: '#512E5F',
    justifyContent: 'center',
    padding: 10
  },
  small_title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    padding: 5,
    textShadowColor: 'rgba(1, 1, 1, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  big_title: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    textShadowColor: 'rgba(1, 1, 1, 0.75)',
    textShadowOffset: {width: -1.5, height: 1.5},
    textShadowRadius: 7
  },
  welcome_login_button: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome_signin_button: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signin_title: {
    fontSize: 19,
    color: '#512E5F',
    position: 'absolute',
    top: 0,
    margin: 20
  },
  signin_subtitle: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: '5%'
  },
  date_picker: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 20
  },
  signin_button: {
    marginTop: 10,
    width: '100%'
  }
});
