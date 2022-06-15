import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { localStoreController } from "../../utils/localStoreController";

function LikedBand(props) {
  const { id, name, status } = props;

  const [isLiked, setIsLiked] = useState(
    localStoreController.getCharacter(name)?.isLiked || false
  );
  const [isDisliked, setIsDisliked] = useState(
    localStoreController.getCharacter(name)?.isDisliked || false
  );
  const [isClicked, setIsClicked] = useState(false);

  const onLikeClickHandler = () => {
    setIsClicked(true);
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const onDisikeClickHandler = () => {
    setIsClicked(true);
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  useEffect(() => {
    if (!isClicked) return;

    localStoreController.addCharacter({
      id: id,
      name: name,
      status: status,
      isLiked: isLiked,
      isDisliked: isDisliked,
      image: localStoreController.getCharacter(name)?.image || "",
    });
  }, [isLiked, isDisliked]);

  return (
    <>
      <IconButton
        size="medium"
        sx={{ marginLeft: "auto" }}
        onClick={() => onLikeClickHandler()}
      >
        {isLiked ? (
          <ThumbUpAltIcon fontSize="inherit" />
        ) : (
          <ThumbUpOffAltIcon fontSize="inherit" />
        )}
      </IconButton>
      <IconButton
        size="medium"
        sx={{ marginLeft: "auto" }}
        onClick={() => onDisikeClickHandler()}
      >
        {isDisliked ? (
          <ThumbDownAltIcon fontSize="inherit" />
        ) : (
          <ThumbDownOffAltIcon fontSize="inherit" />
        )}
      </IconButton>
    </>
  );
}

export default LikedBand;
