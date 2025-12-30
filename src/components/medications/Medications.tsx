"use client";

import { useDebounce } from "@/customhooks";
import { IMedicines } from "@/interfaces";
import { MedicineHttpClient } from "@/services";
import { flexUtils, medicationStyles as styles } from "@/styles";
import { queryParams, toastError } from "@/utils";
import { Box, Pagination, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TableLoading } from "../tableLoading";
import { medicineColumns } from "@/constants";

export const Medications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicinesList, setMedicinesList] = useState<IMedicines[]>([]);
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
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

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
        <Typography variant="h6" component="div">
          Medicine list ({total})
        </Typography>
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
            getRowId={(row) => row._id}
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
