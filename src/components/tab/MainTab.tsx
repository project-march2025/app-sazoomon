import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import TodayLucky from '../../screens/TodayLucky';
import StorageScreen from '../../screens/StorageScreen';
import MoreScreen from '../../screens/MoreScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="TodayLucky" component={TodayLucky} />
      <Tab.Screen name="Storage" component={StorageScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
