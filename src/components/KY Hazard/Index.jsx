import {
  Card,
  Grid,
  Stack,
  InputLabel,
  Button,
  Container,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Autocomplete,
} from "@mui/material";
import ImageCards from "../../Section/KYHazared/ImageCards";
import Navbar from "../Navbar/Navbar";
import "../Screen2/Index.css";
import { Locations } from "../../assets/Locations/Locations";
import { workPermit } from "../../assets/Locations/WorkPermit";
import { outputData } from "../../assets/Locations/output";
import { useState } from "react";
import axios from "axios";

const Index = () => {
  const [recommendationData, setRecommendationData] = useState([]);
  const [location, setLocation] = useState("");
  const [selectWorkPermit, setSelectWorkPermit] = useState("");
  const [activities, setActivities] = useState("");
  const [chemicals, setChemicals] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(filterData({ location }));
      console.log(selectWorkPermit, activities, chemicals);
      const response = await axios.post(
        "http://192.168.1.21:5173/recommendation",
        {
          work_permit: selectWorkPermit,
          activities,
          chemicals,
          location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let jsonData = response?.data;

      // Check if the data is a string
      if (typeof jsonData === "string") {
        // Convert the string to an object
        jsonData = jsonData
          .replace(/Infinity/g, '"Infinity"')
          .replace(/NaN/g, '"NaN"');
        try {
          jsonData = JSON.parse(jsonData);
          console.log(jsonData.recommendation); // Now jsonData is an object
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
      setRecommendationData(jsonData?.recommendation || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (values) => {
    const { location } = values;
    const data = outputData.filter((output) => {
      if (output.Location.includes(location)) {
        return output;
      }
      return false;
    });
    return data;
  };

  // const getRecommendation = () => {

  // }

  console.log(recommendationData);
  return (
    <>
      <Navbar title="KY Hazard Application" />
      <Container
        maxWidth="90%"
        className="container-body"
        sx={{ paddingTop: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "16px", marginBottom: 2 }}
                >
                  Hazard Recommendation Engine
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Card
                    sx={{ width: "100%" }}
                    padding={2}
                    // sx={{
                    //   borderRadius: 5,
                    //   boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.5)",
                    // }}
                  >
                    <Grid container spacing={1} sx={{ padding: 2 }}>
                      <Grid item xs={12}>
                        <InputLabel>Choose location</InputLabel>
                        <Autocomplete
                          onInputChange={(e, value) => setLocation(value)}
                          fullWidth
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={Locations}
                          sx={{
                            ".MuiOutlinedInput-root": {
                              borderRadius: 50,
                              borderColor: "red",
                              borderWidth: 10,
                            },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Choose Location"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>Select Work Permit:</InputLabel>
                        <Autocomplete
                          onInputChange={(e, value) =>
                            setSelectWorkPermit(value)
                          }
                          fullWidth
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={workPermit}
                          sx={{
                            ".MuiOutlinedInput-root": {
                              borderRadius: 50,
                              borderColor: "red",
                              borderWidth: 10,
                            },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Choose Permit Type"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>
                          Enter Activities (comma-separated):
                        </InputLabel>
                        <TextField
                          onChange={(e) => setActivities(e.target.value)}
                          fullWidth
                          size="small"
                          placeholder="Enter Activities"
                          InputProps={{
                            sx: { borderRadius: 8, height: "35px" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>
                          Enter Chemicals (comma-separated):
                        </InputLabel>
                        <TextField
                          onChange={(e) => setChemicals(e.target.value)}
                          fullWidth
                          size="small"
                          placeholder="Enter type of chemicals around the area"
                          InputProps={{
                            sx: { borderRadius: 8, height: "35px" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: 8,
                            width: "100%",
                            backgroundColor: "#2d3395",
                            color: "#fff",
                          }}
                        >
                          Get Recommendations
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </form>
              </Grid>
              <Grid item xs={12}>
                <ImageCards />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: 2 }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                Results
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 8,
                  width: "200px",
                  height: "20px",
                  backgroundColor: "#2d3395",
                  color: "#fff",
                }}
              >
                Download as PDF
              </Button>
            </Stack>
            <Card>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Hazard Category</TableCell>
                    <TableCell>Hazards</TableCell>
                    <TableCell>Risk Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendationData &&
                    recommendationData?.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "lightgray" : "white",
                        }}
                      >
                        <TableCell>
                          {data["Hazard Category"] || "N/a"}
                        </TableCell>
                        <TableCell>{data?.Hazards || "N/a"}</TableCell>
                        <TableCell>{data?.Risk_Category || "N/a"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
