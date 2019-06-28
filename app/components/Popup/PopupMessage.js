import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export const PopupMessage = (props) => {
    return(
        <View style={[styles.container, {backgroundColor: props.color}]}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        width: '100%',
        height: 24
    },
    text: {
        fontSize: 12,
        color: '#ffffff'
    }
});
