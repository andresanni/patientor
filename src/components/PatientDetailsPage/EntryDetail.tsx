import { Entry } from "../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalEntryDetails from "./OccupationalEntryDetails";

type EntryDetailProps = {
    entry : Entry
};

const EntryDetail = (props: EntryDetailProps) =>{
    
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
    
    const { entry } = props;
    
    switch(entry.type){
        case "HealthCheck" : return <HealthCheckEntryDetails entry={ entry } />;
        case "OccupationalHealthcare": return <OccupationalEntryDetails entry={ entry } />;
        case "Hospital": return <HospitalEntryDetails entry={entry} />;
        default: return assertNever(entry);
    }
    
};

export default EntryDetail;