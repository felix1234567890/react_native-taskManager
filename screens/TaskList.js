import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import SingleTask from "../components/SingleTask";
import { Select, CheckIcon } from "native-base";
import {useTranslation} from 'react-i18next'

const TaskList = ({ navigation }) => {
  const {t, i18n} = useTranslation();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [lang, setLang] = useState('en');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Select
            minWidth="100"
            accessibilityLabel={t('language')}
            placeholder={t('language')}
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            mx={2}
            onValueChange={(itemValue) => setLang(itemValue)}
            defaultValue="en"
          >
            <Select.Item label={t('english')} value="en" />
            <Select.Item label={t('croatian')} value="hr" />
          </Select>
          <Icon
            name="plus"
            type="font-awesome"
            onPress={() => navigation.navigate("TaskAddEdit")}
            style={{paddingRight:10}}
          />
        </>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={(singleData) => (
        <SingleTask
          title={singleData.item.title}
          completed={singleData.item.completed}
          dueDate={singleData.item.dueDate}
          description={singleData.item.description}
          difficulty={singleData.item.difficulty}
          viewTask={() => {
            navigation.navigate("TaskDetail", {
              taskId: singleData.item.id,
              taskTitle: singleData.item.title,
            });
          }}
        />
      )}
    />
  );
};
export default TaskList;
