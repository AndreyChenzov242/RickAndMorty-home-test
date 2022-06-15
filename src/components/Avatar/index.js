import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { default as MuaAvatar } from "@mui/material/Avatar";
import { localStoreController } from "../../utils/localStoreController";
import "./styles.scss";

function Avatar(props) {
  const { src, name, id, status } = props;
  const [ownImage, setOwnImage] = useState(
    localStoreController.getCharacter(name)?.image
  );
  const [images, setImages] = useState([]);
  const onChange = (image) => {
    setImages(image);
  };

  useEffect(() => {
    if (images.length > 0) {
      let character = localStoreController.getCharacter(name);
      character = {
        id: id,
        name: name,
        isLiked: character?.isLiked || false,
        isDisliked: character?.isDisliked || false,
        status: status,
        image: images[0].data_url,
      };
      localStoreController.addCharacter(character);

      setOwnImage(images[0].data_url);
    }
  }, [images]);

  const onRemove = () => {
    setOwnImage();
    deleteImageFromLocalStorage();
  };

  const deleteImageFromLocalStorage = () => {
    setOwnImage();
    let character = localStoreController.getCharacter(name);
    character = {
      id: id,
      name: name,
      status: status,
      isLiked: character?.isLiked || false,
      isDisliked: character?.isDisliked || false,
    };
    localStoreController.addCharacter(character);
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
        <div className="image-wrapper">
          <button
            style={isDragging ? { opacity: 1 } : null}
            onClick={onImageUpload}
            className="upload-btn"
            {...dragProps}
          >
            Click or Drop here
          </button>
          <div className="image">
            <MuaAvatar
              alt="Profile"
              src={images[0]?.data_url || ownImage || src}
              sx={{ width: 180, height: 180 }}
            />
            {(images.length > 0 || ownImage) && (
              <IconButton
                aria-label="delete"
                size="small"
                className="image__remove-btn"
                sx={{ position: "absolute", right: 0, top: 0 }}
                onClick={() => {
                  onRemove();
                  onImageRemove(0);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}

export default Avatar;
