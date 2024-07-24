import { Menu, MenuItem } from "@mui/material";

type SelectEntryToAddMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleMenuItemClick: (arg: string) => void;
};

const SelectEntryToAddMenu = (porps: SelectEntryToAddMenuProps) => {
  return (
    <Menu
      anchorEl={porps.anchorEl}
      open={Boolean(porps.anchorEl)}
      onClose={porps.handleClose}
    >
      <MenuItem onClick={() => porps.handleMenuItemClick("HealthCheck")}>
        Health Check
      </MenuItem>
      <MenuItem
        onClick={() => porps.handleMenuItemClick("OccupationalHealthcare")}
      >
        Occupational Healthcare
      </MenuItem>
      <MenuItem onClick={() => porps.handleMenuItemClick("Hospital")}>
        Hospital
      </MenuItem>
    </Menu>
  );
};

export default SelectEntryToAddMenu;
