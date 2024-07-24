import { TextField, Grid, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import { EntryWithoutId, Entry, HealthCheckRating } from "../../types";
import { useNavigate } from "react-router-dom";

type HealthCheckFormProps = {
  onClose: () => void;
  patientId: string;
  handleAddEntry: (entry: Entry) => void;
};

interface RatingOption{
  value: HealthCheckRating,
  label: string
}

const HealthCheckForm = (props: HealthCheckFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const navigate = useNavigate();

  const healthCheckRatingOptions:RatingOption[] = Object.keys(HealthCheckRating)
  .filter(key => isNaN(Number(key))) 
  .map(key => ({
    label: key,
    value: HealthCheckRating[key as keyof typeof HealthCheckRating]
  }));

  console.log(healthCheckRatingOptions);


  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck",
    } as unknown as EntryWithoutId;
    try {
      const addedEnty = await patientService.addEntry(
        props.patientId,
        newEntry
      );
      console.log(addedEnty);
      props.handleAddEntry(addedEnty);
      navigate(`/patients/${props.patientId}`);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onRatingChange =(event: SelectChangeEvent<unknown>)=>{
       const value = event.target.value as number;
       setHealthCheckRating(value as HealthCheckRating);     
       console.log(healthCheckRating); 
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
          />
          <TextField
            label="Date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />

          <Select
          label="Health Rating"
          fullWidth
          value={healthCheckRating}
          onChange={onRatingChange}
        >
        {healthCheckRatingOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
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
