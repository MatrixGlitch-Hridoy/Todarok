import { styled, alpha } from "@mui/material/styles";
import { Toolbar, OutlinedInput, InputAdornment } from "@mui/material";

import Iconify from "../../../components/iconify";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  "&.Mui-focused": {
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.primary.dark)} !important`,
  },
  "& hover": {
    borderColor: `${alpha(theme.palette.primary.dark)} !important`,
  },
}));

export default function UserListToolbar({ filterName, onFilterName }) {
  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Enter Employee ID or Name"
        endAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
      />
    </StyledRoot>
  );
}
