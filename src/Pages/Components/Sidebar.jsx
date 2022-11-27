import { Box, HStack, Button, VStack, Heading ,Icon} from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { BsFillKanbanFill } from "react-icons/bs";
import { redirect } from 'react-router-dom';
import { ColorTheme, TextTheme } from '../../Constant/theme';

export default function SideBar() {
    return (
        <Box minH="100vh" h="100%" w="14em" bg={ColorTheme} shadow="base">
            <Box  minH="4em" display="flex" justifyContent="center">
                <HStack justifyContent="center">
                    <Icon as={BsFillKanbanFill} color={TextTheme}/>
                    <Heading size="lg" color={TextTheme}>
                        Listing
                    </Heading>
                </HStack>
            </Box>
            <Box height="1em"></Box>
            <VStack m="12px">
                <Button onClick={()=> redirect("/kanban/home")} leftIcon={<AiOutlineHome />}  variant="ghost" w="100%">Home</Button>
                <Button onClick={()=> redirect("/kanban/team")}  leftIcon={<AiOutlineTeam />}  variant="ghost" w="100%">Team</Button>
            </VStack>

        </Box>
    )
};
