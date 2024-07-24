import { OccupationalHealthCareEntry } from "../../types";
import CodeList from "./CodeList";

type OccupationalEntryDetailsProps = {
  entry: OccupationalHealthCareEntry;
};

const OccupationalEntryDetails = (props: OccupationalEntryDetailsProps) => {
  const { entry } = props;

  return (
    <div>
      <h5>Occupational Entry</h5>
      <div>
        <p>Date: {entry.date}</p>
        <p>Specialist: {entry.specialist}</p>
        <p>Description: {entry.description}</p>
        <p>Employer Name: {entry.employerName}</p>
        {entry.diagnosisCodes && (
          <CodeList diagnosisCodes={entry.diagnosisCodes}/>          
        )}
      </div>
    </div>
  );
};

export default OccupationalEntryDetails;
