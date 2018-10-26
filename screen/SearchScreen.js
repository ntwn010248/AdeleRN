'use strict';

import React,{ Component } from 'react';
import { Dimensions,StyleSheet,Text,TouchableHighlight,ScrollView,View , TouchableOpacity} from 'react-native';
import Util from './utils';
import * as firebase from 'firebase';
// import SearchBar from 'react-native-search-bar';
// import fuzzy from 'fuzzy';
let deviceWidth = Dimensions.get('window').width
export default class extends Component{
  constructor() {
    super();
    const stateData = {"F1":"Friend1_test"}
    this.states = [];
    for (let key in stateData) {
      if (stateData.hasOwnProperty(key)) {
        this.states.push(stateData[key]);
      }
    }

    this.state = {
      states: this.states,
    };
  }

  _onChangeText(text) {
    let results = fuzzy.filter(text, this.states)
    let matches = results.map(function(el) { return el.string; });
    this.setState({
      states: matches,
    })
  }

  render() {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let uuid = ''
    if(user.uid == 'VA2QvwcK0wV89I6ZmeaYcBPsqAo1')
         uuid = 'ZaosJ43ZKQYlkT6Psv8AeOcHTwC2'
    else
         uuid = 'VA2QvwcK0wV89I6ZmeaYcBPsqAo1'
    const statesList = this.state.states.map( (elem, index) => {
      return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('MessageScreen', {uid: uuid})}>
      <View key={index} style={styles.list}><Text style={styles.text}>{elem}</Text></View>
      </TouchableOpacity>
      )
    })

    return(
      <ScrollView style={styles.container} contentOffset={{y:50}}>
        {statesList}
      </ScrollView>
    )
  }
}

        // <SearchBar
          // ref='searchBar'
          // placeholder='Search'
          // onChangeText={(text)=> this._onChangeText(text)}
        // />

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#ffffff",
  },
  list:{
    height: 40,
    paddingLeft:20,
    justifyContent:"center",
    borderBottomColor:"#aaa",
    borderBottomWidth: Util.pixel,
  },
  listItem: {
    backgroundColor: 'white',
    width: deviceWidth,
    padding: 10,
},
});
