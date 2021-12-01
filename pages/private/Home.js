import React from 'react'
import { Box, ScrollView } from 'native-base'

/**Components */
import BarraCategoria from '../../components/common/BarraCategoria/BarraCategoria'

export default function Home() {
    return (
        <ScrollView>
            <Box p={2}>
                <BarraCategoria />
            </Box>
        </ScrollView>
    )
}
