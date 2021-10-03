import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, Center, Heading, VStack, Spinner } from 'native-base'
import firebase from '../../data/firebase'

/**Classes */
import Usuario from '../../classes/Usuario'

export default function Profile(props) {
    const [usuario, setUsuario] = useState(new Usuario())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        firebase.db
            .collection('usuarios')
            .where('idUsuario', '==', firebase.auth.currentUser.uid)
            .onSnapshot((doc) => {
                setUsuario(doc.docs[0].data())
                setIsLoading(false)
            })
        return () => {
            setUsuario({})
        }
    }, [])

    if (isLoading) {
        return <Spinner size='lg' my={5} />
    }

    return (
        <Box safeArea mx='auto' w='90%' h='100%'>
            <Center>
                <Avatar
                    source={{ uri: firebase.auth.currentUser.photoURL }}
                    size='xl'
                    mb={4}>
                    IM
                </Avatar>
                <Heading>{firebase.auth.currentUser.displayName}</Heading>
                <Text color='coolGray.500'>{firebase.auth.currentUser.email}</Text>
            </Center>
            <VStack space={3} my={5}>
                <Heading size='md' color='primary.300'>Información personal</Heading>
                <Text fontSize={14}>Teléfono: {usuario.telefono}</Text>
                <Text fontSize={14}>Edad: {usuario.edad} años</Text>
            </VStack>
        </Box>
    )
}
