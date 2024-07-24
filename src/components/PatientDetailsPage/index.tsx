import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import EntriesList from "./EntriesList";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id as string);
        setPatient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatient();
  }, [id]);



  return (
    <div>
      {patient && (
        <>
          <h3>{patient.name}</h3>
          <p>ssh: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <EntriesList patientId = {patient.id}entries={patient.entries} />
        </>
      )}
    </div>
  );
};

export default PatientDetail;
