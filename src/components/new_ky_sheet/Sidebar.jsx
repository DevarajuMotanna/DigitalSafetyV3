import { Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

const Sidebar = () => {
  const pages = [
    { number: 1, name: "KY Sheet Details" },
    { number: 2, name: "Hints" },
    { number: 3, name: "RISK AREAS" },
  ];

  const { pageNumber } = useParams();

  console.log(pageNumber);
  return (
    <Container maxWidth="90%">
      <Stack spacing={1.5} justifyContent="center">
        {pages.map((page) => (
          <Stack
            key={page.number}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Typography
              textAlign="center"
              sx={{
                width: 20,
                height: 20,
                backgroundColor: +pageNumber === page.number ? "#000080" : "",
                borderRadius: "50%",
                color: +pageNumber === page.number ? "#fff" : "",
                fontSize: "14px",
              }}
            >
              {+pageNumber > 1 && page.number < +pageNumber ? (
                <CheckIcon
                  size="small"
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "20px",
                  }}
                />
              ) : (
                page.number
              )}
            </Typography>
            <Typography
              sx={{
                fontWeight: +pageNumber === page.number ? 600 : "",
                fontSize: "12px",
              }}
            >
              {page.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};
export default Sidebar;
