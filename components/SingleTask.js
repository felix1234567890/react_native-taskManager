import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Card, Text, Rating, Divider, Icon } from 'react-native-elements';
import Spacer from './Spacer';

const SingleTask = props => {
  return (
    <TouchableNativeFeedback onPress={props.viewTask}>
      <Card>
        <View style={styles.firstRow}>
          <Text h3>{props.title}</Text>
        </View>
        <Divider />
        <Text style={styles.description}>
          {props.description.length > 30
            ? props.description.substring(0, 30) + '...'
            : props.description}
        </Text>
        <View style={styles.row}>
          <Text style={styles.difficulty}>Težina:</Text>
          <Rating imageSize={35} readonly startingValue={props.difficulty} />
        </View>

        {props.completed ? (
          <View style={styles.row}>
            <Icon
              style={styles.checkbox}
              type="font-awesome"
              name="check-circle"
              size={40}
            />
            <Text style={styles.compeletedText}>Završeno</Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Icon
              style={styles.checkbox}
              type="font-awesome"
              name="circle"
              size={40}
            />
            <Text style={styles.compeletedText}>Nezavršeno</Text>
          </View>
        )}
        <Spacer />
      </Card>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  difficulty: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  compeletedText: {
    paddingHorizontal: 10,
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  description: { fontSize: 20, marginVertical: 5 }
});
export default SingleTask;
