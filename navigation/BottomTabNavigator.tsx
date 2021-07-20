/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, } from '../types';
import DetailsScreen from '../screens/DetailsScreen';
import { ReactElement } from 'react';
import TabFourScreen from '../screens/TabFourScreen';
import ChoiceScreen from '../screens/ChoiceScreen';
import GameOverScreen from '../screens/GameOverScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): ReactElement {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Browse"

      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Find"
        component={TabOneNavigator}
        options={{
          tabBarIcon: setIcon,
        }}
      />
      <BottomTab.Screen
        name="Browse"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: setIcon,
        }}
      />
      <BottomTab.Screen
        name="Favs"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: setIcon,
        }}
      />
      <BottomTab.Screen
        name="Fight"
        component={TabFourNavigator}
        options={{
          tabBarIcon: setIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}

function setIcon(props: {color: string}) {
  return (
    <TabBarIcon name="ios-code" color={props.color} />
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Find' }}
      />
      <TabOneStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Browse' }}
      />
      <TabTwoStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
    </TabTwoStack.Navigator>
  );
}


const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: 'Favs' }}
      />
      <TabThreeStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabFourScreen}
        options={{ headerTitle: 'Fight' }}
      />
      <TabFourStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
      <TabFourStack.Screen
        name="ChoiceScreen"
        component={ChoiceScreen}
        options={{ headerTitle: 'Choose your pokemon' }}
      />
       <TabFourStack.Screen
        name="GameOverScreen"
        component={GameOverScreen}
        options={{ headerTitle: 'Game over' }}
      />
    </TabFourStack.Navigator>
  );
}