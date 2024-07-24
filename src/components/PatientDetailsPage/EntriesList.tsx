import React, { useState } from "react";
import { Button } from "@mui/material";
import { Entry } from "../../types";
import EntryDetail from "./EntryDetail";
import AddEntryModal from "../AddEntryModal";
import SelectEntryToAddMenu from "../AddEntryModal/SelectEntryToAddMenu";

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

        <SelectEntryToAddMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleMenuItemClick={handleMenuItemClick}
        />

        {entriesState.map((entry) => (
          <div style={{ border: "1px solid" }} key={entry.id}>
            <EntryDetail entry={entry} />
          </div>
        ))}
      </div>

      <AddEntryModal
        openDialog={openDialog}
        selectedEntryType={selectedEntryType}
        patientId={props.patientId}
        handleDialogClose={handleDialogClose}
        handleAddEntry={handleAddEntry}
      />
    </div>
  );
};

export default EntriesList;
