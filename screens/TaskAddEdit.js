import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { DatePicker, Picker, Item, CheckBox, Textarea } from 'native-base';
import Spacer from '../components/Spacer';
import { COLORS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask } from '../store/taskActions';

const TaskAddEdit = ({ navigation }) => {
  const taskId = navigation.getParam('taskId');
  const editingTask = useSelector(state =>
    state.tasks.tasks.find(task => task.id === taskId)
  );
  const [formData, setFormData] = useState({
    title: editingTask ? editingTask.title : '',
    description: editingTask ? editingTask.description : '',
    dueDate: editingTask ? editingTask.dueDate : new Date(),
    difficulty: editingTask ? editingTask.difficulty : '1',
    completed: editingTask ? editingTask.completed : false
  });
  const [titleValid, setTitleValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState(
    'Opis mora postojati'
  );
  const formValid = titleValid && descriptionValid;
  const dispatch = useDispatch();
  const submitHandler = () => {
    if (editingTask) {
      dispatch(editTask(taskId, formData));
    } else {
      dispatch(addTask(formData));
    }
    navigation.navigate('TaskList');
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={70}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Naziv Zadatka</Text>
            <TextInput
              style={styles.field}
              value={formData.title}
              returnKeyType="next"
              onChangeText={title => {
                if (title.trim().length === 0) {
                  setTitleValid(false);
                } else setTitleValid(true);
                setFormData({
                  ...formData,
                  title
                });
              }}
            />
            {!titleValid && (
              <Text style={{ color: 'red', fontSize: 14 }}>
                Naziv mora postojati
              </Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Opis Zadatka</Text>
            <Textarea
              rowSpan={4}
              bordered
              value={formData.description}
              onChangeText={description => {
                if (description.trim().length === 0) {
                  setDescriptionValid(false);
                } else if (description.trim().length < 10) {
                  setDescriptionValid(false);
                  setDescriptionMessage('Opis mora biti duži od 10 znakova');
                } else {
                  setDescriptionValid(true);
                  setDescriptionMessage('');
                }
                setFormData({
                  ...formData,
                  description
                });
              }}
              style={{ padding: 5 }}
            />
            {!descriptionValid && (
              <Text style={{ color: 'red', fontSize: 14 }}>
                {descriptionMessage}
              </Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Rok izvršenja:</Text>
            <DatePicker
              defaultDate={formData.dueDate}
              minimumDate={formData.dueDate}
              maximumDate={new Date(2022, 12, 31)}
              locale={'en'}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={
                editingTask
                  ? formData.dueDate.toISOString().split('T')[0]
                  : 'Izaberi datum'
              }
              textStyle={{ color: 'green' }}
              placeHolderTextStyle={{ color: 'black' }}
              onDateChange={date => setFormData({ ...formData, dueDate: date })}
              disabled={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Težina</Text>
            <Item picker style={{ width: 100 }}>
              <Picker
                mode="dropdown"
                placeholder="Izaberi težinu"
                placeholderStyle={{ color: '#bfc6ea' }}
                selectedValue={formData.difficulty}
                onValueChange={difficulty =>
                  setFormData({ ...formData, difficulty })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </Item>
          </View>
          <Spacer />
          {navigation.getParam('taskId') && (
            <View style={styles.checkbox}>
              <CheckBox
                checked={formData.completed}
                color="green"
                onPress={() =>
                  setFormData(prevState => {
                    return {
                      ...formData,
                      completed: !prevState.completed
                    };
                  })
                }
              />
              <Text style={{ ...styles.label, marginLeft: 20 }}>Završeno?</Text>
            </View>
          )}
          <Spacer />
          <Button
            disabled={!formValid}
            color={COLORS.primaryColor}
            title={navigation.getParam('taskId') ? 'Izmijeni' : 'Dodaj'}
            onPress={submitHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formGroup: {
    paddingVertical: 5
  },
  label: {
    fontSize: 18
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
TaskAddEdit.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('taskId')
      ? 'Izmijeni zadatak'
      : 'Dodaj novi zadatak'
  };
};
export default TaskAddEdit;
