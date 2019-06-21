import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const NextDialogButton = (props) => {
    return (
        <TouchableOpacity onPress={props.nextDialog}>
            <View style={styles.container}>
                <Image source={require('../assets/next_dialog.png')}/>
                <Text style={styles.text}>следующий</Text>
            </View>
        </TouchableOpacity>

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
