import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CharacterCard from "./CharacterCard";
import { rickMortyApi } from "../../utils/rickMortyApi";

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

  const onClickBreadcrumbsHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ cursor: "pointer" }}
          underline="hover"
          color="inherit"
          to="/"
          onClick={onClickBreadcrumbsHandler}
        >
          Home
        </Link>
        <Typography color="text.primary">Character</Typography>
      </Breadcrumbs>
      <CharacterCard character={character} />
    </>
  );
}

export default CharacterCardPage;
