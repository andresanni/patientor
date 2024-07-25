import {
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import patientService from "../../services/patients";
import { EntryWithoutId, Entry, HealthCheckRating } from "../../types";
import { useNavigate } from "react-router-dom";
import BaseForm from "./BaseForm";

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
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const navigate = useNavigate();

  const healthCheckRatingOptions: RatingOption[] = Object.keys(
    HealthCheckRating
  )
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    })); //?

  const addEntry = async (entry: EntryWithoutId) => {    
    const newEntry = {...entry, healthCheckRating, type:"HealthCheck" as const};
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
        <BaseForm onSubmit={addEntry} onClose={props.onClose} handleAddEntry={props.handleAddEntry}>                  
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
        </BaseForm>
  );
};

export default HealthCheckForm;
