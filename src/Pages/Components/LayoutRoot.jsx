import { Grid, GridItem, Box } from '@chakra-ui/react'
import { ColorTheme, LayoutTheme } from '../../Constant/theme';
import Hearder from './Header';
import SideBar from './Sidebar';
export default function LayoutRoot({ children }) {
    return (
        <Grid gridTemplateColumns={"auto 1fr"} bg={LayoutTheme}>
            <GridItem><SideBar /></GridItem>
            <GridItem>
                <Grid gridTemplateRows={"auto 1fr"} w="full" h="full">
                    <GridItem>
                        <Hearder />
                    </GridItem>
                    <GridItem minH="full" h="full">
                        <Box p="2em" h="100%">
                            <Box bg={ColorTheme} display="flex" alignItems="stretch" h="full" p="2rem" rounded="xl" shadow="md">
                                {children}
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    );
};