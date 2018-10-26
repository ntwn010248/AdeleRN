import React, { Component } from 'react'
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {
	AppRegistry,
  	StyleSheet,
  	Text,
  	View,
	WebView,
	Platform
} from 'react-native'


export default class Image extends Component {

	constructor() {
		super()
		this.state = {
			html: ''
		}
	}

	componentDidMount() {
		this.timer = setTimeout(() => this._fetch(),400)
	}

	componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
	onBackButtonPressAndroid = () => {
		return true;
	  };
	_fetch() {
		fetch('http://news-at.zhihu.com/api/4/news/' + this.props.navigation.state.params.articleID)
			.then((response) => response.json())
			.then((responseJson) => {
				fetch('http://daily.zhihu.com/css/share.css?v=5956a')
					.then((responseCSS) => responseCSS.text())
					.then((css) => {
						let cssLink = '<style>'+css+'</style>',
							imgLink = '<div class="img-wrap"><h1 class="headline-title">'+responseJson.title+'</h1><span class="img-source"></span><img src="'+responseJson.image+'" alt=""><div class="img-mask"></div></div>'
						this.setState({
							html: cssLink + responseJson.body.replace(/<div class=\"img-place-holder\"><\/div>/, imgLink),
						})
					})
		})
	}

	render() {
		return (
			<AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
			<View style={styles.container}>
				<WebView
					style={{flex:1}}
					source={{html: this.state.html}}
					javaScriptEnabled={false}
				/>
            </View>
			</AndroidBackHandler>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		paddingTop: Platform.OS === 'ios' ? 60 : 54,
	},
})