import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from './nav/Home';
import TwoScreen from './nav/Two';
import ThirdScreen from './nav/Third';

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      // screenOptions={({route, navigation}) => ({
      //   headerShown: true,
      //   gestureEnabled: true,
      //   ...TransitionPresets.ModalPresentationIOS,
      // })}
    >
      <Stack.Screen
        name="Index"
        component={RootTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Two"
        component={TwoScreen}
        // options={{
        //   headerShown: true,
        //   title: 'TWO页面',
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // }}
      />
      <Stack.Screen name="Third" component={ThirdScreen} />
    </Stack.Navigator>
  );
};

const RootTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: {borderWidth: 0, borderColor: 'rgba(0,0,0,0)'},
        indicatorStyle: {height: 0},
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Two" component={TwoScreen} />
      <Tab.Screen
        name="Third"
        component={ThirdScreen}
        options={{
          title: 'Third页面',
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;
