import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rickMortyApi } from "../../utils/rickMortyApi";
import CharacterCard from "./CharacterCard";

function CharacterCardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [character, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const id = +location.pathname.slice(11, location.pathname.length);

  if (!Number.isInteger(id)) {
    navigate("/");
  }

  useEffect(() => {
    rickMortyApi.getСharactersById(id).then((json) => {
      setCharacter(json);
    });
  }, []);

  useEffect(() => {
    if (character) {
      setIsLoading(false);
    }
  }, [character]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <CharacterCard character={character} />;
}

export default CharacterCardPage;
