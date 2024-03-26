import { useEffect, useState } from "react";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function KYsheetDetails() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [labels, setLabels] = useState([]);
  const handleSubmit = (e) => {
    console.log(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    setSelectedCheckboxes((prevSelected) => {
      if (event.target.checked) {
        return [...prevSelected, checkboxName];
      } else {
        return prevSelected.filter((name) => name !== checkboxName);
      }
    });
  };
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9090/workpermit/api/v1/questions?questionType=CERTIFY"
      );
      setLabels(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const MappedCheckBoxes = () => {
    return labels.map((label) => (
      <FormControlLabel
        key={label}
        sx={{ padding: 0 }}
        control={
          <Checkbox
            sx={{ paddingY: 0 }}
            size="small"
            name={label}
            onClick={handleCheckboxChange}
            checked={selectedCheckboxes.includes(label)}
          />
        }
        label={
          <Typography sx={{ fontSize: "12px" }}>
            {label?.questionDesc || "n/a"}
          </Typography>
        }
      />
    ));
  };
  console.log(selectedCheckboxes);

  return (
    <Container maxWidth="95%">
      <Stack spacing={2} maxWidth="400px">
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "2px solid blue",
              textAlign: "center",
            }}
          >
            4
          </Typography>
          <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
            Certify
          </Typography>
          <FormGroup onSubmit={handleSubmit} spacing={1}>
            <MappedCheckBoxes />
          </FormGroup>
        </Stack>
        <Alert
          severity="info"
          //   sx={{
          //     border: "1px solid red",
          //     width: "400px",
          //     height: "160px",
          //     backgroundColor: "",
          //   }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            If work ares is changed, KY to be done again.
          </Typography>
        </Alert>
      </Stack>
    </Container>
  );
}
