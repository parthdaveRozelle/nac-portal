/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDebounce } from "@/customhooks";
// import { IMedicines } from "@/interfaces";
import { MedicineHttpClient } from "@/services";
import { flexUtils, medicationStyles as styles } from "@/styles";
import { queryParams, toastError } from "@/utils";
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TableLoading } from "../tableLoading";
import { getMedicationStats, medicineColumns } from "@/constants";

export const Medications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicinesList, setMedicinesList] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  //pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const fetchAllMedicines = async () => {
    setLoading(true);
    const { filter, pagination } = queryParams;

    const { error, data } = await MedicineHttpClient.getAllMedicines(
      filter({ medicineName: debouncedSearchTerm }),
      pagination(10, page)
    );
    if (error || !data) {
      return toastError(error);
    }

    const { results, pages, total } = data.data;
    setLoading(false);
    setMedicinesList(results);
    setPages(pages);
    setTotal(total);
  };

  useEffect(() => {
    fetchAllMedicines();
  }, [debouncedSearchTerm, page]);

  const columns = medicineColumns();
  return (
    <>
      <Box sx={styles.boxHeaderFlex}>
        <Typography variant="h5">Medicine list</Typography>
      </Box>
      <Typography variant="body1" fontWeight={500} color="grey">
        Manage medication availability and therapy eligibility
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {getMedicationStats(medicinesList, total).map(
            (stat: any, statIndex: number) => (
              <Grid
                key={statIndex}
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{ cursor: "pointer" }}
              >
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {stat.statsTitle}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {stat.statsCount}
                  </Typography>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <TextField
        label="Search Medicines"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={styles.textFeildMargin}
      />
      {loading ? (
        <TableLoading heading={columns} />
      ) : medicinesList && medicinesList?.length > 0 ? (
        <>
          <DataGrid
            rows={medicinesList ? medicinesList : []}
            columns={columns}
            getRowId={(row) => row.id}
            hideFooterPagination={true}
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
            }}
          />
          <Box sx={flexUtils.flexCenter}>
            <Stack spacing={2} sx={styles.stackMargin}>
              <Pagination
                count={pages}
                shape="rounded"
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </>
      ) : (
        <Box sx={styles.boxStyle}>
          <Typography> No Records Found</Typography>
        </Box>
      )}
    </>
  );
};
