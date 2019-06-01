import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SearchCompanion } from "../components/SearchCompanion";
import { CancelSearchButton } from "../components/CancelSearchButton";
import { CancelDialogSearchModal } from "../components/CancelDialogSearchModal";
import {NextDialogButton} from "../components/NextDialogButton";
import { EndDialogButton } from "../components/EndDialogButton";
import {NextDialogModal} from "../components/NextDialogModal";
import {EndDialogModal} from "../components/EndDialogModal";

export default class ChatRoomScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.item = this.navigation.getParam('item');
        this.state = { searchCompanion: true,
                       cancelSearchDialogModalVisible: false,
                       nextDialogModalVisible: false,
                       nCancelDialogModalVisible: false };
        this.onPressCancelSearchButton = this.onPressCancelSearchButton.bind(this);
        this.positiveModalAnswer = this.positiveModalAnswer.bind(this);
        this.negativeModalAnswer = this.negativeModalAnswer.bind(this);
        this.onPressNextDialogButton = this.onPressNextDialogButton.bind(this);
        this.onPressEndDialogButton = this.onPressEndDialogButton.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ searchCompanion: false });
        }, 1500);
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

    positiveModalAnswer() {
        this.setState({ cancelSearchDialogModalVisible: false}, () => {
            this.navigation.navigate('TopicsScreen');
        })
    }

    negativeModalAnswer() {
        this.setState({ cancelSearchDialogModalVisible: false});
    }


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
                {this.state.searchCompanion && <SearchCompanion />}
                {this.state.cancelSearchDialogModalVisible && <CancelDialogSearchModal positiveAnswer={this.positiveModalAnswer}
                                                                                       negativeAnswer={this.negativeModalAnswer}/>}
                {this.state.nextDialogModalVisible && <NextDialogModal positiveAnswer={this.positiveModalAnswer}
                                                                       negativeAnswer={this.negativeModalAnswer}/>}
                {this.state.endDialogModalVisible && <EndDialogModal positiveAnswer={this.positiveModalAnswer}
                                                                     negativeAnswer={this.negativeModalAnswer}/>}
                {this.state.searchCompanion &&
                    <View style={styles.searchIndicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
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
        height: 60,
        backgroundColor: '#3016B0',
        marginTop: 20,
        zIndex: 10
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    container: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    searchIndicator: {
        flex: 1,
        top: 200,
        zIndex: -1
    }
});
