import { Card, Typography, Grid, Stack } from "@mui/material";
import CardImage1 from "../../assets/CardImages/CardImage1.png";
import CardImage2 from "../../assets/CardImages/CardImage2.png";
import CardImage3 from "../../assets/CardImages/CardImage3.png";
import CardImage4 from "../../assets/CardImages/CardImage4.png";

const ImageCards = () => {
  const imagesList = [
    {
      image: CardImage1,
      description: "The scaffolding should have a safe...",
      id: 1,
    },
    {
      image: CardImage2,
      description: "Use a safety belt when working on...",
      id: 2,
    },
    {
      image: CardImage3,
      description: "Ensure bricks are properly stacked...",
      id: 3,
    },
    {
      image: CardImage4,
      description: "Ensure Safe working platform during s...",
      id: 4,
    },
  ];
  return (
    <Grid>
      <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
        Do’s and Dont’s
      </Typography>
      <Card>
        <Stack
          direction="row"
          spacing={2}
          sx={{ overflowX: "auto", padding: 2 }}
        >
          {imagesList.map((imageCard, index) => (
            <Grid key={imageCard.id}>
              <img
                src={imageCard.image}
                alt={index}
                width="150px"
                height="80px"
              />
              <Typography>{imageCard.description}</Typography>
            </Grid>
          ))}
        </Stack>
      </Card>
    </Grid>
  );
};

export default ImageCards;
