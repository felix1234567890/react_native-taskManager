import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import TaskList from "./screens/TaskList";
import TaskDetail from "./screens/TaskDetail";
import TaskAddEdit from "./screens/TaskAddEdit";
import { NativeBaseProvider } from "native-base";
import { useTranslation } from "react-i18next";
import './locales/index'

const Stack = createNativeStackNavigator();

export default function App() {
  const { t } = useTranslation();
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen
              name="TaskList"
              component={TaskList}
              options={() => ({
                title: t('taskList'),
                headerRight: () => (
                  <>
                    <Icon
                      name="plus"
                      type="font-awesome"
                      iconStyle={{ marginRight: 10, fontSize: 30 }}
                    />
                  </>
                ),
              })}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetail}
              options={({ route }) => ({
                title: route.params.taskTitle,
                headerRight: () => (
                  <Icon
                    name="edit"
                    type="font-awesome"
                    iconStyle={{ marginRight: 10, fontSize: 30 }}
                  />
                ),
              })}
            />
            <Stack.Screen name="TaskAddEdit" component={TaskAddEdit} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
