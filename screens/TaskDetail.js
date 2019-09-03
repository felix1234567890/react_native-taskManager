import React from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import { Rating, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Spacer from '../components/Spacer';
import moment from 'moment';
import { COLORS } from '../constants';
import { deleteTask } from '../store/taskActions';

const TaskDetail = ({ navigation }) => {
  const taskId = navigation.getParam('taskId');
  const clickedTask = useSelector(state =>
    state.tasks.tasks.find(task => task.id === taskId)
  );
  const dispatch = useDispatch();

  return clickedTask ? (
    <ScrollView>
      <Text style={styles.title}>{clickedTask.title}</Text>
      <Text style={{ color: '#ccc', fontSize: 18, textAlign: 'center' }}>
        Za
        {moment(clickedTask.dueDate)
          .fromNow(true)
          .replace('days', 'dana')}{' '}
        završava
      </Text>

      <Text style={styles.description}>{clickedTask.description}</Text>
      <Spacer />
      <View style={styles.row}>
        <Text style={styles.subtitle}>Težina</Text>
        <Rating
          imageSize={35}
          readonly
          startingValue={clickedTask.difficulty}
        />
      </View>
      <Spacer />
      <View style={styles.row}>
        <Button
          title="Obriši"
          color={COLORS.dangerColor}
          onPress={() => {
            Alert.alert(
              'Jesi li siguran?',
              'Želiš li uistinu izbrisati zadatak',
              [
                { text: 'Ne', style: 'default' },
                {
                  text: 'Da',
                  style: 'destructive',
                  onPress: () => {
                    dispatch(deleteTask(clickedTask.id));
                    navigation.goBack();
                  }
                }
              ]
            );
          }}
        />
        {/* <Button title="Završeno" color={COLORS.successColor} /> */}
      </View>
    </ScrollView>
  ) : null;
};
TaskDetail.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('taskTitle'),
    headerRight: (
      <Icon
        name="edit"
        type="font-awesome"
        onPress={() =>
          navigationData.navigation.navigate('TaskAddEdit', {
            taskId: navigationData.navigation.getParam('taskId')
          })
        }
        iconStyle={{ marginRight: 10, fontSize: 30 }}
      />
    )
  };
};
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 24
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10
  }
});
export default TaskDetail;
