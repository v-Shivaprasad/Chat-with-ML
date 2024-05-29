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
        {/* <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          /> */}
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
