import { IconButtonProps, Stack } from "@mui/material";
import { cloneElement } from "react";

interface IconMenuProps {
    children:
        | React.ReactElement<IconButtonProps>
        | React.ReactElement<IconButtonProps>[];
}

const childProps: IconButtonProps = {
    size: "small"
}

const IconMenu = ({ children }: IconMenuProps) => {

    
    if (!Array.isArray(children)) {
        return (
            cloneElement(children, childProps)
        )   
    }

    return (
        <Stack flexDirection="row" >
            {children && children.map((child, i) =>
                cloneElement(child, {...childProps, key: i})
            )}
        </Stack>
    );
};
export default IconMenu;
