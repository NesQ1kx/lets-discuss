import React from "react";
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, FlatList } from "react-native";

import { MODAL_MESSAGES, POPUP_MESSAGES, SOCKET_ACTIONS, CHAT_ROOM_ACTION_BUTTONS } from "../constants";
import { OutgoingMessage, IncomingMessage, UserInput, ModalWindow, PopupMessage, ChatRoomActionButton } from "../components";

import { SingleSocket } from "../services";

export default class ChatRoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.item = this.navigation.getParam("item");
        this.roomInfo = this.navigation.getParam("roomInfo");
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
        if (this.roomInfo.action === SOCKET_ACTIONS.CHAT_CONNECTED) {
            this.setState({ searchCompanion: false});
        }

        SingleSocket.instance.onmessage = (ev) => {
            const data = JSON.parse(ev.data);
            console.log(data.action);
            switch (data.action) {
                case SOCKET_ACTIONS.COMPANION_CONNECTED:
                    this.setState({ searchCompanion: false, companionFound: true});
                    setTimeout(() => {
                        this.setState({ companionFound: false })
                    }, 1500);
                    break;
                case SOCKET_ACTIONS.NEW_MESSAGE:
                    this.handleIncomingMessage(data.payload.message);
                    break;
                case SOCKET_ACTIONS.CHAT_CLOSED:
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
            SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.LEAVE_ROOM, user_data: {uuid: this.roomInfo.payload.uuid} }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate("TopicsScreen");
        })
    }

    negativeCancelSearchModalAnswer() {
        this.setState({ cancelSearchDialogModalVisible: false});
    }

    positiveNextDialogModalAnswer() {
        this.setState({ nextDialogModalVisible: false });
        SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.LEAVE_ROOM, user_data: {uuid: this.roomInfo.payload.uuid} }));
        SingleSocket.instance.close();
        SingleSocket.instance = null;
        SingleSocket.instance.send(JSON.stringify({action: SOCKET_ACTIONS.CONNECT, user_data: {theme_id: this.item.id}}))
    }

    negativeNextDialogModalAnswer() {
        this.setState({ nextDialogModalVisible: false });
    }

    positiveEndDialogModalAnswer() {
        this.setState({ endDialogModalVisible: false}, () => {
            SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.LEAVE_ROOM, user_data: { uuid: this.roomInfo.payload.uuid } }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate("TopicsScreen");
        });
    }

    negativeEndDialogModalAnswer() {
        this.setState({ endDialogModalVisible: false });
    }

    newCompanionAnswer() {
        this.setState({ companionLeftModalVisible: false});
        SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.LEAVE_ROOM, user_data: { uuid: this.roomInfo.payload.uuid }}));
        SingleSocket.instance.send(JSON.stringify({action: SOCKET_ACTIONS.CONNECT, user_data: {theme_id: this.item.id}}));
        this.setState({ searchCompanion: true});
    }

    chooseTopicAnswer() {
        this.setState({ companionLeftModalVisible: false }, () => {
            SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.LEAVE_ROOM, user_data: { uuid: this.roomInfo.payload.uuid } }));
            SingleSocket.instance.close();
            SingleSocket.instance = null;
            this.navigation.navigate("TopicsScreen")
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
        SingleSocket.instance.send(JSON.stringify({ action: SOCKET_ACTIONS.MESSAGE, user_data: {message: message, uuid: this.roomInfo.payload.uuid }}));
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
                    <Text style={{color: "#ffffff", fontSize: 16}}>Let's discuss {this.item.forChat}</Text>
                    <View style={styles.buttonContainer}>
                        {this.state.searchCompanion && <ChatRoomActionButton action={this.onPressCancelSearchButton}
                                                                             text={CHAT_ROOM_ACTION_BUTTONS.CANCEL_SEARCH_BUTTON.text}
                                                                             image={CHAT_ROOM_ACTION_BUTTONS.CANCEL_SEARCH_BUTTON.image} />}
                        {!this.state.searchCompanion && <ChatRoomActionButton action={this.onPressNextDialogButton} 
                                                                              text={CHAT_ROOM_ACTION_BUTTONS.NEXT_DIALOG_BUTTON.text}
                                                                              image={CHAT_ROOM_ACTION_BUTTONS.NEXT_DIALOG_BUTTON.image}/>}
                        {!this.state.searchCompanion && <ChatRoomActionButton action={this.onPressEndDialogButton}
                                                                              text={CHAT_ROOM_ACTION_BUTTONS.END_DIALOG_BUTTON.text}
                                                                              image={CHAT_ROOM_ACTION_BUTTONS.END_DIALOG_BUTTON.image} />}
                    </View>
                </View>
                {this.state.companionFound && <PopupMessage message={POPUP_MESSAGES.companionFoundPopupMessage.text}
                                                            color={POPUP_MESSAGES.companionFoundPopupMessage.color} />}
                {this.state.searchCompanion && <PopupMessage message={POPUP_MESSAGES.searchCompanionPopupMessage.text}
                                                             color={POPUP_MESSAGES.searchCompanionPopupMessage.color} />}
                {this.state.companionLeftModalVisible && <PopupMessage message={POPUP_MESSAGES.companionLeftPopupMessage.text}
                                                                       color={POPUP_MESSAGES.companionLeftPopupMessage.color} />}
                {this.state.cancelSearchDialogModalVisible && <ModalWindow positiveAnswer={this.positiveCancelSearchModalAnswer}
                                                                           negativeAnswer={this.negativeCancelSearchModalAnswer}
                                                                           modalTitle={MODAL_MESSAGES.cancelDialogSearchModal.modalTitle}
                                                                           modalMessage={MODAL_MESSAGES.cancelDialogSearchModal.modalMessage}
                                                                           firstAnswer={MODAL_MESSAGES.cancelDialogSearchModal.firstAnswer}
                                                                           secondAnswer={MODAL_MESSAGES.cancelDialogSearchModal.secondAnswer} />}
                {this.state.nextDialogModalVisible && <ModalWindow positiveAnswer={this.positiveNextDialogModalAnswer}
                                                                       negativeAnswer={this.negativeNextDialogModalAnswer}
                                                                       modalTitle={MODAL_MESSAGES.nexDialogModal.modalTitle}
                                                                       modalMessage={MODAL_MESSAGES.nexDialogModal.modalMessage}
                                                                       firstAnswer={MODAL_MESSAGES.nexDialogModal.firstAnswer}
                                                                       secondAnswer={MODAL_MESSAGES.nexDialogModal.secondAnswer} />}
                {this.state.endDialogModalVisible && <ModalWindow positiveAnswer={this.positiveEndDialogModalAnswer}
                                                                  negativeAnswer={this.negativeEndDialogModalAnswer}
                                                                  modalTitle={MODAL_MESSAGES.endDialogModal.modalTitle}
                                                                  modalMessage={MODAL_MESSAGES.endDialogModal.modalMessage}
                                                                  firstAnswer={MODAL_MESSAGES.endDialogModal.firstAnswer}
                                                                  secondAnswer={MODAL_MESSAGES.endDialogModal.secondAnswer} />}
                {this.state.companionLeftModalVisible && <ModalWindow positiveAnswer={this.newCompanionAnswer}
                                                                      negativeAnswer={this.chooseTopicAnswer}
                                                                      modalTitle={MODAL_MESSAGES.companionLeftModal.modalTitle}
                                                                      modalMessage={MODAL_MESSAGES.companionLeftModal.modalMessage}
                                                                      firstAnswer={MODAL_MESSAGES.companionLeftModal.firstAnswer}
                                                                      secondAnswer={MODAL_MESSAGES.companionLeftModal.secondAnswer} />}
                {this.state.searchCompanion && !this.state.cancelSearchDialogModalVisible &&
                (<View style={styles.searchIndicator}>
                    <Image style={{width: 100, height: 100, left: "50%", marginLeft: -50}}
                        source={require("../assets/loading_spiner.gif")} />
                </View>)
                }
                {!this.state.searchCompanion && !this.state.companionLeftModalVisible && !this.state.endDialogModalVisible && (
                    <FlatList
                        style={{flex: 1}}
                        renderItem={this.renderItem}
                        data={this.state.messages}
                        keyExtractor={this._keyExtractor}
                        inverted />
                )}
                {!this.state.searchCompanion && !this.state.companionLeftModalVisible && !this.state.endDialogModalVisible && (
                    <KeyboardAvoidingView behavior="padding">
                        <UserInput onSendMessage={this.handleOutgoingMessage} />
                    </KeyboardAvoidingView>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 80,
        backgroundColor: "#1240AB",
        zIndex: 10
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    container: {
        flex: 1
    },
    searchIndicator: {
        flex: 1,
        top: "25%",
        zIndex: -1
    },
    messageContainer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        height: "100%",
        borderColor: "#000000",
        borderWidth: 1,
    }
});
