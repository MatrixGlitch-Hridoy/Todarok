import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeslice";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ open, handleClose }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Card sx={style}>
            <Typography variant="h3" gutterBottom color={"primary.main"}>
              Add Employee
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <TextField
                      variant="outlined"
                      placeholder="Name"
                      {...register("name")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <TextField
                      variant="outlined"
                      placeholder="Id"
                      {...register("id")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      defaultValue={"manager"}
                      {...register("designation")}
                    >
                      <MenuItem value={"manager"}>Manager</MenuItem>
                      <MenuItem value={"hr"}>HR</MenuItem>
                      <MenuItem value={"accountant"}>Accountant</MenuItem>
                      <MenuItem value={"cleaner"}>Cleaner</MenuItem>
                      <MenuItem value={"security"}>Security Guard</MenuItem>
                      <MenuItem value={"stuff"}>Stuff</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <TextField
                      variant="outlined"
                      placeholder="Phone Number"
                      {...register("phonenumber")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}
