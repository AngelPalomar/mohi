import React from 'react'
import { Box, Button, Image, Text, Icon } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons';

/** */
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

function TarjetaPlatillo(props) {
    const { imagenUrl, nombrePlatillo, categoria, verPlatilloPantalla,
        botonQuitar, quitarDelMenu, isLoading } = props

    return (
        <Pressable onPress={() => verPlatilloPantalla()}>
            <Box bgColor={'#FFF'} shadow={'2'} p={6} mb={2} borderRadius={12}>
                <Image
                    source={{ uri: imagenUrl }}
                    alt={'imagenPlatillo.jpg'}
                    size={'xl'}
                    borderRadius={16}
                    w={'100%'}
                    mb={4} />
                <Box>
                    <Box>
                        <Text fontSize={20} w={'100%'}>
                            {nombrePlatillo}
                        </Text>
                        <Text fontSize={12} w={'100%'} color={'muted.500'}>
                            {categoria}
                        </Text>
                    </Box>
                    {
                        botonQuitar && (
                            <Button
                                mt={4}
                                size={'sm'}
                                onPress={quitarDelMenu}
                                isLoading={isLoading}
                                isLoadingText={'Quitando...'}
                                leftIcon={
                                    <FontAwesome5 name="trash" size={16} color="white" />
                                }>
                                Eliminar
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </Pressable>
    )
}

export default TarjetaPlatillo
