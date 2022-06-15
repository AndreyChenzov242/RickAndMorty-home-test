import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { rickMortyApi } from "../../../utils/rickMortyApi";

function SearchBar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const followCharacter = (id) => {
    navigate(`/character/${id}`);
  };

  const inputChangeHandler = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300, margin: "12px 0" }}
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
          <IconButton size="small" sx={{ marginLeft: "auto" }}>
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </li>
      )}
    />
  );
}

export default SearchBar;
