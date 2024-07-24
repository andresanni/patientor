import { HealthCheckEntry } from "../../types";

type HealthCheckEntryDetailsProps = {
  entry: HealthCheckEntry;
};

const HealthCheckEntryDetails = (props: HealthCheckEntryDetailsProps) => {
  const { entry } = props;

  return (
    <div>
      <h5>Health Check Entry</h5>
      <div>
        <p>Date: {entry.date}</p>
        <p>Specialist: {entry.specialist}</p>
        <p>Description: {entry.description}</p>
        <p>Health Check Rating: {entry.healthCheckRating}</p>
      </div>
    </div>
  );
};

export default HealthCheckEntryDetails;
