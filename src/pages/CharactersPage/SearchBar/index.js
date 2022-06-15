import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { rickMortyApi } from "../../../utils/rickMortyApi";
import "./styles.scss";

function SearchBar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const adaptCharacters = (characters) => {
    let unicleCharacters = [];

    characters.map((character) => {
      if (
        unicleCharacters.filter((e) => e.label === character.name).length === 0
      ) {
        unicleCharacters.push({ label: character.name, id: character.id });
      }
    });

    setOptions(unicleCharacters.slice(0, 10));
  };

  useEffect(() => {
    if (inputValue !== "") {
      setIsLoading(true);

      rickMortyApi
        .getСharactersWithName(inputValue)
        .then((json) => {
          adaptCharacters(json.results);
        })
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
          setOptions([]);
        });
    }
  }, [inputValue]);

  useEffect(() => {
    if (options) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [options]);

  const followCharacter = (id) => {
    navigate(`/character/${id}`);
  };

  const inputChangeHandler = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      className={"search-bar"}
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        inputChangeHandler(event, newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Characters"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} onClick={() => followCharacter(option.id)}>
          {option.label}
          <IconButton
            aria-label="delete"
            size="small"
            sx={{ marginLeft: "auto" }}
          >
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </li>
      )}
    />
  );
}

export default SearchBar;
