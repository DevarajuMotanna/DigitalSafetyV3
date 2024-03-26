import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  InputLabel,
  TextField,
  Container,
  Stack,
} from "@mui/material";

export default function TopTableDetails() {
  const styles = {
    firstTableTypo: { fontSize: "12px", whiteSpace: "nowrap" },
    firstTableRow: { fontSize: "14px", whiteSpace: "nowrap" },
  };
  return (
    <Container>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>
              <Stack>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Work Permit Number
                </Typography>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  12345
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Stack>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Type of Work
                </Typography>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Work Requiring Permit
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Stack>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Work Date
                </Typography>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Aug 01, 2023 2:00 pm
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Stack>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Shop
                </Typography>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Test
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Stack>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Area
                </Typography>
                <Typography variant="body1" sx={styles.firstTableTypo}>
                  Test
                </Typography>
              </Stack>
            </TableCell>
            <TableCell>
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
                  Aug 01, 2023n2:00 pm
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ marginLeft: 12 }}>
        <InputLabel sx={{ fontSize: "12px", fontWeight: 600, marginTop: 1 }}>
          Activity Details
        </InputLabel>
        <TextField size="small" sx={{ width: 500 }} />
      </div>
    </Container>
  );
}
