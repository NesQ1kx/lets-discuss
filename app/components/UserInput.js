import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';

export class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        const message = this.state.message.trim();
        if (message !== '') {
            this.props.onSendMessage(message);
            this.setState({ message: '' });
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    value={this.state.message}
                    style={styles.input}
                    placeholder="Введите сообщение"
                    onChangeText={(text) => this.setState({ message: text })}/>
                <TouchableHighlight onPress={this.sendMessage}>
                    <View>
                        <Image style={styles.sendButton} source={require('../assets/send_button.png')}/>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#b3b6bc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 16,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        width: '90%'
    },
    sendButton: {
      height: 40,
      width: 40
    }
});
