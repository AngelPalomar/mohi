import React from 'react'
import {
    Heading, FormControl, Input, VStack, Box, Button, ScrollView
} from 'native-base'

export default function Register() {
    return (
        <ScrollView>
            <Box safeArea flex={1} w='100%' px={5} mx='auto' bg='white'>
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
                            }}>
                            Correo electrónico
                        </FormControl.Label>
                        <Input keyboardType='email-address' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                            }}>
                            Teléfono
                        </FormControl.Label>
                        <Input keyboardType='phone-pad' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                            }}>
                            Contraseña
                        </FormControl.Label>
                        <Input keyboardType='default' secureTextEntry />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label
                            _text={{
                                color: 'coolGray.600',
                                fontWeight: 500,
                            }}>
                            Comfirmar contraseña
                        </FormControl.Label>
                        <Input keyboardType='default' secureTextEntry />
                    </FormControl>
                    <Button mt="2" _text={{ color: 'white' }}>
                        Crear cuenta
                    </Button>
                </VStack>
            </Box>
        </ScrollView>
    )
}
