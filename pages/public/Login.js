import React from 'react'
import {
    Heading, Text, FormControl, Input, VStack, Box, Button, HStack
} from 'native-base'

export default function Login({ navigation }) {

    //Función para iniciar sesión
    const login = () => {
        navigation.navigate('Menu')
    }

    return (
        <Box safeArea flex={1} p={2} py={8} w='100%' px={5} bg='white'>
            <Heading color='black' size='lg'>
                Bienvenido a
                <Heading color='primary.500'> MOHI</Heading>
            </Heading>
            <Text fontSize='lg' color='coolGray.500'>Iniciar sesión para empezar</Text>
            <VStack mt={5} space={3}>
                <FormControl>
                    <FormControl.Label
                        _text={{
                            color: 'coolGray.600',
                            fontWeight: 500,
                        }}>
                        Correo electrónico o teléfono
                    </FormControl.Label>
                    <Input keyboardType='default' />
                </FormControl>
                <FormControl>
                    <FormControl.Label
                        _text={{
                            color: 'coolGray.600',
                            fontWeight: 500,
                        }}>
                        Contraseña
                    </FormControl.Label>
                    <Input keyboardType='default' secureTextEntry />
                </FormControl>
                <Button
                    mt="2"
                    _text={{ color: 'white' }}
                    onPress={login}>
                    Ingresar
                </Button>
                <HStack mt="6" justifyContent="center">
                    <Text fontSize="sm" color="muted.700" fontWeight={400}>
                        ¿No tienes una cuenta?{' '}
                    </Text>
                    <Text
                        color='primary.500'
                        onPress={() => navigation.navigate('Register')} >
                        Regístrate
                    </Text>
                </HStack>
            </VStack>
        </Box >
    )
}

