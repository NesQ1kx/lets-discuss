import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export const ChatRoomActionButton = (props) => {
    return (
        <TouchableOpacity onPress={props.action}>
            <View style={styles.container}>
                <Image source={props.image}/>
                <Text style={styles.text}>{props.text}</Text>
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
