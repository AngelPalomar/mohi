import React from 'react'
import { Text, Box, Image, Center } from 'native-base'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

function CategoriaContenedor(props) {
    const { imagenUrl, nombre, verCategoria } = props

    return (
        <Pressable onPress={() => verCategoria.navigate('Categoria', {
            categoria: nombre
        })}>
            <Box m={2}>
                <Center>
                    <Image
                        size={'sm'}
                        source={{ uri: imagenUrl }}
                        alt={nombre}
                        borderRadius={100}
                        mb={2} />
                    <Text w={60} textAlign={'center'}>{nombre}</Text>
                </Center>
            </Box>
        </Pressable>
    )
}

export default CategoriaContenedor
