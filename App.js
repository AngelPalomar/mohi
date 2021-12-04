import React from "react";
import {
    NativeBaseProvider,
    extendTheme
} from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Components
import Login from './pages/public/Login'
import Register from "./pages/public/Register";
import Menu from "./pages/private/Menu";
import EditProfile from "./pages/private/EditProfile";
import VerPlatillo from "./pages/private/VerPlatillo";
import MenuDiario from "./pages/private/MenuDiario";

// extend the theme
const theme = extendTheme({
    colors: {
        primary: {
            50: '#E36A78',
            100: '#E05A69',
            200: '#DC495A',
            300: '#D9394B',
            400: '#D6293D',
            500: '#C42639',
            600: '#B72334',
            700: '#A92030',
            800: '#9B1D2C',
            900: '#8D1B28'
        },
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "light",
    }
});

//Routing
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'Login'}
                        component={Login}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen
                        name={'Register'}
                        component={Register}
                        options={{
                            title: 'Registrarse'
                        }} />
                    <Stack.Screen
                        name={'Menu'}
                        component={Menu}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen
                        name={'EditProfile'}
                        component={EditProfile}
                        options={{
                            headerShown: true,
                            title: ''
                        }} />
                    <Stack.Screen
                        name={'VerPlatillo'}
                        component={VerPlatillo}
                        options={{
                            headerShown: true,
                            title: ''
                        }} />
                    <Stack.Screen
                        name={'MenuDiario'}
                        component={MenuDiario}
                        options={{
                            headerShown: true,
                            title: ''
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
