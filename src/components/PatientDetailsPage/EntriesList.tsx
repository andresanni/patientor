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
        {entries.map((entry) => (
          <EntryDetail entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default EntriesList;
