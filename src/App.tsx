import React, { useEffect, useState } from "react";
import "./App.css";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { getData } from "./api";
import { AppDetails } from "./app-details";

interface Column {
  id: "appName" | "category" | "appSources";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "appName", label: "Name", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  { id: "appSources", label: "Connector", minWidth: 100 },
];

function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const [appRows, setAppRows] = useState<AppDetails[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getInitialData() {
    getData(page, rowsPerPage)
      .then((data) => {
        setAppRows(data?.appRows);
        setTotalCount(data?.totalCount);
        return;
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    getInitialData();
  }, [page, rowsPerPage]);

  return (
    <div className="App">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 660 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appRows?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.appId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default App;
