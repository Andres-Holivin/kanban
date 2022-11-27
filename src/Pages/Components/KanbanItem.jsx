import { Avatar, AvatarGroup, Box, Button, Heading } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, } from '@dnd-kit/utilities';

export default function KanbanItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <Box bg="green" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Heading size="sm">{props.title}</Heading>
            <AvatarGroup size='sm' max={4}>
                {
                    props.contribute != null ? props.contribute.map(x => {
                        return <Avatar key={x.userId} name={x.name} src={x.photos} />
                    }) : <Box></Box>
                }
            </AvatarGroup>
        </Box>
    );
};
