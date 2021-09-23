import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HeaderBackground,
  HeaderHeightContext,
} from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

import HomeScreen from './nav/Home';
import TwoScreen from './nav/Two';
import ThirdScreen from './nav/Third';

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: true,
        headerMode: 'screen',
        headerStyle: {height: 72, backgroundColor: '#f4511e'},
        headerTitleStyle: {textAlign: 'center'},
        gestureEnabled: true,
        // headerBackground: () => (
        //   <HeaderBackground style={{backgroundColor: 'tomato'}} />
        // ),
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      <Stack.Screen
        name="Index1"
        component={RootDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Index2"
        component={TopTabs}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Two" component={TwoScreen} />
      <Stack.Screen name="Third" component={ThirdScreen} />
    </Stack.Navigator>
  );
};

const RootTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home1"
      labeled={true}
      screenOptions={{
        headerShown: true,
        headerStyle: {height: 72},
        swipeEnabled: true,
        lazy: false,
        animationEnabled: true,
        tabBarStyle: {borderWidth: 0, borderColor: 'rgba(0,0,0,0)'},
        indicatorStyle: {height: 0},
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Tab.Screen
        name="Home1"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'ios-home'} size={24} color={color} />
          ),
          // tabBarBadge: 'Hot',
        }}
      />
      <Tab.Screen
        name="Two1"
        component={TwoScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'ios-information-circle'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Third1"
        component={ThirdScreen}
        options={{
          title: 'Third页面',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={'ios-book'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home2"
      screenOptions={{
        headerShown: true,
        headerStyle: {height: 72},
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Drawer.Screen name="Home2" component={HomeScreen} />
      <Drawer.Screen name="Two2" component={TwoScreen} />
    </Drawer.Navigator>
  );
};

const TopTabs = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Home3"
      tabBarPosition="top"
      screenOptions={{}}>
      <TopTab.Screen name="Home3" component={HomeScreen} />
      <TopTab.Screen name="Two3" component={TwoScreen} />
      <TopTab.Screen name="Third3" component={ThirdScreen} />
    </TopTab.Navigator>
  );
};

export default RootStack;
