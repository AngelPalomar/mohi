import React, { useState } from 'react'
import { Alert } from 'react-native'
import {
    Heading, Text, FormControl, Input, VStack, Box, Button, HStack,
    ScrollView, Image
} from 'native-base'
import firebase from '../../data/firebase'

/**Utils */
import { emailValidation, minLenghtValidation } from '../../utils/Validations'

/**Images */
import banner from '../../assets/decorative/login_banner.jpg'

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    //Función para iniciar sesión
    const login = () => {
        if (!emailValidation(email)) {
            Alert.alert(
                "Error",
                "Ingrese un correo electrónico válido",
                [
                    { text: "OK", onPress: () => setEmail('') }
                ],
                { cancelable: false }
            );
            return;
        }

        if (!minLenghtValidation(password, 1)) {
            Alert.alert(
                "Error",
                "Ingrese una contraseña.",
                [
                    { text: "OK", onPress: () => setPassword('') }
                ],
                { cancelable: false }
            );
            return;
        }

        //Inicia la carga
        setIsLoading(true)

        //Inicia sesión
        firebase.auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigation.navigate('Menu');
            }).catch((err) => {
                Alert.alert(
                    "Error al iniciar sesión",
                    err.toString(),
                    [
                        { text: "OK", onPress: () => { } }
                    ],
                    { cancelable: false }
                );

                //Para la carga
                setIsLoading(false)
            })
    }

    return (
        <ScrollView>
            <Image
                source={banner}
                alt={'banner.jpg'}
                h={180}
                borderBottomRadius={16} />
            <Box safeArea flex={1} p={2} px={5} w='100%'>
                <Heading color='black' size='lg'>
                    Bienvenido a
                    <Heading color='primary.500'> MOHI</Heading>
                </Heading>
                <Text fontSize='lg' color='coolGray.500'>Comida sana, comida para tí</Text>
                <Text fontSize='sm' color='coolGray.500'>Inicie sesión para continuar</Text>
                <VStack mt={5} space={3}>
                    <FormControl>
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
                            onChangeText={(value) => setEmail(value.trim())} />
                    </FormControl>
                    <FormControl>
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
                            onChangeText={(value) => setPassword(value)} />
                    </FormControl>
                    <Button
                        mt={2}
                        _text={{ color: 'white', fontSize: 18 }}
                        onPress={login}
                        isLoading={isLoading}
                        isLoadingText='Iniciando sesión'>
                        Ingresar
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="muted.700" fontWeight={400} fontSize={18}>
                            ¿No tienes una cuenta?{' '}
                        </Text>
                        <Text
                            color='primary.500'
                            fontSize={18}
                            onPress={() => navigation.navigate('Register')} >
                            Regístrate
                        </Text>
                    </HStack>
                </VStack>
            </Box>
        </ScrollView>
    )
}

