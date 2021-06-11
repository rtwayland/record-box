import { useContext } from 'react';
import { Waypoint } from 'react-waypoint';
import { store } from '../store';
import Record from './Record';

const RecordList = ({ loadMoreRecords }: { loadMoreRecords: () => void }) => {
  const [{ records, searchValue }] = useContext(store);
  const recordList = searchValue
    ? records.filter((record) => {
        const searchString =
          `${record.album_title} ${record.artist.name}`.toLowerCase();
        return searchString.includes(searchValue.toLowerCase());
      })
    : records;

  return (
    <div>
      {recordList.map((record) => (
        <Record key={record.id} color={record.albumColor} record={record} />
      ))}
      <Waypoint onEnter={loadMoreRecords} />
    </div>
  );
};

export default RecordList;
