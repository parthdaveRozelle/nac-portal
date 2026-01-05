import { Box, Button, IconButton, Chip, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export function medicineColumns(): GridColDef[] {
  return [
    {
      field: "brandName",
      headerName: "Medicine Name",
      width: 200,
    },
    {
      field: "genericName",
      headerName: "Generic Name",
      width: 200,
    },
    {
      field: "strength",
      headerName: "Strength",
      width: 100,
    },
    {
      field: "available",
      headerName: "Availability",
      width: 120,

      renderCell: (params: GridRenderCellParams) => {
        const available = params.row.available;
        return (
          <Button
            size="small"
            sx={{
              color: "white",
              backgroundColor: available ? "#7fbf7f" : "#ff8282",
            }}
          >
            {available ? "Available" : "Unavailable"}
          </Button>
        );
      },
    },
    {
      field: "therapyTypes",
      headerName: "Therapy",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const medication = params.row;
        return (
          <Box sx={{ mt: 1 }} display="flex" gap={1} flexWrap="wrap">
            {medication.therapyTypes
              ?.filter((t: string) => t === "AIR" || t === "MART")
              .map((type: string) => {
                const approval = medication.tgaApproval?.[type.toLowerCase()];
                const isAIR = type === "AIR";

                return (
                  <Tooltip
                    key={type}
                    title={approval?.note || ""}
                    arrow
                    placement="top"
                  >
                    <Chip
                      size="small"
                      label={`${type}${
                        approval?.minAge ? ` ${approval.minAge}+` : ""
                      }`}
                      sx={{
                        fontWeight: 600,
                        bgcolor: isAIR ? "success.light" : "warning.light",
                        color: "text.primary",
                        border: "1px solid",
                        borderColor: isAIR ? "success.main" : "warning.main",
                      }}
                    />
                  </Tooltip>
                );
              })}
          </Box>
        );
      },
    },
    // {
    //   field: "deviceType",
    //   headerName: "Device Type",
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      field: "pbsListed",
      headerName: "PBS Status",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const isPBSListed = params.row.pbsListed;

        return isPBSListed ? (
          <Tooltip title="View PBS details" arrow>
            <Chip
              label="PBS Listed"
              size="small"
              clickable
              icon={<CheckCircleIcon />}
              color="success"
              sx={{ fontWeight: 600 }}
              onClick={() => {
                console.log("Navigate to PBS details", params.row);
              }}
            />
          </Tooltip>
        ) : (
          <Chip
            label="Not Listed"
            size="small"
            icon={<CancelIcon />}
            color="default"
            sx={{
              fontWeight: 600,
              bgcolor: "grey.200",
            }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Edit",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
}
