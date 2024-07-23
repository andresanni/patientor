import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getByCode = async (code:string): Promise<Diagnosis> => {
    const response = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
    return response.data;
};

export default { getByCode };




