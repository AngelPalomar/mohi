import React, { useState, useEffect } from 'react'
import {
    Box, Text, Heading, FormControl, VStack, Input,
    Slider, Select, Spinner, Checkbox, ScrollView, Button,
    useToast
} from 'native-base'
import firebase from '../../data/firebase'

/**Clases */
import Usuario from '../../classes/Usuario';

/**Utils */
/* import { minLenghtValidation } from '../../utils/Validations'; */

export default function EditProfile(props) {
    const [usuario, setUsuario] = useState(new Usuario())
    const [userDocId, setUserDocId] = useState('')
    const [enfermedades, setEnfermedades] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const toast = useToast();

    useEffect(() => {
        firebase.db.collection('usuarios')
            .where('idUsuario', '==', firebase.auth.currentUser.uid)
            .get().then((querySnapshot) => {
                setUsuario(querySnapshot.docs[0].data())
                setUserDocId(querySnapshot.docs[0].id)

                //Obtiene las enfermedades
                firebase.db.collection('enfermedades')
                    .orderBy('nombre')
                    .get().then((querySnapshot) => {
                        let e = [];
                        querySnapshot.forEach(doc => {
                            e.push(doc.data())
                        })
                        setEnfermedades(e)

                        //Obtiene las alergias (Ingredientes)
                        firebase.db.collection('ingredientes')
                            .orderBy('nombre')
                            .get().then((querySnapshot) => {
                                let i = [];
                                querySnapshot.forEach(doc => {
                                    i.push(doc.data())
                                })
                                setIngredientes(i)

                                //Para la carga
                                setisLoading(false)
                            })
                    })
            })
        return () => {
            setEnfermedades([])
        }
    }, [])

    //Función para editar perfil
    const editarPerfil = () => {
        //Validaciones

        //Inicia la carga
        setIsUpdating(true)

        //guarda la información
        firebase.auth.currentUser.updateProfile({
            displayName: `${usuario.nombres} ${usuario.apellidos}`
        }).then(() => {
            firebase.db.collection('usuarios')
                .doc(userDocId)
                .set(usuario)
                .then(() => {
                    toast.show({
                        description: `Perfil actualizado`
                    })
                    props.navigation.goBack();
                })
        }).catch((err) => {
            toast.show({
                description: `Error al editar el usuario, intente de nuevo`
            })
            setIsUpdating(false)
        })
    }

    if (isLoading) {
        return <Spinner size='lg' m={5} />
    }

    return (
        <ScrollView>
            <Box mx='auto' w='90%' py={5}>
                <Heading textAlign='center'>Editar perfil</Heading>
                <VStack space={3} my={5}>
                    <Heading color='primary.500' size='md'>Datos personales</Heading>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Nombres
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            value={usuario.nombres}
                            onChangeText={(value) => setUsuario({ ...usuario, nombres: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Apellidos
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            value={usuario.apellidos}
                            onChangeText={(value) => setUsuario({ ...usuario, apellidos: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            {`Edad - ${usuario.edad}`}
                        </FormControl.Label>
                        <Slider
                            value={usuario.edad}
                            minValue={1}
                            maxValue={100}
                            colorScheme="primary"
                            onChange={(value) => setUsuario({ ...usuario, edad: value })}>
                            <Slider.Track>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Sexo
                        </FormControl.Label>
                        <Select
                            accessibilityLabel='Selecciona tu sexo'
                            placeholder='Selecciona tu sexo'
                            defaultValue={usuario.sexo}
                            onValueChange={(value) => setUsuario({ ...usuario, sexo: value })}
                            p={2}>
                            <Select.Item _text={{ fontSize: 18 }} label='Masculino' value='masculino' />
                            <Select.Item _text={{ fontSize: 18 }} label='Femenino' value='femenino' />
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Dirección
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            value={usuario.direccion}
                            onChangeText={(value) => setUsuario({ ...usuario, direccion: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Estado
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            value={usuario.estado}
                            onChangeText={(value) => setUsuario({ ...usuario, estado: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            País
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            value={usuario.pais}
                            onChangeText={(value) => setUsuario({ ...usuario, pais: value })} />
                    </FormControl>
                    <Heading color='primary.500' size='md'>Datos médicos</Heading>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Peso (kg)
                        </FormControl.Label>
                        <Input
                            keyboardType='number-pad'
                            fontSize={18}
                            value={usuario.peso}
                            onChangeText={(value) => setUsuario({ ...usuario, peso: value })} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ fontSize: 18 }}>
                            Estatura (m)
                        </FormControl.Label>
                        <Input
                            keyboardType='numeric'
                            fontSize={18}
                            value={usuario.estatura}
                            onChangeText={(value) => setUsuario({ ...usuario, estatura: value })} />
                    </FormControl>
                </VStack>

                <Box>
                    <Heading color='primary.500' size='md'>Enfermedades</Heading>
                    <Text>
                        Selecciona las enfermedades que tengas para agregarlas a tu hoja médica y
                        recomendarte platillos.
                    </Text>
                    <VStack mt={5}>
                        <Checkbox.Group
                            onChange={(value) => setUsuario({ ...usuario, enfermedades: value })}
                            value={usuario.enfermedades}
                            accessibilityLabel='Selecciona enfermedades'>
                            {
                                enfermedades.map((value, index) => {
                                    if (value.activo) {
                                        return <Checkbox
                                            value={value.nombre}
                                            key={index}
                                            mb={2}
                                            _text={{ fontSize: 18 }}>
                                            {value.nombre}
                                        </Checkbox>
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </Checkbox.Group>
                    </VStack>
                </Box>
                <Box>
                    <Heading color='primary.500' size='md'>Alergias</Heading>
                    <Text>
                        Selecciona los ingredientes disponibles a los que tengas alergia
                        para agregarlas a tu hoja médica y recomendarte platillos.
                    </Text>
                    <VStack mt={5}>
                        <Checkbox.Group
                            onChange={(value) => setUsuario({ ...usuario, alergias: value })}
                            value={usuario.alergias}
                            accessibilityLabel='Selecciona enfermedades'>
                            {
                                ingredientes.map((value, index) => {
                                    if (value.activo) {
                                        return <Checkbox
                                            value={value.nombre}
                                            key={index}
                                            mb={2}
                                            _text={{ fontSize: 18 }}>
                                            {value.nombre}
                                        </Checkbox>
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </Checkbox.Group>
                    </VStack>
                </Box>
                <Button
                    my={5}
                    isLoading={isUpdating}
                    isLoadingText='Guardando'
                    onPress={editarPerfil}>
                    Guardar
                </Button>
            </Box>
        </ScrollView>
    )
}
