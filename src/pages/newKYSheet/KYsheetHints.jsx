import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const KYsheetHints = () => {
  const [labels, setLabels] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9090/workpermit/api/v1/questions?questionType=HINT"
      );
      setLabels(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Stack spacing={2} direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Typography
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: "2px solid blue",
            textAlign: "center",
          }}
        >
          2
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
          Hints
        </Typography>
      </Stack>
      <Typography sx={{ fontWeight: 700, fontSize: "14px", mb: 1 }}>
        Please Check if the following items is applicable
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                WHAT CAN HAPPEN
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                Yes
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                WHERE / HOW
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
                WHAT CAN BE DONE
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labels.map((label, index) => (
            <HintsTableRow row={label} key={index} />
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

HintsTableRow.propTypes = {
  row: PropTypes.object,
};

export function HintsTableRow({ row }) {
  return (
    <TableRow>
      <TableCell>
        <Typography sx={{ fontSize: "12px" }}>{row?.desc || "n/a"}</Typography>
      </TableCell>
      <TableCell>
        <input type="radio" name="ElectricShock" />
      </TableCell>
      <TableCell>
        <input type="radio" name="ElectricShock" />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontSize: "12px" }}>
          {row?.causeDesc || "n/a"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography sx={{ fontSize: "12px" }}>
          {row?.measureDesc || "n/a"}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
