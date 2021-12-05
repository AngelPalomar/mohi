import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { Box, ScrollView, Spinner, Text, Image } from 'native-base'
import firebase from '../../data/firebase'

/**Utils */
import wait from '../../utils/wait'

/**Components */
import TarjetaPlatillo from '../../components/common/TarjetaPlatillo/TarjetaPlatillo'

/**Images */
import banner from '../../assets/decorative/categoria_banner.jpg'

export default function Categoria(props) {

    const { categoria } = props.route.params;

    const [platillos, setPlatillos] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [reload, setReload] = useState(false)

    const onRefresh = useCallback(
        () => {
            //Inicia la carga
            setRefreshing(true)

            //Recarga los datos
            setReload(true)

            //Para la carga
            wait(1000).then(() => setRefreshing(false))
        },
        [],
    );

    useEffect(() => {
        setReload(false)

        firebase.db
            .collection('platillos')
            .orderBy('fecha', 'desc')
            .get()
            .then(snapshot => {
                let p = [];

                snapshot.docs.forEach(Element => {
                    p.push(Element.data())
                })

                setPlatillos(p)
                setIsLoading(false)
            })
        return () => {
            setPlatillos([])
        }
    }, [reload])

    if (isLoading) {
        return <Spinner size={'lg'} m={5} />
    }

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Image
                source={banner}
                alt={'banner.jpg'}
                h={'60px'}
                borderBottomRadius={16} />
            <Box p={2}>
                <Text
                    fontSize={26}
                    color={'primary.500'}
                    fontWeight={'bold'}
                    textAlign={'center'}
                    mb={5}>
                    {categoria}
                </Text>
                <Box my={3}>
                    {
                        platillos.map((value, index) => {
                            if (value.categoria === categoria) {
                                return (
                                    <Box key={index}>
                                        <TarjetaPlatillo
                                            imagenUrl={value.fotoUrl}
                                            nombrePlatillo={value.nombre}
                                            categoria={value.categoria}
                                            botonQuitar={false}
                                            verPlatilloPantalla={
                                                () => props.navigation.navigate('VerPlatillo', {
                                                    nombrePlatillo: value.nombre
                                                })}
                                        />
                                    </Box>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </Box>
            </Box>
        </ScrollView>
    )
}
