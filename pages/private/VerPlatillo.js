import React, { useState, useEffect } from 'react'
import {
    Box, Text, Spinner, Image, Button, Icon,
    Center, ScrollView, FormControl, Select,
    useToast
} from 'native-base'
import firebase from '../../data/firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function VerPlatillo(props) {
    const { nombrePlatillo } = props.route.params;

    const [platillo, setPlatillo] = useState(null)
    const [usuario, setUsuario] = useState({})
    const dias = [
        "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"
    ]
    const [diaSeleccionado, setDiaSeleccionado] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingAgregando, setIsLoadingAgregando] = useState(false)

    const usuarioRef = firebase.db.collection('usuarios').where('idUsuario', '==', firebase.auth.currentUser.uid);
    const platilloRef = firebase.db.collection('platillos').where('nombre', '==', nombrePlatillo);
    const toast = useToast();
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

                        setIsLoading(false)
                    })
            })
            .catch(() => {
                toast.show({
                    description: 'Platillo no encontrado'
                })
                props.navigation.goBack()
            })
        return () => {
            setPlatillo([])
        }
    }, [])

    const agregarPlatilloMenu = () => {
        if (diaSeleccionado.trim().length === 0) {
            toast.show({
                description: 'Seleccione un día de la semana.'
            })
            return;
        }

        setIsLoadingAgregando(true)

        firebase.db.collection('menus')
            .add({
                dia: diaSeleccionado,
                nombrePlatillo: platillo.nombre,
                categoriaProducto: platillo.categoria,
                fotoUrlPlatillo: platillo.fotoUrl,
                idDocUsuario: firebase.auth.currentUser.uid,
            }).then(() => {
                toast.show({
                    description: `Se agregó ${platillo.nombre} al día ${diaSeleccionado}`
                })
                setIsLoadingAgregando(false);
            })
            .catch(() => {
                toast.show({
                    description: `Error al agregar el platillo.`
                })
                setIsLoadingAgregando(false);
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

                <Box mb={sep} flex={12}>
                    <Text fontSize={16} fontWeight={'bold'}>Agregar a mi menú semanal</Text>
                    <Select
                        mb={2}
                        accessibilityLabel='Selecciona un día de la semana'
                        placeholder='Selecciona un día de la semana'
                        onValueChange={(item) => setDiaSeleccionado(item)}>
                        {
                            dias.map((value, index) => (
                                <Select.Item
                                    key={index}
                                    _text={{ fontSize: 18 }}
                                    label={value.toUpperCase()}
                                    value={value} />
                            ))
                        }
                    </Select>
                    <Button
                        onPress={agregarPlatilloMenu}
                        isLoading={isLoadingAgregando}
                        isLoadingText={`Agregando platillo al ${diaSeleccionado}`}
                        flex={6}
                        size={'sm'}
                        leftIcon={<MaterialCommunityIcons name="food-drumstick-outline" size={20} color="white" />}>
                        Añadir a mi menú
                    </Button>
                </Box>

                <Box mb={sep}>
                    <Text fontSize={16} fontWeight={'bold'}>Descripción</Text>
                    <Text>{platillo.descripcion}</Text>
                </Box>
                <Box mb={sep}>
                    <Text fontSize={16} fontWeight={'bold'}>Este platillo es especial para:</Text>
                    <Text>{platillo.especial}</Text>
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
