import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigateToTopicsScreen = this.navigateToTopicsScreen.bind(this);
        // Web Socket example
        // var ws = new WebSocket('ws://192.168.1.65:1337');
        // // ws.send("Hello");
        // ws.onopen = () => {
        //     // connection opened
        //     ws.send(JSON.stringify({
        //         name: 'something'
        //     })); // send a message
        // };
        //
        // ws.onmessage = (e) => {
        //     // a message was received
        //     console.log(e.data);
        // };
        //
        // ws.onerror = (e) => {
        //     // an error occurred
        //     console.log(e.message);
        // };
        //
        // ws.onclose = (e) => {
        //     // connection closed
        //     console.log(e.code, e.reason);
        // };

    }

    navigateToTopicsScreen() {
        this.navigation.navigate('TopicsScreen', { navigation: this.navigation });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Let's {'\n'} Discuss</Text>
                <Text style={styles.subtitle}>Anonymous chats with the same interests</Text>
                <View style={styles.exampleChat}>
                    <View style={styles.exampleMessage1}>
                        <Text style={{ color: '#00073D'}}>Choose topic</Text>
                    </View>
                    <View style={styles.exampleMessage2}>
                        <Text style={{ color: '#00073D', paddingLeft: 20, flexWrap: 'wrap'}}>Start a discussion</Text>
                    </View>
                    <View style={styles.exampleMessage1}>
                        <Text style={{ color: '#00073D'}}>Just 2 clicks</Text>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/logo.gif')} />
                </View>
                <TouchableOpacity onPress={this.navigateToTopicsScreen}>
                    <View style={styles.startButton}>
                        <Text style={{textTransform: 'uppercase',
                                      color: '#fff',
                                      fontSize: 18,
                                      fontWeight: 'bold'}}>Start</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        color: '#1240AB',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#4F4F4F',
        fontSize: 14
    },
    exampleChat: {
        flex: 1,
        width: '100%',
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
    },
    exampleMessage1: {
        backgroundColor: '#FFCC00',
        height: 40,
        width: 200,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        marginTop: 10
    },
    exampleMessage2: {
        backgroundColor: '#C4E3F8',
        height: 40,
        width: 200,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        marginTop: 10
    },
    imageContainer: {
        width: '100%',
        alignItems: 'flex-end',
        position: 'relative',
        top: -30
    },
    image: {
        width: 268,
        height: 221,
    },
    startButton: {
        width: 176,
        height: 42,
        backgroundColor: '#1240AB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
});
