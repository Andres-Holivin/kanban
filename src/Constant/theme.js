import { extendTheme, useColorModeValue } from '@chakra-ui/react'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}
export const theme = extendTheme({ config });
export const Colors = {
    "dark": "#171923",
    "light": "#F9F7F7",
    "layout.light": "#F4F0F0",
    "layout.dark": "#1A202C"
}
export function LayoutTheme() {
    return useColorModeValue(Colors['layout.light'], Colors['layout.dark']);
}
export function ColorTheme() {
    return useColorModeValue(Colors['light'], Colors['dark']);
}
export function TextTheme(){
    return useColorModeValue("black", "white");
}

