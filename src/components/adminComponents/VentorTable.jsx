import * as React from 'react';
import {Table,styled} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';


const TableContainers = styled(TableContainer)`
min-height:323px;
`

const TablePaginations =styled(TablePagination)`

  .MuiToolbar-root{
    justify-content: center;
  }

  .MuiTablePagination-spacer{
    display: none;

    }

`

// Sample data
const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 5, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 6, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 7, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 8, name: 'Bob Brown', email: 'bob@example.com' },
  { id: 9, name: 'Bob Brown', email: 'bob@example.com' },
  // Add more data as needed
];

const VentorTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainers component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{fontWeight:700}}>Ventor name</TableCell>
              <TableCell sx={{fontWeight:700}}>Ventor mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id} >
                <TableCell sx={{minWidth:'250px'}}>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainers>
      <TablePaginations
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default VentorTable;
