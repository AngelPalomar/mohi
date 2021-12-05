import React from 'react'
import { Box, Button, Image, Text, Icon } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons';

/** */
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

function TarjetaPlatillo(props) {
    const { imagenUrl, nombrePlatillo, categoria, verPlatilloPantalla,
        key, botonQuitar, quitarDelMenu, isLoading } = props

    return (
        <Pressable onPress={() => verPlatilloPantalla()}>
            <Box bgColor={'#FFF'} shadow={'2'} p={6} mb={2} borderRadius={12} key={key}>
                <Image
                    source={{ uri: imagenUrl }}
                    alt={'imagenPlatillo.jpg'}
                    size={'xl'}
                    borderRadius={16}
                    w={'100%'}
                    mb={4} />
                <Box flexDirection={'row'} justifyContent={'space-between'}>
                    <Box width={'50%'}>
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
                                size={'sm'}
                                onPress={quitarDelMenu}
                                isLoading={isLoading}
                                isLoadingText={'Quitando...'}
                                leftIcon={
                                    <FontAwesome5 name="trash" size={16} color="white" />
                                }>
                                Quitar de mi menú
                            </Button>
                        )
                    }
                </Box>
            </Box>
        </Pressable>
    )
}

export default TarjetaPlatillo
