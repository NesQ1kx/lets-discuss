import React from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {MOCK_TOPICS} from "../mocks/mockTopics";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigateToChatRoom = this.navigateToChatRoom.bind(this);

    }

    navigateToChatRoom() {
        this.props.onTouch(this.props.item);
    }

    render() {
        const {id, name} = this.props.item;
        const item = MOCK_TOPICS.find(item => item.id === id);
        return (
            <TouchableOpacity onPress={this.navigateToChatRoom}>
                <View style={styles.container}>
                    <ImageBackground imageStyle={styles.imageStyle} style={styles.image} source={item.image} />
                    <View style={styles.mainInfo}>
                        <View style={styles.name}>
                            <Text style={{ color: '#06266F', fontSize: 18 }}>{name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%',
    },
    image: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    imageStyle: {
        resizeMode: 'contain'
    },
    mainInfo: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        borderBottomColor: '#828282',
        borderBottomWidth: 1
    },
    name: {
    },
    online: {
    }
});
