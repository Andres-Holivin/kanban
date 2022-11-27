import { Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, fetchData, increment } from "../../Redux/Slice/couterSlice";
import store from "../../Redux/Store";
import KanbanContainer from "../Components/KanbanContainer";
import LayoutRoot from "../Components/LayoutRoot";

export default function Home() {
    const count = useSelector((state) => {
        console.log(state)
        return state.counter.value
    })
    const dispatch = useDispatch()

    dispatch(fetchData())
    return (
        <LayoutRoot>
            <Button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </Button>
            <Text>{count}</Text>
            <Button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </Button>
            <Box display="flex" bg="red" h="100%" w="10px">
                <KanbanContainer data={tempData} />
            </Box>
        </LayoutRoot>
    );
};
export const tempData = [{
    "id": 212,
    "items": [
        {
            "id": 321,
            "title": "hello world",
            "contribute": [
                "andres",
                "holivin"
            ]
        },


    ]
}]
