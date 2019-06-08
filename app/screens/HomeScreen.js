import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.navigateToTopicsScreen = this.navigateToTopicsScreen.bind(this);
    }

    navigateToTopicsScreen() {
        this.navigation.navigate('TopicsScreen', { navigation: this.navigation });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Quick {'\n'} Chat</Text>
                <Text style={styles.subtitle}>Анонимные чаты по интересам</Text>
                <View style={styles.exampleChat}>
                    <View style={styles.exampleMessage1}>
                        <Text style={{textTransform: 'uppercase', color: '#00073D'}}>Выбери тму</Text>
                    </View>
                    <View style={styles.exampleMessage2}>
                        <Text style={{textTransform: 'uppercase', color: '#00073D'}}>Начни обсуждение с собеседником</Text>
                    </View>
                    <View style={styles.exampleMessage1}>
                        <Text style={{textTransform: 'uppercase', color: '#00073D'}}>Всего в 2 клика</Text>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/logo.png')} />
                </View>
                <TouchableHighlight onPress={this.navigateToTopicsScreen}>
                    <View style={styles.startButton}>
                        <Text style={{textTransform: 'uppercase',
                                      color: '#fff',
                                      fontSize: 18,
                                      fontWeight: 'bold'}}>Начать</Text>
                    </View>
                </TouchableHighlight>
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
        color: '#3016B0',
        fontSize: 45,
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
        backgroundColor: '#190773',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
});
