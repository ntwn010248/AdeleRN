import React from 'react';
import { Container, Content, Header, Form, Item, Input, Icon, Label, Text, Left, Picker, Button} from 'native-base';
import {StyleSheet, ImageBackground,Dimensions, Image, View, StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window')


export default class StartScreen extends React.Component {
  constructor() {
    super();

  }

  render() {

    return (
      
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Swiper style={styles.wrapper}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 70
          }}
          loop={false}>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('../img/1.jpg')}
              resizeMode='cover'
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('../img/2.jpg')}
              resizeMode='cover'
            />
          </View>
          <View style={styles.slide}>
          
          <ImageBackground style={styles.image} source={require('../img/3.jpg')} >
            <View style={styles.button_pos}>
              <Button
              full
              success
            
              style = {styles.welcome_login_button}
              onPress = {() => this.props.navigation.navigate('LoginStack')}
              >
                <Text style = {styles.text}>End</Text>
              </Button>
            </View>
          </ImageBackground>
          </View>
        </Swiper>
        
      </View>
    );
  }
}

const styles = {
  wrapper: {
    // backgroundColor: '#f00'
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
  },

  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  image: {
    width,
    height,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
    welcome_login_button: {
    width: '15%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
    button_pos:{
      alignItems: 'center',
      justifyContent: 'center',
    }
}

