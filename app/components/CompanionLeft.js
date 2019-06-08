import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export const CompanionLeft = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Собеседник покинул беседу</Text>
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
        backgroundColor: '#EB5757',
        width: '100%',
        height: 24
    },
    text: {
        fontSize: 12,
        color: '#ffffff'
    }
});
