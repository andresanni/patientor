import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Entry } from "../../types";
import EntryDetail from "./EntryDetail";
import HealthCheckForm from "../AddEntryModal/HealthCheckForm";
import OccupationalHealthcareForm from "../AddEntryModal/OccupationalHealthcareForm";
import HospitalForm from "../AddEntryModal/HospitalForm";

type EntriesListProps = {
  entries: Array<Entry>;
  patientId: string;
};

const EntriesList = (props: EntriesListProps) => {
  const { entries } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedEntryType, setSelectedEntryType] = useState<string>("");
  const [entriesState, setEntriesState] = useState(entries);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type: string) => {
    setSelectedEntryType(type);
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddEntry = (newEntry: Entry) => {
    setEntriesState([...entriesState, newEntry]);
  };
  return (
    <div>
      <div>
        <h4>Entries</h4>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add new
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick("HealthCheck")}>
            Health Check
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("OccupationalHealthcare")}
          >
            Occupational Healthcare
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("Hospital")}>
            Hospital
          </MenuItem>
        </Menu>
        
        {entriesState.map((entry) => (
          <div style={{ border: "1px solid" }} key={entry.id}>
            <EntryDetail entry={ entry } />
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>
          {selectedEntryType === "HealthCheck" && (
            <HealthCheckForm
              patientId={props.patientId}
              onClose={handleDialogClose}
              handleAddEntry={handleAddEntry}
            />
          )}
          {selectedEntryType === "OccupationalHealthcare" && (
            <OccupationalHealthcareForm
              patientId={props.patientId}
              onClose={handleDialogClose}
              handleAddEntry={handleAddEntry}
            />
          )}
          {selectedEntryType === "Hospital" && (
            <HospitalForm
              patientId={props.patientId}
              onClose={handleDialogClose}
              handleAddEntry={handleAddEntry}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EntriesList;
