import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Button from "@mui/material/Button";

import { rickMortyApi } from "../../utils/rickMortyApi";
import CharactersTable from "./CharactersTable/";
import SearchBar from "./SearchBar";
import "./styles.scss";
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

  const loadPage = (page) => {
    rickMortyApi
      .getСharactersFromPage(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      )
      .then((json) => {
        setInfo(json.info);
        setCharacters(json.results);
      });
  };

  useEffect(() => {
    if (characters) {
      setIsLoading(false);
    }
  }, [characters]);

  const handleClose = () => setOpenModal(false);

  const handleOpen = () => setOpenModal(true);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="table-container">
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
    </div>
  );
}

export default CharactersPage;
