import React, { useState, useEffect } from 'react'
import firebase from '../../../data/firebase'
import { Box, Center, HStack, Spinner, Text } from 'native-base'

/**Components */
import CategoriaContenedor from '../CategoriaContenedor/CategoriaContenedor'

function BarraCategoria() {

    const [categorias, setCategorias] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        firebase.db
            .collection('categorias')
            .orderBy('nombre')
            .get()
            .then((snapshot) => {
                let c = [];
                snapshot.forEach(element => {
                    c.push(element.data());
                })

                setCategorias(c)
                setIsLoading(false)
            })
    }, [categorias])

    if (isLoading) {
        return <Spinner size='lg' m={5} />
    }

    return (
        <Box
            w={'100%'}
            p={2}
            backgroundColor={'#FFFFFF'}
            shadow={'2'}>
            <Text mb={2} fontWeight={'bold'}>¿Por dónde empezar?</Text>
            <Center>
                <HStack>
                    {
                        categorias.map((value, index) => (
                            <CategoriaContenedor
                                nombre={value.nombre}
                                imagenUrl={value.imagen}
                            />
                        ))
                    }
                </HStack>
            </Center>
        </Box>
    )
}

export default BarraCategoria
