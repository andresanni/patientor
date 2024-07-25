import { TextField, Grid, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, Entry } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type BaseFormProps = {
  onClose: () => void;
  handleAddEntry: (entry: Entry) => void;
  onSubmit: (entry: EntryWithoutId) => void;
  children?: React.ReactNode;
};

const BaseForm: React.FC<BaseFormProps> = ({ onClose, onSubmit, children }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodeInput, setDiagnosisCodeInput] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [specialistError, setSpecialistError] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!description) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
    }

    if (!specialist) {
      setSpecialistError(true);
      return;
    } else {
      setSpecialistError(false);
    }
    const diagnosisCodesArray: Array<string> = diagnosisCodeInput
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code !== "");

    let newEntry = {
      description,
      date: date ? date.format("YYYY-MM-DD") : "",
      specialist,
    } as EntryWithoutId;

    if (diagnosisCodesArray.length > 0) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: diagnosisCodesArray,
      };
    }
    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        error={descriptionError}
        helperText={descriptionError ? "Description is required" : ""}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{
            textField: { fullWidth: true },
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        error={specialistError}
        helperText={specialistError ? "Specialist is required" : ""}
      />
      <TextField
        label="Diagnosis Codes"
        value={diagnosisCodeInput}
        onChange={({ target }) => setDiagnosisCodeInput(target.value)}
        placeholder="Ingrese códigos de diagnóstico separados por comas"
        fullWidth
      />
      
      {children} 
      {/* Specific Form */}
      
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BaseForm;
