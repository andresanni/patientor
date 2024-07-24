import { Entry } from "../../types";

type HospitalFormProps = {
    onClose : ()=>void,
    patientId:string,
    handleAddEntry: (entry: Entry) => void;
};

const HospitalForm = (props:HospitalFormProps)=>{
    props.onClose();
    return(<div></div>);
};

export default HospitalForm;
