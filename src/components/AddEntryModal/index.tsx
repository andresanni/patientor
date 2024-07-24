import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import { Entry } from "../../types";

type AddEntryModalProps = {
  openDialog: boolean;
  handleDialogClose: () => void;
  selectedEntryType: string;
  patientId: string;
  handleAddEntry: (entry: Entry) => void;
};

const AddEntryModal = (props: AddEntryModalProps) => {
  return (
    <Dialog open={props.openDialog} onClose={props.handleDialogClose}>
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        {props.selectedEntryType === "HealthCheck" && (
          <HealthCheckForm
            patientId={props.patientId}
            onClose={props.handleDialogClose}
            handleAddEntry={props.handleAddEntry}
          />
        )}
        {props.selectedEntryType === "OccupationalHealthcare" && (
          <OccupationalHealthcareForm
            patientId={props.patientId}
            onClose={props.handleDialogClose}
            handleAddEntry={props.handleAddEntry}
          />
        )}
        {props.selectedEntryType === "Hospital" && (
          <HospitalForm
            patientId={props.patientId}
            onClose={props.handleDialogClose}
            handleAddEntry={props.handleAddEntry}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
