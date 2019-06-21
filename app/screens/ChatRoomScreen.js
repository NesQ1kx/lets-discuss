import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import { SearchCompanion } from "../components/SearchCompanion";
import { CancelSearchButton } from "../components/CancelSearchButton";
import { CancelDialogSearchModal } from "../components/CancelDialogSearchModal";
import {NextDialogButton} from "../components/NextDialogButton";
import { EndDialogButton } from "../components/EndDialogButton";
import {NextDialogModal} from "../components/NextDialogModal";
import {EndDialogModal} from "../components/EndDialogModal";
import {CompanionLeft} from "../components/CompanionLeft";
import {CompanionLeftModal} from "../components/CompanionLeftModal";
import UserInput from "../components/UserInput";
import {OutgoingMessage} from "../components/OutgoingMessage";
import {IncomingMessage} from "../components/IncomingMessage";
import SingleSocket from "../services/SocketSingletone";
import {CompanionFound} from "../components/CompanionFound";


export default class ChatRoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.item = this.navigation.getParam('item');
        this.roomInfo = this.navigation.getParam('roomInfo');
        this.state = { searchCompanion: true,
                       companionFound: false,
                       cancelSearchDialogModalVisible: false,
                       nextDialogModalVisible: false,
                       endDialogModalVisible: false,
                       companionLeftModalVisible: false,
                       messages: []};
        this.onPressCancelSearchButton = this.onPressCancelSearchButton.bind(this);
        this.positiveCancelSearchModalAnswer = this.positiveCancelSearchModalAnswer.bind(this);
        this.negativeCancelSearchModalAnswer = this.negativeCancelSearchModalAnswer.bind(this);
        this.onPressNextDialogButton = this.onPressNextDialogButton.bind(this);
        this.onPressEndDialogButton = this.onPressEndDialogButton.bind(this);
        this.positiveNextDialogModalAnswer = this.positiveNextDialogModalAnswer.bind(this);
        this.negativeNextDialogModalAnswer = this.negativeNextDialogModalAnswer.bind(this);
        this.positiveEndDialogModalAnswer = this.positiveEndDialogModalAnswer.bind(this);
        this.negativeEndDialogModalAnswer = this.negativeEndDialogModalAnswer.bind(this);
        this.newCompanionAnswer = this.newCompanionAnswer.bind(this);
        this.chooseTopicAnswer = this.chooseTopicAnswer.bind(this);
        this.handleOutgoingMessage = this.handleOutgoingMessage.bind(this);
        this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
    }

    componentDidMount() {
        if (this.roomInfo.action === 'CHAT_CONNECTED') {
            this.setState({ searchCompanion: false});
        }

        SingleSocket.instance.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            console.log(data.action);
            switch (data.action) {
                case 'COMPANION_CONNECTED':
                    this.setState({ searchCompanion: false, companionFound: true});
                    setTimeout(() => {
                        this.setState({ companionFound: false })
                    }, 1500);
                    break;
                case 'NEW_MESSAGE':
                    this.handleIncomingMessage(data.payload.message);
                    break;
                case 'CHAT_CLOSED':
                    this.setState({ companionLeftModalVisible: true });
                    break;
            }
        };
    }

    onPressCancelSearchButton() {
        this.setState({ cancelSearchDialogModalVisible: true });
    }

    onPressNextDialogButton() {
        this.setState({ nextDialogModalVisible: true});
    }

    onPressEndDialogButton() {
        this.setState( { endDialogModalVisible: true });
    }

    positiveCancelSearchModalAnswer() {
        this.setState({ cancelSearchDialogModalVisible: false}, () => {
            SingleSocket.instance.send(JSON.stringify({ action: 'LEAVE_ROOM', user_data: {uuid: this.roomInfo.payload.uuid} }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate('TopicsScreen');
        })
    }

    negativeCancelSearchModalAnswer() {
        this.setState({ cancelSearchDialogModalVisible: false});
    }

    positiveNextDialogModalAnswer() {
        this.setState({ nextDialogModalVisible: false });
        SingleSocket.instance.send(JSON.stringify({ action: 'LEAVE_ROOM', user_data: {uuid: this.roomInfo.payload.uuid} }));
        SingleSocket.instance.close();
        SingleSocket.instance = null;
        SingleSocket.instance.send(JSON.stringify({action: 'CONNECT', user_data: {theme_id: this.item.id}}))
    }

    negativeNextDialogModalAnswer() {
        this.setState({ nextDialogModalVisible: false });
    }

    positiveEndDialogModalAnswer() {
        this.setState({ endDialogModalVisible: false}, () => {
            SingleSocket.instance.send(JSON.stringify({ action: 'LEAVE_ROOM', user_data: { uuid: this.roomInfo.payload.uuid } }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate('TopicsScreen');
        });
    }

    negativeEndDialogModalAnswer() {
        this.setState({ endDialogModalVisible: false });
    }

    newCompanionAnswer() {
        this.setState({ companionLeftModalVisible: false});
        SingleSocket.instance.send(JSON.stringify({ action: 'LEAVE_ROOM', user_data: { uuid: this.roomInfo.payload.uuid }}));
        SingleSocket.instance.send(JSON.stringify({action: 'CONNECT', user_data: {theme_id: this.item.id}}));
        this.setState({ searchCompanion: true});
    }

    chooseTopicAnswer() {
        this.setState({ companionLeftModalVisible: false }, () => {
            SingleSocket.instance.send(JSON.stringify({ action: 'LEAVE_ROOM', user_data: { uuid: this.roomInfo.payload.uuid } }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate('TopicsScreen')
        });
    }

    renderItem({ item }) {
        return (
            item.incoming
            ? <IncomingMessage message={item.message}/>
            : <OutgoingMessage message={item.message}/>
        );
    }

    handleOutgoingMessage(message) {
        let messages = this.state.messages;
        messages.unshift({
            message: message,
            incoming: false
        });
        this.setState({ messages: messages });
        SingleSocket.instance.send(JSON.stringify({ action: 'MESSAGE', user_data: {message: message, uuid: this.roomInfo.payload.uuid }}));
    }

    handleIncomingMessage(message) {
        let messages = this.state.messages;
        messages.unshift({
            message: message,
            incoming: true
        });
        this.setState({ messages: messages });
    }

    _keyExtractor = (item, index) => index.toString();

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Давай обсудим {this.item.forChat}</Text>
                    <View style={styles.buttonContainer}>
                        {this.state.searchCompanion && <CancelSearchButton cancelSearch={this.onPressCancelSearchButton}/>}
                        {!this.state.searchCompanion && <NextDialogButton nextDialog={this.onPressNextDialogButton}/>}
                        {!this.state.searchCompanion && <EndDialogButton endDialog={this.onPressEndDialogButton}/>}
                    </View>
                </View>
                {this.state.companionFound && <CompanionFound />}
                {this.state.searchCompanion && <SearchCompanion />}
                {this.state.companionLeftModalVisible && <CompanionLeft />}
                {this.state.cancelSearchDialogModalVisible && <CancelDialogSearchModal positiveAnswer={this.positiveCancelSearchModalAnswer}
                                                                                       negativeAnswer={this.negativeCancelSearchModalAnswer}/>}
                {this.state.nextDialogModalVisible && <NextDialogModal positiveAnswer={this.positiveNextDialogModalAnswer}
                                                                       negativeAnswer={this.negativeNextDialogModalAnswer}/>}
                {this.state.endDialogModalVisible && <EndDialogModal positiveAnswer={this.positiveEndDialogModalAnswer}
                                                                     negativeAnswer={this.negativeEndDialogModalAnswer}/>}
                {this.state.companionLeftModalVisible && <CompanionLeftModal newCompanion={this.newCompanionAnswer}
                                                                             chooseTopic={this.chooseTopicAnswer}/>}
                {this.state.searchCompanion && !this.state.cancelSearchDialogModalVisible &&
                (<View style={styles.searchIndicator}>
                    <Image style={{width: 100, height: 100, left: '50%', marginLeft: -50}}
                        source={require("../assets/loading_spiner.gif")}/>
                </View>)
                }
                {!this.state.searchCompanion && !this.state.companionLeftModalVisible && !this.state.endDialogModalVisible && (
                    <FlatList
                        style={{flex: 1}}
                        renderItem={this.renderItem}
                        data={this.state.messages}
                        keyExtractor={this._keyExtractor}
                        inverted
                    />
                )}
                {!this.state.searchCompanion && !this.state.companionLeftModalVisible && !this.state.endDialogModalVisible && (
                    <KeyboardAvoidingView behavior="padding">
                        <UserInput onSendMessage={this.handleOutgoingMessage}/>
                    </KeyboardAvoidingView>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 80,
        backgroundColor: '#1240AB',
        zIndex: 10
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    container: {
        flex: 1
    },
    searchIndicator: {
        flex: 1,
        top: '25%',
        zIndex: -1
    },
    messageContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: '100%',
        borderColor: '#000000',
        borderWidth: 1,
    }
});
