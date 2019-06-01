import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export const CancelSearchButton = (props) => {
    return (
        <TouchableHighlight onPress={props.cancelSearch}>
            <View style={styles.container}>
                <Image source={require('../assets/cancel_search.png')}/>
                <Text style={styles.text}>отменить</Text>
            </View>
        </TouchableHighlight>

    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 40,
        borderLeftColor: '#a2a6ad',
        borderLeftWidth: 1,
        paddingLeft: 5,
        marginLeft: 5
    },
    text: {
        fontSize: 10,
        color: '#ffffff'
    }
});
