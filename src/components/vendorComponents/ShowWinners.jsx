import * as React from "react";
import { Table, styled,Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "../../utils/AxiosInstance";

const TableContainers = styled(TableContainer)`
  min-height: 323px;
`;

const TablePaginations = styled(TablePagination)`
  .MuiToolbar-root {
    justify-content: center;
  }

  .MuiTablePagination-spacer {
    display: none;
  }
`;

const ShowWinners = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [winnersData, setwinnersData] = React.useState([]);

  const vendorId = localStorage.getItem("vendorId")

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 

  const fetchVendorData = async () => {
    try {
      const winnersData = await axios.get(`/api/getwinners/${vendorId}`);

      setwinnersData(winnersData.data.data);
      console.log("winnersData", winnersData.data.data);
    } catch (err) {
      console.error("vendors fetching error:", err);
      console.log("Response:", err.response);
    }
  };

  React.useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <>
      {winnersData.length !== 0 ? (
        <div>
          <TableContainers component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>item name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>winner name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>winner email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {winnersData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell >
                        {row?.itemId?.itemName}
                      </TableCell>
                      <TableCell>{row?.highestBidderId?.userId?.username}</TableCell>
                      
                      <TableCell>{row?.highestBidderId?.userId?.email}</TableCell>

                      <TableCell>${row?.highestBidderId?.amount}/-</TableCell>
                     
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainers>
          <TablePaginations
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={winnersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <h1>no organizers to show</h1>
      )}
    </>
  );
};

export default ShowWinners;