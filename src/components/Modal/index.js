import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { default as MuaModal } from "@mui/material/Modal";

function Modal(props) {
  const { open, handleClose, list, title, listItemsTitle, listItemsSubtitle } =
    props;

  return (
    <div>
      <MuaModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "4px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={0.5}
            fontWeight="bold"
          >
            {title}
          </Typography>
          <Typography sx={{ mb: 2 }}>Total: {list.length}</Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
            }}
          >
            {list.map((item) => (
              <ListItem
                sx={{ display: "block", borderBottom: "1px solid black" }}
                key={item.id}
              >
                <Typography>
                  {listItemsTitle}:&nbsp;
                  <Typography component="span" fontWeight="bold">
                    {item.title}
                  </Typography>
                </Typography>
                <Typography>
                  {listItemsSubtitle}:&nbsp;
                  <Typography component="span" fontWeight="bold">
                    {item.subtitle}
                  </Typography>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </MuaModal>
    </div>
  );
}

export default Modal;
