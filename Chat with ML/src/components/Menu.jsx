import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { IoPersonCircleSharp } from "react-icons/io5";
import React from "react";

export default function DropMenu({ MenuItems }) {
  return (
    <Menu>
      <MenuHandler>
        <IconButton className="bg-transparent">
          <IoPersonCircleSharp
            size={40}
            className=" fill-black  dark:fill-white"
          />
        </IconButton>
      </MenuHandler>
      <MenuList className="dark:bg-slate-400">
        {MenuItems.map((item, index) => (
          <MenuItem
            key={index}
            className="flex items-center gap-2"
            onClick={item.event}
          >
            {item.icon}
            <Typography variant="small" className="font-medium">
              {item.option}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
