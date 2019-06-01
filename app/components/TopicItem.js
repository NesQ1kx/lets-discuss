import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigateToChatRoom = this.navigateToChatRoom.bind(this);
    }

    navigateToChatRoom() {
        this.navigation.navigate('ChatRoomScreen', { item: this.props.item });
    }

    render() {
        const {name, image, online} = this.props.item;
        return (
            <TouchableHighlight onPress={this.navigateToChatRoom}>
                <View style={styles.container}>
                    <Image style={styles.image} source={image} />
                    <View style={styles.mainInfo}>
                        <View style={styles.name}>
                            <Text style={{ color: '#190773', fontSize: 18 }}>{name}</Text>
                        </View>
                        <View style={styles.online}>
                            <Text style={{ color: '#828282' }}>online {online}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
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
        marginRight: 10
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
