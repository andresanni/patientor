import { Button } from "@mui/material";
import { Entry } from "../../types";
import EntryDetail from "./EntryDetail";

type EntriesListProps = {
  entries: Array<Entry>;
};

const EntriesList = (props: EntriesListProps) => {
  const { entries } = props;

  return (
    <div>
      <div>
        <h4>Entries</h4>
        <Button variant="contained" color="primary">Add new</Button>
        {entries.map((entry) => (
          <div style={{border:"1px solid"}} key= {entry.id}>
            <EntryDetail entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntriesList;
