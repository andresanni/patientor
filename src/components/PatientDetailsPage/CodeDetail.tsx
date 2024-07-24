import { useEffect, useState } from "react";
import diagnoseService from "../../services/diagnoses";

type CodeDetailProps = {
  code: string;
};

const CodeDetail = (props: CodeDetailProps) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchName = async (code: string) => {
      try{
        const diagnose = await diagnoseService.getByCode(code);
        setName(diagnose.name);
      }
      catch(error){
        setName("Not valid code: " + props.code);
      }
    };
    fetchName(props.code);
  }, [props.code]);

  return <>{ name }</>;
};

export default CodeDetail;
