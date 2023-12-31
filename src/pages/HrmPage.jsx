import { useState } from "react";

import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
} from "@mui/material";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import AddModal from "../components/modal/AddModal";
import { useSelector } from "react-redux";

const TABLE_HEAD = [
  { id: "employee", label: "Employee", alignRight: false },
  { id: "designation", label: "Designation", alignRight: false },
  { id: "phonenumber", label: "Phone Number", alignRight: false },
  { id: "" },
];

function applySortFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    const lowercaseQuery = query.toLowerCase();

    const filteredArray = array.filter((_user) =>
      _user.name.toLowerCase().includes(lowercaseQuery)
    );

    return filteredArray;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function HrmPage() {
  const employees = useSelector((state) => state.employees);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const filteredUsers = applySortFilter(employees, filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const filterItems = [
    {
      title: "All Employees",
      total: 24,
    },
    {
      title: "Manager",
      total: 2,
    },
    {
      title: "Engineer",
      total: 3,
    },
    {
      title: "Maintenance",
      total: 5,
    },
    {
      title: "Accountant",
      total: 3,
    },
    {
      title: "Security",
      total: 5,
    },
    {
      title: "Others",
      total: 5,
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container>
        <AddModal handleClose={handleClose} open={open} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h2" gutterBottom color={"primary.main"}>
            Employees
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
            <UserListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            <Button variant="contained" size="large" onClick={handleOpen}>
              Add Employee
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Card>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {filterItems.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: "50px", height: "50px" }}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H27.5C28.163 0 28.7989 0.263392 29.2678 0.732233C29.7366 1.20107 30 1.83696 30 2.5V27.5C30 28.163 29.7366 28.7989 29.2678 29.2678C28.7989 29.7366 28.163 30 27.5 30H2.5C1.83696 30 1.20107 29.7366 0.732233 29.2678C0.263392 28.7989 0 28.163 0 27.5V2.5ZM10.8333 11.6667C10.8333 12.3297 10.5699 12.9656 10.1011 13.4344C9.63226 13.9033 8.99637 14.1667 8.33333 14.1667C7.67029 14.1667 7.03441 13.9033 6.56557 13.4344C6.09672 12.9656 5.83333 12.3297 5.83333 11.6667C5.83333 11.0036 6.09672 10.3677 6.56557 9.8989C7.03441 9.43006 7.67029 9.16667 8.33333 9.16667C8.99637 9.16667 9.63226 9.43006 10.1011 9.8989C10.5699 10.3677 10.8333 11.0036 10.8333 11.6667ZM5 18.1058C5 18.0075 5.03917 17.8758 5.21333 17.7008C5.395 17.5175 5.68333 17.3325 6.0625 17.1667C6.82417 16.8333 7.7525 16.6667 8.33333 16.6667C8.91417 16.6667 9.84167 16.8333 10.6042 17.1667C10.9833 17.3317 11.2708 17.5167 11.4533 17.7C11.6283 17.8758 11.6667 18.0075 11.6667 18.1058V20.8333H13.3333V18.1058C13.3333 17.4492 13.025 16.9183 12.6358 16.5258C12.2533 16.1417 11.7608 15.8533 11.2717 15.6392C10.2983 15.2142 9.1425 15 8.33333 15C7.52333 15 6.36833 15.2142 5.395 15.6392C4.90583 15.8533 4.41333 16.1417 4.03083 16.5258C3.64167 16.9183 3.33333 17.4492 3.33333 18.1058V20.8333H5V18.1058ZM18.5467 17.7008C18.3717 17.8758 18.3333 18.0075 18.3333 18.1058V20.8333H16.6667V18.1058C16.6667 17.4492 16.975 16.9183 17.3642 16.5258C17.7467 16.1417 18.2392 15.8533 18.7283 15.6392C19.7017 15.2142 20.8575 15 21.6667 15C22.4758 15 23.6317 15.2142 24.605 15.6392C25.0942 15.8533 25.5867 16.1417 25.9692 16.5258C26.3592 16.9183 26.6667 17.4492 26.6667 18.1058V20.8333H25V18.1058C25 18.0075 24.9608 17.8758 24.7867 17.7008C24.605 17.5175 24.3167 17.3325 23.9375 17.1667C23.1758 16.8333 22.2475 16.6667 21.6667 16.6667C21.0858 16.6667 20.1583 16.8333 19.3958 17.1667C19.0167 17.3317 18.7292 17.5167 18.5467 17.7V17.7008ZM21.6667 14.1667C22.3297 14.1667 22.9656 13.9033 23.4344 13.4344C23.9033 12.9656 24.1667 12.3297 24.1667 11.6667C24.1667 11.0036 23.9033 10.3677 23.4344 9.8989C22.9656 9.43006 22.3297 9.16667 21.6667 9.16667C21.0036 9.16667 20.3677 9.43006 19.8989 9.8989C19.4301 10.3677 19.1667 11.0036 19.1667 11.6667C19.1667 12.3297 19.4301 12.9656 19.8989 13.4344C20.3677 13.9033 21.0036 14.1667 21.6667 14.1667ZM17.5 10C17.5 10.663 17.2366 11.2989 16.7678 11.7678C16.2989 12.2366 15.663 12.5 15 12.5C14.337 12.5 13.7011 12.2366 13.2322 11.7678C12.7634 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.7634 8.70107 13.2322 8.23223C13.7011 7.76339 14.337 7.5 15 7.5C15.663 7.5 16.2989 7.76339 16.7678 8.23223C17.2366 8.70107 17.5 9.33696 17.5 10ZM13.5383 15.9717C13.5967 15.9058 13.6783 15.8525 13.9142 15.83C14.0677 15.8176 14.2219 15.8142 14.3758 15.82L14.5442 15.8242C14.6858 15.8283 14.8467 15.8333 15 15.8333C15.1533 15.8333 15.3142 15.8283 15.4558 15.825L15.6242 15.82C15.7781 15.814 15.9323 15.8171 16.0858 15.8292C16.3217 15.8525 16.4025 15.9058 16.4617 15.9717L17.705 14.8617C17.2675 14.3717 16.7217 14.2167 16.2483 14.17C15.9617 14.1425 15.6067 14.1525 15.315 14.16C15.1967 14.1633 15.0883 14.1667 15 14.1667C14.9117 14.1667 14.8033 14.1633 14.685 14.16C14.3933 14.1517 14.0383 14.1433 13.7517 14.1708C13.2783 14.2167 12.7325 14.3717 12.295 14.8617L13.5383 15.9717Z"
                            fill="#0046FF"
                          />
                        </svg>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={`Total: ${item.total}`}
                      sx={{ color: "blue" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          name,
                          designation,
                          phonenumber,
                          avatarUrl,
                        } = row;
                        return (
                          <TableRow hover key={id}>
                            <TableCell component="th" scope="row" padding="2">
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{designation}</TableCell>

                            <TableCell align="left">{phonenumber}</TableCell>

                            <TableCell align="left">
                              <IconButton
                                size="large"
                                sx={{ backgroundColor: "blue" }}
                              >
                                <Iconify icon={"eva:edit-fill"} color="#fff" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={employees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
