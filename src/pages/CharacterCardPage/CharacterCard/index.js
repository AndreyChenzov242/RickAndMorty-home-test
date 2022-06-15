import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Modal from "../../../components/Modal";
import Avatar from "../../../components/Avatar";
import Typography from "@mui/material/Typography";
import LikeBand from "../../../components/LikesBand";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import blankProfileImage from "../../../assets/images/blank-profil.png";
import { rickMortyApi } from "../../../utils/rickMortyApi";

function CharacterCard({ character }) {
  const {
    id,
    name,
    species,
    gender,
    location,
    episode,
    status,
    created,
    image,
  } = character;

  const [episodes, setEpisodes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  const createdDate = new Date(created).toLocaleDateString();

  const episodesId = episode.map((item) => item.slice(40, item.length));

  const handleClose = () => setOpenModal(false);

  const handleOpen = () => {
    let episodesAdapt = [];

    rickMortyApi
      .getEpisode(episodesId.join(","))
      .then((result) => {
        if (Array.isArray(result)) {
          result.map((res) => {
            episodesAdapt.push({
              id: res.id,
              title: res.name,
              subtitle: res.air_date,
            });
          });
          setEpisodes(episodesAdapt);
        } else {
          setEpisodes([
            {
              id: result.id,
              title: result.name,
              subtitle: result.air_date,
            },
          ]);
        }
      })
      .then(setOpenModal(true));
  };

  return (
    <Card sx={{ maxWidth: 600, width: "100%", margin: "120px auto 0 auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: matches ? "column" : "row",
          }}
        >
          <Box sx={{ marginRight: 2 }}>
            <Avatar
              src={image || blankProfileImage}
              name={name}
              id={id}
              status={status}
            />
          </Box>
          <Box>
            <Typography fontSize={32} color="text.primary" gutterBottom>
              {name}
            </Typography>
            <Typography mb={1.5} color="text.secondary" fontWeight="bold">
              {status} • {species}
            </Typography>
            <Typography mb={1} color="text.secondary">
              Gender:&nbsp;
              <Typography
                fontWeight="bold"
                color="text.secondary"
                component="span"
              >
                {gender}
              </Typography>
            </Typography>
            <Typography mb={1} color="text.secondary">
              Location: &nbsp;
              <Typography
                fontWeight="bold"
                color="text.secondary"
                component="span"
              >
                {location.name}
              </Typography>
            </Typography>
            <Typography color="text.secondary">
              Created: &nbsp;
              <Typography
                fontWeight="bold"
                color="text.secondary"
                component="span"
              >
                {createdDate}
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignSelf: matches ? "center" : "baseline",
              marginLeft: matches ? "0" : "auto",
              marginTop: matches ? "12px" : "0",
            }}
          >
            <LikeBand id={id} name={name} status={status} />
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen} sx={{ width: "100%" }}>
          Show episode
        </Button>
        <Modal
          open={openModal}
          handleClose={handleClose}
          title="Episodes"
          list={episodes}
          listItemsTitle={"Name"}
          listItemsSubtitle={"Air date"}
        />
      </CardActions>
    </Card>
  );
}

export default CharacterCard;
