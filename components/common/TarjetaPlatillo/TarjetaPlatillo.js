import React from 'react'
import { Box, Image, Text } from 'native-base'

/** */
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

function TarjetaPlatillo(props) {
    const { imagenUrl, nombrePlatillo, categoria, verPlatilloPantalla,
        key } = props

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
                <Text fontSize={20} w={'100%'}>
                    {nombrePlatillo}
                </Text>
                <Text fontSize={12} w={'100%'} color={'muted.500'}>
                    {categoria}
                </Text>
            </Box>
        </Pressable>
    )
}

export default TarjetaPlatillo
