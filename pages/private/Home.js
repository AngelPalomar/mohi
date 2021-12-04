import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import { Box, ScrollView, Spinner, Text } from 'native-base'
import firebase from '../../data/firebase'

/**Utils */
import wait from '../../utils/wait'

/**Components */
import BarraCategoria from '../../components/common/BarraCategoria/BarraCategoria'
import TarjetaPlatillo from '../../components/common/TarjetaPlatillo/TarjetaPlatillo'

export default function Home(props) {

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
            <Box p={2}>
                <BarraCategoria />
                <Box my={3}>
                    {
                        platillos.map((value, index) => (
                            <TarjetaPlatillo
                                key={index}
                                imagenUrl={value.fotoUrl}
                                nombrePlatillo={value.nombre}
                                categoria={value.categoria}
                                verPlatilloPantalla={
                                    () => props.navigation.navigate('VerPlatillo', {
                                        nombrePlatillo: value.nombre
                                    })}
                            />
                        ))
                    }
                </Box>
            </Box>
        </ScrollView>
    )
}
