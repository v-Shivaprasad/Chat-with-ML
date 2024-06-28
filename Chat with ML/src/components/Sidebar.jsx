import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useCompCommunicator } from "../store/CompCommunicater";
import { RxCross1 } from "react-icons/rx";
import Chathistory from "./Chathistory";
import { useDarkTheme } from "../store/ThemeManage";

const Sidebar = () => {
  const { open, setOpen, openDrawer, closeDrawer } = useCompCommunicator();
  const { dark } = useDarkTheme();

  return (
    <>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4 dark:bg-primary-97"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" className="dark:text-white">
            Chat History
          </Typography>
          <IconButton
            variant="text"
            color={dark ? "white" : "black"}
            onClick={closeDrawer}
          >
            <RxCross1 />
          </IconButton>
        </div>
        <Chathistory />
      </Drawer>
    </>
  );
};

export default Sidebar;
