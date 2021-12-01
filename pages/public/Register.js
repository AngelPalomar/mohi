import React, { useState } from 'react'
import { Alert } from 'react-native'
import {
    Heading, FormControl, Input, VStack, Box, Button, ScrollView,
    Slider, Select, Image
} from 'native-base'
import firebase from '../../data/firebase'

/**Classes */
import Usuario from '../../classes/Usuario';

/**Utils */
import { DateFormat } from '../../utils/DateFormat';
import { emailValidation, minLenghtValidation } from '../../utils/Validations';

/**Images */
import banner from '../../assets/decorative/register_banner.jpg'

export default function Register({ navigation }) {
    const [usuario, setUsuario] = useState(new Usuario(
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        1,
        '',
        0,
        0,
        [],
        [],
        'cliente',
        true,
        DateFormat(new Date().toString()),
        ''
    ))
    const [confirmarPassword, setConfirmarPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    //Función para registrar usuario
    const signup = () => {
        //Valida
        if (!minLenghtValidation(usuario.nombres, 2)) {
            Alert.alert(
                "Error",
                "Un nombre es requerido.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!minLenghtValidation(usuario.apellidos, 2)) {
            Alert.alert(
                "Error",
                "Un apellido es requerido.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!minLenghtValidation(usuario.sexo, 2)) {
            Alert.alert(
                "Error",
                "Seleccione un sexo.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!emailValidation(usuario.email)) {
            Alert.alert(
                "Error",
                "Ingrese un correo válido.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!minLenghtValidation(usuario.telefono, 10)) {
            Alert.alert(
                "Error",
                "El teléfono debe tener 10 dígitos.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!minLenghtValidation(usuario.password, 8)) {
            Alert.alert(
                "Error",
                "La contraseña debe tener al menos 8 dígitos.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        if (usuario.password !== confirmarPassword) {
            Alert.alert(
                "Error",
                "Las contraseñas deben ser iguales.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        //Inicia la carga
        setIsLoading(true)

        //Guarda para modificar
        const u = usuario

        //Crea la cuenta en la autenticación
        firebase.auth.createUserWithEmailAndPassword(
            u.email,
            u.password
        ).then(userCredential => {
            let user = userCredential.user
            //Enviamos correos de verificación
            user.sendEmailVerification();
            user.updateProfile({
                displayName: `${u.nombres} ${u.apellidos}`,
                photoURL: ''
            });
            u.idUsuario = user.uid;

            //Crea el documento
            firebase.db.collection('usuarios').add(u).then(() => {
                navigation.navigate('Menu')
            });
        }).catch((err) => {
            Alert.alert(
                "Error al crear la cuenta.",
                `Error: ${err.toString()}`,
                [
                    { text: "Ok", onPress: () => { }, style: 'cancel' }
                ],
                { cancelable: false }
            );

            //Para la carga
            setIsLoading(false)
        });
    }

    return (
        <ScrollView>
            <Box safeArea flex={1} w='100%' px={5} pb={5} mx='auto' _text={{ fontWeight: 22 }}>
                <Heading color='black' size='lg'>
                    Crear
                    <Heading color='primary.500'> Cuenta</Heading>
                </Heading>
                <VStack mt={5} space={3}>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Nombres
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            onChangeText={(value) => setUsuario({ ...usuario, nombres: value })} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Apellidos
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            fontSize={18}
                            onChangeText={(value) => setUsuario({ ...usuario, apellidos: value })} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            {`Edad - ${usuario.edad}`}
                        </FormControl.Label>
                        <Slider
                            defaultValue={usuario.edad}
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
                            p={2}
                            onValueChange={(item) => setUsuario({ ...usuario, sexo: item })}>
                            <Select.Item _text={{ fontSize: 18 }} label='Masculino' value='masculino' />
                            <Select.Item _text={{ fontSize: 18 }} label='Femenino' value='femenino' />
                        </Select>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Correo electrónico
                        </FormControl.Label>
                        <Input
                            keyboardType='email-address'
                            fontSize={18}
                            onChangeText={(value) => setUsuario({ ...usuario, email: value.toLowerCase() })} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Teléfono
                        </FormControl.Label>
                        <Input
                            keyboardType='phone-pad'
                            fontSize={18}
                            onChangeText={(value) => setUsuario({ ...usuario, telefono: value })} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Contraseña
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            secureTextEntry
                            fontSize={18}
                            onChangeText={(value) => setUsuario({ ...usuario, password: value })} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                                fontSize: 18
                            }}>
                            Confirmar contraseña
                        </FormControl.Label>
                        <Input
                            keyboardType='default'
                            secureTextEntry
                            fontSize={18}
                            onChangeText={(value) => setConfirmarPassword(value)} />
                    </FormControl>
                    <Button
                        mt={2}
                        _text={{ color: 'white', fontSize: 18 }}
                        onPress={signup}
                        isLoading={isLoading}
                        isLoadingText='Estamos creando tu cuenta'>
                        Crear cuenta
                    </Button>
                </VStack>
            </Box>
            <Image
                source={banner}
                alt={'banner.jpg'}
                h={180}
                borderTopRadius={16} />
        </ScrollView>
    )
}
