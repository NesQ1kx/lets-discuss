import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight, TextInput} from 'react-native';

export const OutgoingMessage = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.messageText}>
                {props.message}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        width: 200,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#C4E3F8',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginBottom: 10
    },
    messageText: {
        fontSize: 14
    }
});
