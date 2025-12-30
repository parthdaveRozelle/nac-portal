import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
export function TableLoading({
  rowsNum = 5,
  heading,
}: {
  rowsNum?: number;
  heading: GridColDef[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {heading.map((val, i) => (
            <TableCell key={i}>{val.headerName}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...Array(rowsNum)].map((row, index) => (
          <TableRow key={index} sx={{ width: "100%" }}>
            {heading.map((val, i) => (
              <TableCell key={i}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
