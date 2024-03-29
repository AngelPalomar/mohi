import React, { useEffect } from 'react'
import { Alert, BackHandler } from 'react-native'
import {
    createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList
} from '@react-navigation/drawer';
import {
    Box, Heading, Text, Avatar, Button,
    Image
} from 'native-base'
import firebase from '../../data/firebase'

/**Icons */
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

/**Components */
import Home from './Home';
import Profile from './Profile';
import MenuDiario from './MenuDiario';

/**Images */
import banner from '../../assets/decorative/menu_banner.jpg'
import { color } from 'styled-system';

const CustomDrawer = (props) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            cerrarSesion
        );

        return () => backHandler.remove();
    }, [])

    const cerrarSesion = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de salir?',
            [{
                text: 'Salir',
                onPress: () => {
                    firebase.auth.signOut().then(() => {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                        props.navigation.navigate('Login')
                    })
                }
            },
            {
                text: 'Cancelar',
                style: 'cancel'
            }],
            { cancelable: true }
        )
        return true;
    }


    return (
        <DrawerContentScrollView {...props}>
            <Image
                source={banner}
                alt={'banner.jpg'}
                h={100}
                borderBottomRadius={16} />
            <Box p={5}>
                <Avatar
                    mb={2}
                    source={{ uri: firebase.auth.currentUser.photoURL }}>
                    SS
                </Avatar>
                <Heading>{firebase.auth.currentUser.displayName}</Heading>
                <Text color='coolGray.500' fontSize={12}>{firebase.auth.currentUser.email}</Text>
            </Box>
            <DrawerItemList {...props} />
            <DrawerItem
                label='Cerrar sesión'
                activeTintColor='#C42639'
                labelStyle={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}
                icon={() => <FontAwesome name="power-off" size={23} color="#C42639" />}
                onPress={cerrarSesion}
            />
        </DrawerContentScrollView>
    )
}


export default function Menu() {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerType='front'
            screenOptions={{
                drawerActiveTintColor: '#C42639',
                drawerLabelStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            }}>
            <Drawer.Screen
                name='Home'
                component={Home}
                options={{
                    title: 'Inicio',
                    drawerLabel: 'Inicio',
                    drawerIcon: () => (
                        <FontAwesome name='home' size={23} color='#C42639' />
                    )
                }} />
            <Drawer.Screen
                name='Profile'
                component={Profile}
                options={{
                    title: 'Mi perfil',
                    drawerLabel: 'Perfil',
                    drawerIcon: () => (
                        <FontAwesome name='user' size={23} color='#C42639' />
                    )
                }} />
            <Drawer.Screen
                name='MenuDiario'
                component={MenuDiario}
                options={{
                    title: 'Mi menú semanal',
                    drawerLabel: 'Mi menú',
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="food-apple" size={25} color="#C42639" />
                    )
                }} />
        </Drawer.Navigator>
    )
}
