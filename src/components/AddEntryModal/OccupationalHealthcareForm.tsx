import { Entry } from "../../types";

type OccupationalHealthcareFormProps = {
    onClose : ()=>void,
    patientId:string,
    handleAddEntry: (entry: Entry) => void;
};

const OccupationalHealthcareForm = (props: OccupationalHealthcareFormProps) => {
    props.onClose();
    return(<div></div>);
};

export default OccupationalHealthcareForm;
