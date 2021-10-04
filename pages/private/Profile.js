import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, Center, Heading, VStack, Spinner, Button, ScrollView } from 'native-base'
import firebase from '../../data/firebase'

/**Classes */
import Usuario from '../../classes/Usuario'

export default function Profile(props) {
    const [usuario, setUsuario] = useState(new Usuario())
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        firebase.db
            .collection('usuarios')
            .where('idUsuario', '==', firebase.auth.currentUser.uid)
            .onSnapshot((doc) => {
                setUsuario(doc.docs[0].data())
                setIsLoading(false)
            })
        return () => {
            setUsuario(new Usuario())
        }
    }, [reload])

    if (isLoading) {
        return <Spinner size='lg' my={5} />
    }

    return (
        <ScrollView>
            <Box safeArea mx='auto' w='90%' h='100%'>
                <Center>
                    <Avatar
                        source={{ uri: firebase.auth.currentUser.photoURL }}
                        size='xl'
                        mb={4}>
                        IM
                    </Avatar>
                    <Heading>{firebase.auth.currentUser.displayName}</Heading>
                    <Text color='coolGray.500' mb={4}>{firebase.auth.currentUser.email}</Text>
                    <Button
                        onPress={() => props.navigation.navigate('EditProfile')}>
                        Editar perfil
                    </Button>
                </Center>
                <VStack space={3} my={5}>
                    <Heading size='md' color='primary.300'>Información personal</Heading>
                    <Text fontSize={14}><Text fontWeight='bold'>Teléfono: </Text>{usuario.telefono}</Text>
                    <Text fontSize={14}><Text fontWeight='bold'>Edad: </Text>{usuario.edad} años</Text>
                </VStack>
                <VStack space={3} my={5}>
                    <Heading size='md' color='primary.300'>Información médica</Heading>
                    <Text fontWeight='bold'>Enfermedades</Text>
                    {
                        usuario.enfermedades.length === 0 ?
                            <Text>
                                No hay enfermedades registradas, edite su perfil
                                para agregarlas.
                            </Text> :
                            usuario.enfermedades.map((value, index) => (
                                <Text key={index}>- {value}</Text>
                            ))
                    }
                    <Text fontWeight='bold'>Alergias</Text>
                    {
                        usuario.alergias.length === 0 ?
                            <Text>
                                No hay alergias registradas, edite su perfil
                                para agregarlas.
                            </Text> :
                            usuario.alergias.map((value, index) => (
                                <Text key={index}>- {value}</Text>
                            ))
                    }
                </VStack>
            </Box>
        </ScrollView >
    )
}
