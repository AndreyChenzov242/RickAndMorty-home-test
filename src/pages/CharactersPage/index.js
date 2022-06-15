import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import Modal from "../../components/Modal";
import CharactersTable from "./CharactersTable/";
import { rickMortyApi } from "../../utils/rickMortyApi";
import { localStoreController } from "../../utils/localStoreController";

function CharactersPage() {
  const [characters, setCharacters] = useState();
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [lickedCharacters, setLickedCharacters] = useState();

  useEffect(() => {
    rickMortyApi.getСharacters().then((json) => {
      setInfo(json.info);
      setCharacters(json.results);
    });

    let lickedCharacter = [];
    localStoreController.getCharacter()?.map((character) => {
      if (character.isLiked) {
        lickedCharacter.push({
          id: character.id,
          title: character.name,
          subtitle: character.status,
        });
      }
    });

    setLickedCharacters(lickedCharacter);
  }, []);

  useEffect(() => {
    if (characters) {
      setIsLoading(false);
    }
  }, [characters]);

  const loadPage = (page) => {
    rickMortyApi.getСharactersFromPage(page).then((json) => {
      setInfo(json.info);
      setCharacters(json.results);
    });
  };

  const handleClose = () => setOpenModal(false);

  const handleOpen = () => setOpenModal(true);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box maxWidth={600} margin="0 auto" paddingTop={2}>
      <Typography variant="h1" fontSize={32} mb={1} textAlign="center">
        Rick and Morty API
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Button size="small" onClick={handleOpen} sx={{ marginLeft: "auto" }}>
          Show liked
        </Button>
        <Modal
          open={openModal}
          handleClose={handleClose}
          title="Liked Characters"
          list={lickedCharacters}
          listItemsTitle={"Name"}
          listItemsSubtitle={"Status"}
        />
      </Box>
      <CharactersTable
        characters={characters}
        totalCount={info.count}
        loadPage={loadPage}
      />
    </Box>
  );
}

export default CharactersPage;
