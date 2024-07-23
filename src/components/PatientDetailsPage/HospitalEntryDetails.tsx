import { HospitalEntry } from "../../types";

type HospitalEntryDetailsProps = {
  entry: HospitalEntry;
};

const HospitalEntryDetails = (props: HospitalEntryDetailsProps) => {
  const { entry } = props;

  return (
    <div>
      <h6>Hospital Entry</h6>
      <div>
        <p>Date: {entry.date}</p>
        <p>Specialist: {entry.specialist}</p>
        <p>Description: {entry.description}</p>
        <p>Discharge :</p> 
        <p>Date: {entry.discharge.date}</p>
        <p>Criteria: {entry.discharge.criteria}</p>
      </div>
    </div>
  );
};

export default HospitalEntryDetails;