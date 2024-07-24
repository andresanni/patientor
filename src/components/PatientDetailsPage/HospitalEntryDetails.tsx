import { HospitalEntry } from "../../types";
import CodeList from "./CodeList";

type HospitalEntryDetailsProps = {
  entry: HospitalEntry;
};

const HospitalEntryDetails = (props: HospitalEntryDetailsProps) => {
  const { entry } = props;

  return (
    <div>
      <h5>Hospital Entry</h5>
      <div>
        <p>Date: {entry.date}</p>
        <p>Specialist: {entry.specialist}</p>
        <p>Description: {entry.description}</p>
        <p>Discharge :</p> 
        <p>Date: {entry.discharge.date}</p>
        <p>Criteria: {entry.discharge.criteria}</p>
        {entry.diagnosisCodes && (
          <CodeList diagnosisCodes={entry.diagnosisCodes}/>          
        )}
      </div>
    </div>
  );
};

export default HospitalEntryDetails;