import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {MOCK_TOPICS} from "../mocks/mockTopics";
import TopicItem from "../components/TopicItem";

export default class TopicsScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={{color: '#ffffff', fontSize: 16}}>Выбери тему для обсуждения</Text>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        {MOCK_TOPICS.map((item, index) => <TopicItem
                                                                    key={index}
                                                                    item={item}
                                                                    navigation={this.props.navigation}/>)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#3016B0',
        marginTop: 20,
        zIndex: 10
    },
    container: {
        flexDirection: 'column',
        marginTop: 80,
    }
});
