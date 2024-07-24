import CodeDetail from "./CodeDetail";

type CodeListProps = {
    diagnosisCodes: Array<string>
};

export const CodeList = (props: CodeListProps)=>{
    return(
        <>
            <p>Diagnosis Codes:</p>
            <ul>
            {props.diagnosisCodes.map((code) => (             
              <li key={ code }>
                <div>
                <p>Code: { code }</p>
                <p>Description: <CodeDetail code={code}/></p>
                
                </div>
              </li>
            ))}
            </ul>
          </>
    );
};

export default CodeList;