import React, { Component } from 'react'
import {
	AppRegistry,
  	StyleSheet,
	Dimensions,
  	Text,
  	View,
	Image,
	ListView,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	FlatList,
	Animated,
	Platform
} from 'react-native'

import SwipeableViews from 'react-swipeable-views-native'
import { autoPlay } from 'react-swipeable-views-utils'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

let deviceWidth = Dimensions.get('window').width

const ListItem = ({ data }) => {
	return (
		
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.itemTitle} numberOfLines={2}>
					{data.title}
				</Text>
				<Image
					style={styles.itemImage}
					source={{uri: data.images[0]}}
				/>
			</View>
	)
}

export default class Article extends Component {

	constructor() {
		super()
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			stories: ds,
			topStories: [],
			modalSize: new Animated.Value(.5),
			modalOpacity: new Animated.Value(0),
			modalHide: true
		}
  	}

	componentDidMount() {
		// 知乎日报首页 api
		let url = 'http://news-at.zhihu.com/api/4/news/latest'
		fetch(url)
			.then((data) => {
				return data.json()
			})
			.then((res) => {
				this.setState({
					stories: this.state.stories.cloneWithRows(res.stories),
				})
				this._swiperViews(res.top_stories)
			})
}

	_swiperViews(topStories) {
		let views = []
		topStories.forEach((ele, index, arr) => {
			views.push(
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ArticleScreen', {articleID: ele.id})}>
				<View style={[styles.slide, styles.slide1]}>
					
					<Image
						style={{
							flex: 1,
							height: 200,
							justifyContent: 'center',
							alignItems: 'center'
						}} 
						source={{uri: ele.image}}
						resizeMode='cover'
					>

					</Image>
				</View>
        </TouchableWithoutFeedback>      
			)
		})
		this.setState({
			topStories: views
		})
	}

	_renderModal() {
		const animatedDuration = 400
		let animated, modalSize = .5, modalOpacity = 0.0
		if (this.state.modalHide) {
			modalSize = 1.0,
			modalOpacity = 1.0
		}
		animated = Animated.parallel([
			Animated.timing(this.state.modalSize,{
				toValue: modalSize,
				duration: animatedDuration,
			}),
			Animated.timing(this.state.modalOpacity,{
				toValue: modalOpacity,
				duration: animatedDuration,
			})
		])
		
		animated.start(() => this.setState({modalHide: !this.state.modalHide}))			
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<AutoPlaySwipeableViews
						ref='swiper'
						style={styles.slideContainer}
						autoplay={true}
						resistance={true}
						springConfig={{tension: 100, friction: 30}}
						interval={4500}
						children={this.state.topStories.length == 0 ? <View></View> : this.state.topStories}
					/>
						
					<ListView
						dataSource={this.state.stories}
						renderRow={(rowData, sectionID, rowID) => <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('ArticleScreen',{articleID: rowData.id})}>
                                                      <ListItem data={rowData} key={rowID} />
                                                      </TouchableOpacity>
                                                      }
						renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
							return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
						}}
					/>
				</ScrollView>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 60 : 54,
		paddingBottom: 50
	},
	listItem: {
		backgroundColor: 'white',
		width: deviceWidth,
		padding: 10,
	},
	itemTitle: {
		flex: 1,
		lineHeight: 20,
		marginRight: 5
	},
	itemImage: {
		width: 60,
		height: 60
	},
	slideContainer: {
		height: 200,
		flex: 0
	},
	slide: {
		height: 200,
		backgroundColor: 'transparent',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 18,
		marginTop: 100,
		marginLeft: 20,
		marginRight: 20,
		textAlign: 'center'
	}
})