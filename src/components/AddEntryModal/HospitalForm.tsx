import { Entry, EntryWithoutId } from "../../types";
import BaseForm from "./BaseForm";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, FormLabel } from "@mui/material";
import patientService from "../../services/patients";
import { useNavigate } from "react-router-dom";

type HospitalFormProps = {
  onClose: () => void;
  patientId: string;
  handleAddEntry: (entry: Entry) => void;
};

const HospitalForm = (props: HospitalFormProps) => {
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [dischargeError, setDischargeError] = useState<boolean>(false);
  const navigate = useNavigate();

  const addEntry = async (entry: EntryWithoutId) => {
    if (!dischargeCriteria) {
      setDischargeError(true);
      return;
    } else {
      setDischargeError(false);
    }
    const newEntry = {
      ...entry,
      type: "Hospital" as const,
      discharge: {
        date: dischargeDate ? dischargeDate.format("YYYY-MM-DD") : "",
        criteria: dischargeCriteria,
      },
    };
    try {
      const addedEntry = await patientService.addEntry(
        props.patientId,
        newEntry
      );
      props.handleAddEntry(addedEntry);
      navigate(`/patients/${props.patientId}`);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseForm
      handleAddEntry={props.handleAddEntry}
      onClose={props.onClose}
      onSubmit={addEntry}
    >
      <FormLabel>Discharge: </FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={dischargeDate}
          onChange={(newValue) => setDischargeDate(newValue)}
          slotProps={{
            textField: { fullWidth: true },
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        error={dischargeError}
        helperText={dischargeError ? "Criteria is required" : ""}
      />
    </BaseForm>
  );
};

export default HospitalForm;
