import React from 'react';
import {Image, StyleSheet, Text, View } from 'react-native';

export const IncomingMessage = (props) => {
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
        backgroundColor: '#F2F2F2',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginBottom: 10
    },
    messageText: {
        fontSize: 14
    }
});
