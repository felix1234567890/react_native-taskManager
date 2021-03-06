import React from 'react';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import SingleTask from '../components/SingleTask';

const TaskList = ({ navigation }) => {
  const tasks = useSelector(state => state.tasks.tasks);

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={singleData => (
        <SingleTask
          title={singleData.item.title}
          completed={singleData.item.completed}
          dueDate={singleData.item.dueDate}
          description={singleData.item.description}
          difficulty={singleData.item.difficulty}
          viewTask={() => {
            navigation.navigate('TaskDetail', {
              taskId: singleData.item.id,
              taskTitle: singleData.item.title
            });
          }}
        />
      )}
    />
  );
};
TaskList.navigationOptions = navigationData => {
  return {
    headerTitle: 'Lista zadataka',
    headerRight: (
      <Icon
        name="plus"
        type="font-awesome"
        onPress={() => navigationData.navigation.navigate('TaskAddEdit')}
        iconStyle={{ marginRight: 10, fontSize: 30 }}
      />
    )
  };
};
export default TaskList;
