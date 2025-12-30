import { GridColDef } from "@mui/x-data-grid";

export function medicineColumns(): GridColDef[] {
  return [
    {
      field: "medicineName",
      headerName: "Medicine Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "description",
      headerName: "Medicine Description",
      flex: 1,
      minWidth: 150,
    },
  ];
}
