import React, { useState, useEffect, useCallback } from 'react'
import { RefreshControl } from 'react-native'
import {
    Box, Text, ScrollView, Spinner, Center,
    Image, Button, Icon, useToast, Toast
} from 'native-base'
import firebase from '../../data/firebase'
import { AntDesign } from '@expo/vector-icons';

/**Utils */
import wait from '../../utils/wait'

/**Components */
import TarjetaPlatillo from '../../components/common/TarjetaPlatillo/TarjetaPlatillo'

/**Images */
import banner from '../../assets/decorative/menudiario_banner.png'

const MenuDiario = (props) => {

    const [noDia, setNoDia] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const [menuLunes, setmenuLunes] = useState([])
    const [menuMartes, setmenuMartes] = useState([])
    const [menuMiercoles, setmenuMiercoles] = useState([])
    const [menuJueves, setmenuJueves] = useState([])
    const [menuViernes, setmenuViernes] = useState([])
    const [menuSabado, setmenuSabado] = useState([])
    const [menuDomingo, setmenuDomingo] = useState([])

    const [isDeleting, setIsDeleting] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [reload, setReload] = useState(false)
    const toast = useToast();

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

    //efecto para traer el menú
    useEffect(() => {
        setReload(false)

        //busca los menús
        firebase.db.collection('menus')
            .where('idDocUsuario', '==', firebase.auth.currentUser.uid)
            .get()
            .then(snapshot => {
                let m = [];
                let lun = [];
                let mar = [];
                let mie = [];
                let jue = [];
                let vie = [];
                let sab = [];
                let dom = [];

                snapshot.docs.forEach(element => {
                    m.push({ ...element.data(), id: element.id })
                })

                m.forEach(element => {
                    switch (element.dia) {
                        case 'lunes':
                            lun.push(element)
                            break;
                        case 'martes':
                            mar.push(element)
                            break;
                        case 'miercoles':
                            mie.push(element)
                            break;
                        case 'jueves':
                            jue.push(element)
                            break;
                        case 'viernes':
                            vie.push(element)
                            break;
                        case 'sabado':
                            sab.push(element)
                            break;
                        case 'domingo':
                            dom.push(element)
                            break;

                        default:
                            break;
                    }
                })

                setmenuLunes(lun)
                setmenuMartes(mar)
                setmenuMiercoles(mie)
                setmenuJueves(jue)
                setmenuViernes(vie)
                setmenuSabado(sab)
                setmenuDomingo(dom)

                //Para la carga 
                setIsLoading(false)
            })

        return () => {
            setmenuLunes([])
            setmenuMartes([])
            setmenuMiercoles([])
            setmenuJueves([])
            setmenuViernes([])
            setmenuSabado([])
            setmenuDomingo([])
        }
    }, [reload])

    const eliminarPlatilloMenu = (idDoc) => {
        setIsDeleting(true)
        firebase.db.collection('menus').doc(idDoc)
            .delete()
            .then(() => {
                toast.show({
                    description: 'Platillo eliminado.'
                })
                setIsDeleting(false)
                setReload(true)
            })
            .catch(() => {
                toast.show({
                    description: 'No se pudo eliminar el platillo.'
                })
                setIsDeleting(false)
            })
    }

    const MenuSeleccionado = ({ menuDia }) => {
        if (menuDia.length > 0) {
            return (
                <Box my={4}>
                    {
                        menuDia.map((value, index) => (
                            <TarjetaPlatillo
                                key={index}
                                imagenUrl={value.fotoUrlPlatillo}
                                nombrePlatillo={value.nombrePlatillo}
                                categoria={value.categoriaProducto}
                                botonQuitar={true}
                                quitarDelMenu={() => eliminarPlatilloMenu(value.id)}
                                isLoading={isDeleting}
                                verPlatilloPantalla={
                                    () => props.navigation.navigate('VerPlatillo', {
                                        nombrePlatillo: value.nombre
                                    })}
                            />
                        ))
                    }
                </Box>
            )
        } else {
            return <Text textAlign={'center'} mt={10} fontSize={20}>No hay platillos para este día</Text>
        }
    }

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
                <Text textAlign={'center'}>Aquí puedes ver una lista de tus platillos que has
                    agregado a tu menú semanal.
                </Text>
                <Box my={4}>
                    <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Button
                            onPress={() => setNoDia(noDia - 1)}
                            disabled={noDia % 7 === 0 ? true : false}
                            leftIcon={
                                <Icon as={<AntDesign name="caretleft" color="white" />} size={18} />
                            }></Button>
                        <Text fontSize={22}>{
                            noDia % 7 === 0 ? 'Lunes' :
                                noDia % 7 === 1 ? 'Martes' :
                                    noDia % 7 === 2 ? 'Miércoles' :
                                        noDia % 7 === 3 ? 'Jueves' :
                                            noDia % 7 === 4 ? 'Viernes' :
                                                noDia % 7 === 5 ? 'Sábado' :
                                                    noDia % 7 === 6 ? 'Domingo' : ''
                        }</Text>
                        <Button
                            onPress={() => setNoDia(noDia + 1)}
                            disabled={noDia % 7 === 6 ? true : false}
                            rightIcon={
                                <Icon as={<AntDesign name="caretright" color="white" />} size={18} />
                            }></Button>
                    </Box>
                    <MenuSeleccionado menuDia={
                        noDia % 7 === 0 ? menuLunes :
                            noDia % 7 === 1 ? menuMartes :
                                noDia % 7 === 2 ? menuMiercoles :
                                    noDia % 7 === 3 ? menuJueves :
                                        noDia % 7 === 4 ? menuViernes :
                                            noDia % 7 === 5 ? menuSabado :
                                                noDia % 7 === 6 ? menuDomingo : menuLunes} />
                </Box>
            </Box>
        </ScrollView>
    )
}

export default MenuDiario
