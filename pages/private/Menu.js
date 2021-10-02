import React from 'react'
import {
    createDrawerNavigator, DrawerContentScrollView, DrawerItemList
} from '@react-navigation/drawer';
import { Box, Heading, Text, Avatar } from 'native-base'

/**Icons */
import { FontAwesome } from '@expo/vector-icons'

/**Components */
import Home from './Home';
import Profile from './Profile';

const CustomDrawer = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <Box p={5}>
                <Avatar
                    mb={2}
                    source={{ uri: 'https://static.wikia.nocookie.net/avatar/images/f/fa/Aang_en_el_Drag%C3%B3n_del_Jazm%C3%ADn.png/revision/latest?cb=20150414231706&path-prefix=es' }}>
                    SS
                </Avatar>
                <Heading>Juan <Heading color='primary.500'>Pérez</Heading> </Heading>
                <Text color='coolGray.500' fontSize={12}>juan@hotmail.com</Text>
            </Box>
            <DrawerItemList {...props} />
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
                name='History'
                component={Profile}
                options={{
                    title: 'Historial de pedidos',
                    drawerLabel: 'Historial de pedidos',
                    drawerIcon: () => (
                        <FontAwesome name='history' size={23} color='#C42639' />
                    )
                }} />
            <Drawer.Screen
                name='PaymentMethod'
                component={Profile}
                options={{
                    title: 'Métodos de pago',
                    drawerLabel: 'Métodos de pago',
                    drawerIcon: () => (
                        <FontAwesome name='credit-card' size={23} color='#C42639' />
                    )
                }} />
        </Drawer.Navigator>
    )
}
