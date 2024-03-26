import {
  Container,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  InputLabel,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function WPNumberDetails() {
  const [workPermitDetails, setWorkPermitDetails] = useState(null);
  const styles = {
    firstTableTypo: { fontSize: "12px", whiteSpace: "nowrap" },
    firstTableHeading: {
      fontSize: "12px",
      whiteSpace: "nowrap",
      fontWeight: 600,
    },
  };
  const { id } = useParams();
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const getWorkPermitDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9090/workpermit/api/get-work-permit?workPermitID=${id}`
        );
        setWorkPermitDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWorkPermitDetails();
  }, []);

  const activeDetails = (data) => {
    const today = new Date().toLocaleDateString();

    const active = data.kyDetails.filter((details) => {
      const active = new Date(details.filledDate).toLocaleDateString();

      if (today === active) return true;
      return false;
    });
    setActive(active);
  };
  const completedDetails = (data) => {
    const today = new Date().toLocaleDateString();

    const active = data.kyDetails.filter((details) => {
      const active = new Date(details.filledDate).toLocaleDateString();

      if (today > active) return true;
      return false;
    });
    setCompleted(active);
  };
  useEffect(() => {
    if (workPermitDetails?.kyDetails) {
      activeDetails(workPermitDetails);
      completedDetails(workPermitDetails);
    }
  }, [workPermitDetails]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableHeading}>
                      Work Permit Number
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      {parseInt(workPermitDetails?.workPermitPlanId) || "n/a"}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableHeading}>
                      Type of Work
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      {workPermitDetails?.workPermitType || "n/a"}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableHeading}>
                      From Date
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      {new Date(
                        workPermitDetails?.wpIssueFromDate
                      ).toLocaleString() || "n/a"}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableHeading}>
                      To Date
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      {new Date(
                        workPermitDetails?.wpIssueToDate
                      ).toLocaleString() || "n/a"}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableHeading}>
                      No of Persons
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      {parseInt(workPermitDetails?.wpNoPerson) || "n/a"}
                    </Typography>
                  </Stack>
                </TableCell>
                {/* <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Group
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Test
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Stack>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Issue Date
                    </Typography>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Aug 01, 2023 2:000 pm
                    </Typography>
                  </Stack>
                </TableCell> */}
              </TableRow>
            </TableBody>
            {/* <TableBody>
              <TableRow>
                <TableCell>12345</TableCell>
                <TableCell>Work Requiring Permit</TableCell>
                <TableCell>Aug01,2023 2:00 PM</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Aug01,2023 2:00 PM</TableCell>
              </TableRow>
            </TableBody> */}
          </Table>
        </Grid>
        <Grid item xs={12} sx={{ marginLeft: "12px" }}>
          <InputLabel sx={{ fontSize: "14px", fontWeight: 600 }}>
            Activity Details
          </InputLabel>
          <TextField
            size="small"
            value={workPermitDetails?.jobDetailes || ""}
            disabled
            sx={{ width: 500 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "23px",
          }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{ backgroundColor: "#000080" }}
          >
            Create new KY sheet
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="90%" sx={{ mt: 3 }}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Typography>Active KY Sheets</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      KY Sheet No
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      KY Fill Date
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Area / Sub Area
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Requiring Department
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Issuing Department
                    </Typography>
                  </TableCell> */}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {active.map((act, index) => (
                  <TableRow key={index}>
                    <TableCell width="25%">{act.id}</TableCell>
                    <TableCell width="25%">{act.filledDate}</TableCell>
                    <TableCell width="25%">{act.workPermitId}</TableCell>
                    <TableCell width="25%">{act.workPermitId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="90%" sx={{ mt: 5 }}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Typography>Completed/ Archived KY Sheets</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      KY Sheet No
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      KY Fill Date
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Area / Sub Area
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Requiring Department
                    </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography variant="body1" sx={styles.firstTableTypo}>
                      Issuing Department
                    </Typography>
                  </TableCell> */}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completed.map((act, index) => (
                  <TableRow key={index}>
                    <TableCell width="25%">{act.id}</TableCell>
                    <TableCell width="25%">{act.filledDate}</TableCell>
                    <TableCell width="25%">{act.workPermitId}</TableCell>
                    <TableCell width="25%">{act.workPermitId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableBody>
                <TableRow>
                  <TableCell>12345</TableCell>
                  <TableCell>07/27/23</TableCell>
                  <TableCell>Bullind 5 First Floor seating Area </TableCell>
                  <TableCell>CVL-R</TableCell>
                </TableRow>
              </TableBody> */}
            </Table>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
