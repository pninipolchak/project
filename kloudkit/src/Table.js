import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getData } from './DataApi';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'average', label: 'Average', minWidth: 100 },

]
const rows = [
    {"date": "January2023", "average": "3.45"},
    {"date": "February2023", "average": "3.54"},
    {"date": "March2023", "average": "3.62"},
    {"date": "April2023", "average": "3.64"},
    {"date": "May2023", "average": "3.66"},
    {"date": "June2023", "average": "3.64"},
    {"date": "July2023", "average": "3.67"},
    {"date": "August2023", "average": "3.75"},
    {"date": "September2023", "average": "3.82"},
    {"date": "October2023", "average": "3.98"},
    {"date": "November2023", "average": "3.81"},
    {"date": "December2023", "average": "3.67"},
    {"date": "January2024", "average": "3.71"},
    {"date": "February2024", "average": "3.65"},
    {"date": "March2024", "average": "3.63"},
    {"date": "April2024", "average": "3.74"},
    {"date": "May2024", "average": "3.71"},
    {"date": "June2024", "average": "3.72"},
    {"date": "July2024", "average": "3.68"}
]
// const rows = getData()

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '50%', overflow: 'hidden' ,backgroundColor:'pink'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100,200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
