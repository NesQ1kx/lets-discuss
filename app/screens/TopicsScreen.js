import React from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native';
import TopicItem from "../components/TopicItem";
import { httpService } from "../services/httpService";
import SingleSocket from "../services/SocketSingletone";


export default class TopicsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories: [], dataLoaded: false };
        this.navigation = this.props.navigation.getParam('navigation');
        this.handleTopicTouch = this.handleTopicTouch.bind(this);
    }

    componentDidMount() {
        httpService.get('getCategories').then(data => this.setState({ categories: data.data, dataLoaded: true }));
    }

    handleTopicTouch(item) {
        SingleSocket.instance.onopen = () => {
            setTimeout(() => {
                SingleSocket.instance.send(JSON.stringify({action: 'CONNECT', user_data: {theme_id: item.id}}))
            },100);
        };
        SingleSocket.instance.onmessage = ev => {
            const roomInfo = JSON.parse(ev.data);
            this.navigation.navigate('ChatRoomScreen', { item: item, roomInfo: roomInfo });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Выбери тему для обсуждения</Text>
                </View>
                {!this.state.dataLoaded && (
                    <View style={{marginTop: 300}}>
                        <Image style={{width: 100, height: 100, left: '50%', marginLeft: -50}}
                               source={require("../assets/loading_spiner.gif")}/>
                    </View>
                )}

                {this.state.dataLoaded && (
                    <ScrollView>
                        <View style={styles.container}>
                            {this.state.categories.map((item, index) => <TopicItem
                                key={index}
                                item={item}
                                navigation={this.props.navigation}
                                onTouch={this.handleTopicTouch}/>)}
                        </View>
                    </ScrollView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#1240AB',
        zIndex: 10
    },
    container: {
        flexDirection: 'column',
        marginTop: 80,
    },
    searchIndicator: {
        flex: 1,
        top: '25%',
        zIndex: -1
    },
});
