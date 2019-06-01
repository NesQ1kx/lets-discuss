import React from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export const CancelDialogSearchModal = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Отменить поиск</Text>
            <Text style={styles.tip}>Вы уверены, что хотите отменить поиск собеседника и перейти к выбору тему?</Text>
            <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={props.positiveAnswer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Да</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.negativeAnswer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Отмена</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 160,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: 160,
        marginLeft: -150,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        zIndex: 99,
        padding: 15,
        flexDirection: 'column',
    },
    header: {
        fontSize: 16,
        color: '#190773'
    },
    tip: {
        marginTop: 10,
        color: '#b3b6bc',
        fontSize: 14
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    },
    button: {
        width: 90,
        height: 30,
        borderColor: '#FFCC00',
        borderWidth: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        color: '#190773',
        textTransform: 'uppercase',
        fontSize: 16,
    }
});
