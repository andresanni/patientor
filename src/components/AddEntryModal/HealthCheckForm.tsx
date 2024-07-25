import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import { EntryWithoutId, Entry, HealthCheckRating } from "../../types";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type HealthCheckFormProps = {
  onClose: () => void;
  patientId: string;
  handleAddEntry: (entry: Entry) => void;
};

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const HealthCheckForm = (props: HealthCheckFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodeInput, setDiagnosisCodeInput] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [specialistError, setSpecialistError] = useState(false);

  const navigate = useNavigate();

  const healthCheckRatingOptions: RatingOption[] = Object.keys(
    HealthCheckRating
  )
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    })); //?

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!description) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
    }

    if(!specialist){
      setSpecialistError(true);
      return;
    }
    else{
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
      healthCheckRating,
      type: "HealthCheck",
    } as EntryWithoutId;

    if (diagnosisCodesArray.length > 0) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: diagnosisCodesArray,
      };
    }

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

  const onRatingChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as number;
    setHealthCheckRating(value as HealthCheckRating);
  };

  return (
    <div>
      <div>
        <form onSubmit={addEntry}>
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
            error= {specialistError}
            helperText = {specialistError ? "Specialist is required" : ""}
          />
          <TextField
            label="Códigos de Diagnóstico"
            value={diagnosisCodeInput}
            onChange={({ target }) => setDiagnosisCodeInput(target.value)}
            placeholder="Ingrese códigos de diagnóstico separados por comas"
            fullWidth
          />
          <Select
            label="Health Rating"
            fullWidth
            value={healthCheckRating}
            onChange={onRatingChange}
          >
            {healthCheckRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={props.onClose}
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
      </div>
    </div>
  );
};

export default HealthCheckForm;
