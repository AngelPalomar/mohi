import React, { useState, useEffect } from 'react'
import {
    Box, Text, Spinner, Image, Button, Icon,
    Center, ScrollView
} from 'native-base'
import firebase from '../../data/firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function VerPlatillo(props) {
    const { nombrePlatillo } = props.route.params;

    const [platillo, setPlatillo] = useState(null)
    const [usuario, setUsuario] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingAgregando, setIsLoadingAgregando] = useState(false)
    const [platilloAgregado, setPlatilloAgregado] = useState(false)

    const usuarioRef = firebase.db.collection('usuarios').where('idUsuario', '==', firebase.auth.currentUser.uid);
    const platilloRef = firebase.db.collection('platillos').where('nombre', '==', nombrePlatillo);
    const sep = 6;

    useEffect(() => {
        platilloRef
            .get()
            .then(snapshot => {
                let p = snapshot.docs[0].data()
                setPlatillo(p)

                //busca los datos del usuario
                usuarioRef.get()
                    .then(snapshot => {
                        setUsuario({
                            ...snapshot.docs[0].data(),
                            id: snapshot.docs[0].id
                        })

                        //Verifica que tenga este platillo en el menú
                        if (snapshot.docs[0].data().menuDiario.includes(p.nombre)) {
                            setPlatilloAgregado(true)
                        }
                        setIsLoading(false)
                    })
            })
        return () => {
            setPlatillo([])
        }
    }, [])

    const agregarPlatilloMenu = () => {
        setIsLoadingAgregando(true);
        firebase.db.collection('usuarios')
            .doc(usuario.id)
            .update({
                menuDiario: firebase.firestore.FieldValue.arrayUnion(platillo.nombre)
            }).then(() => {
                setIsLoadingAgregando(false);
                setPlatilloAgregado(true)
            })
    }

    const eliminarPlatilloMenu = () => {
        setIsLoadingAgregando(true);
        firebase.db.collection('usuarios')
            .doc(usuario.id)
            .update({
                menuDiario: firebase.firestore.FieldValue.arrayRemove(platillo.nombre)
            }).then(() => {
                setIsLoadingAgregando(false);
                setPlatilloAgregado(false)
            })
    }

    if (isLoading) {
        return <Spinner size={'lg'} m={5} />
    }

    return (
        <ScrollView>
            <Box p={4}>
                <Image
                    source={{ uri: platillo.fotoUrl }}
                    alt={`${platillo.nombre}.jpg`}
                    size={'xl'}
                    borderRadius={16}
                    w={'100%'}
                    mb={4} />
                <Box mb={sep}>
                    <Text fontSize={32}>{platillo.nombre}</Text>
                    <Text fontSize={12} color={'muted.600'}>{platillo.categoria}</Text>
                </Box>

                <Box mb={sep}>
                    <Button
                        onPress={!platilloAgregado ? agregarPlatilloMenu : eliminarPlatilloMenu}
                        isLoading={isLoadingAgregando}
                        w={'50%'}
                        size={'sm'}
                        leftIcon={
                            !platilloAgregado ?
                                <MaterialCommunityIcons name="food-drumstick-outline" size={20} color="white" /> :
                                <MaterialCommunityIcons name="food-drumstick-off-outline" size={20} color="white" />
                        }>
                        {
                            !platilloAgregado ? 'Añadir a mi menú' : 'Eliminar de mi menú'
                        }
                    </Button>
                </Box>

                <Box mb={sep}>
                    <Text fontSize={16} fontWeight={'bold'}>Descripción</Text>
                    <Text>{platillo.descripcion}</Text>
                </Box>
                <Box mb={sep}>
                    <Text fontSize={16} fontWeight={'bold'}>Ingredientes</Text>
                    {
                        platillo.ingredientes.map((value, index) => (
                            <Text key={index}><Text color={'primary.500'}>&raquo; </Text>{value}</Text>
                        ))
                    }
                </Box>
                <Box>
                    <Text fontSize={16} fontWeight={'bold'}>Receta</Text>
                    <Text>{platillo.receta}</Text>
                </Box>
            </Box>
        </ScrollView>
    )
}

export default VerPlatillo
