import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TaskList from './screens/TaskList';
import TaskDetail from './screens/TaskDetail';
import TaskAddEdit from './screens/TaskAddEdit';
import { COLORS } from './constants';
import { Platform } from 'react-native';

const taskNavigation = createStackNavigator(
  {
    TaskList,
    TaskDetail,
    TaskAddEdit
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.primaryColor
      },
      headerTintColor: Platform.OS === 'ios' ? '#fff' : '#000',
      headerTintStyle: {
        fontWeight: 'bold'
      }
    }
  }
);
export default createAppContainer(taskNavigation);
