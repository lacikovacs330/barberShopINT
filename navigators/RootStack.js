import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
const {primary,tertiary} = Colors;

import {Colors} from "../styles/styles";

import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Index from './../screens/Index';
import Admin from './../screens/Admin';
import Update from './../screens/Update';
import Create from './../screens/Create';

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions ={{
                    headerStyled:{
                      background:'transparent'
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft:20
                    }
                }}
                initialRouteName = "Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Admin" component={Admin}/>
                <Stack.Screen name="Update" component={Update}/>
                <Stack.Screen name="Create" component={Create}/>
                <Stack.Screen options={{ headerTintColor: primary}} name="Index" component={Index}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;
