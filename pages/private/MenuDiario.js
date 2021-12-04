import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import {
    Box, Text, ScrollView, Spinner, Center,
    Image
} from 'native-base'
import firebase from '../../data/firebase'

/**Utils */
import wait from '../../utils/wait'

/**Components */
import TarjetaPlatillo from '../../components/common/TarjetaPlatillo/TarjetaPlatillo'

/**Images */
import banner from '../../assets/decorative/menudiario_banner.png'

const MenuDiario = (props) => {

    const [usuarioIdDoc, setUsuarioIdDoc] = useState('')
    const [menu, setMenu] = useState([])
    const [hayPlatillos, setHayPlatillos] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const usuarioRef = firebase.db.collection('usuarios').where('idUsuario', '==', firebase.auth.currentUser.uid);
    const platilloRef = firebase.db.collection('platillos');

    const [refreshing, setRefreshing] = useState(false)
    const [reload, setReload] = useState(false)

    const onRefresh = useCallback(
        () => {
            //Inicia la carga
            setRefreshing(true)

            //Recarga los datos
            setMenu([])
            setReload(true)

            //Para la carga
            wait(1000).then(() => setRefreshing(false))
        },
        [],
    );

    //efecto para traer el menú
    useEffect(() => {
        setReload(false)

        usuarioRef
            .get().then(snapshot => {
                //Traigo el ID
                setUsuarioIdDoc(snapshot.docs[0].id);
                let nombresPlatillos = snapshot.docs[0].data().menuDiario;

                if (nombresPlatillos.length > 0) {
                    setHayPlatillos(true)

                    let ps = [];

                    //Traigo la información de los platillos
                    nombresPlatillos.forEach(element => {
                        platilloRef.where('nombre', '==', element)
                            .get()
                            .then(snapshot => {
                                ps.push(snapshot.docs[0].data())
                            });

                        //Guardo los platillos
                        setMenu(ps);
                    });

                    //Para la carga
                    setIsLoading(false)
                } else {
                    setHayPlatillos(false)
                    //Para la carga
                    setIsLoading(false)
                }
            })

        return () => {
            setUsuarioIdDoc('')
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
                <Text>Aquí puedes ver una lista de tus platillos que has
                    agregado a tu menú diario.
                </Text>
                <Box my={4}>
                    {
                        !hayPlatillos && (
                            <Center mt={12}>
                                <Text fontSize={20} textAlign={'center'}>
                                    No has agregado ningún platillo a tu menú
                                </Text>
                            </Center>
                        )
                    }
                    {
                        menu.map((value, index) => (
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

export default MenuDiario
