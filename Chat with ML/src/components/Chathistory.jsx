import React from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

const Chathistory = () => {
  return (
    <div>
      <List className="dark:text-white  ">
        {" "}
        <ListItem>
          {" "}
          <ListItemPrefix className="dark:text-white">
            1.
          </ListItemPrefix> Chat1{" "}
        </ListItem>{" "}
        <ListItem>
          {" "}
          <ListItemPrefix className="dark:text-white">
            2.
          </ListItemPrefix> chat2{" "}
          <ListItemSuffix>
            {" "}
            <Chip
              value="5"
              size="sm"
              color="green"
              className="rounded-full dark:text-white"
            />{" "}
          </ListItemSuffix>{" "}
        </ListItem>{" "}
        <ListItem>
          {" "}
          <ListItemPrefix className="dark:text-white">
            3.
          </ListItemPrefix> Chat3{" "}
        </ListItem>{" "}
      </List>
    </div>
  );
};

export default Chathistory;
