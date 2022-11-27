import { Box, HStack, Button, VStack, Menu, MenuButton, Heading, Icon, Avatar, Text, IconButton, useColorMode, MenuList, MenuGroup, MenuItem, MenuDivider } from '@chakra-ui/react';
import { GrNotification } from "react-icons/gr";
import { MdBrightness2, MdBrightnessMedium, MdNotifications } from "react-icons/md";
import { ColorTheme, TextTheme } from '../../Constant/theme';

export default function Hearder() {
    const { colorMode, toggleColorMode } = useColorMode()
    function getMenuUser() {
        return (
            <MenuList color={TextTheme}>
                <MenuGroup title='Profile'>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        );
    }
    return (
        <Box height="4em" bg={ColorTheme} shadow="base">
            <HStack justifyContent="end" alignItems="center" h="100%" mx="2em" spacing={4}>
                <IconButton onClick={toggleColorMode} variant="ghost" aria-label='Search database' icon={colorMode == "light" ? <Icon as={MdBrightnessMedium} color={TextTheme} /> : <Icon as={MdBrightness2} color={TextTheme} />} />
                <Icon as={MdNotifications} color={TextTheme} fontSize="22px" />
                <Menu p="22px">
                    <MenuButton as="button" >
                        <HStack spacing={4}>
                            <Text fontWeight="bold" color={TextTheme} >hello</Text>
                            <Avatar size="sm" />
                        </HStack>
                    </MenuButton>
                    {getMenuUser()}
                </Menu>
            </HStack>
        </Box>
    );
};
