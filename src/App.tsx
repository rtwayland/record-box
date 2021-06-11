import { useEffect, useContext } from 'react';
import { getRecords } from './api';
import { SET_NEXT_PAGE, SET_RECORDS } from './constants';
import { store } from './store';
import Nav from './components/Nav';
import Records from './components/RecordList';
import { Record } from './types';

const App = () => {
  const [{ records, nextPage }, dispatch] = useContext(store);
  const getSyncedNewRecords = (
    originalRecords: Record[],
    newRecords: Record[]
  ) => {
    const names: { [key: number]: string } = {};
    originalRecords.forEach(
      (record: Record) => (names[record.artist.id] = record.artist.name)
    );
    const updatedNewRecords = newRecords.map((record: Record) => {
      const name = names[record.artist.id] || record.artist.name;
      return {
        ...record,
        artist: { ...record.artist, name },
      };
    });

    return updatedNewRecords;
  };
  const loadMoreRecords = async () => {
    if (nextPage) {
      const { results: recs, nextPage: next } = await getRecords(nextPage);
      const syncedRecords = getSyncedNewRecords(records, recs);
      dispatch({ type: SET_RECORDS, payload: [...records, ...syncedRecords] });
      dispatch({ type: SET_NEXT_PAGE, payload: next });
    }
  };

  useEffect(() => {
    const setRecords = async () => {
      const { results: recs, nextPage: next } = await getRecords();
      dispatch({ type: SET_RECORDS, payload: recs });
      dispatch({ type: SET_NEXT_PAGE, payload: next });
    };

    if (!records?.length) setRecords();
  }, [records, dispatch]);

  return (
    <div>
      <Nav />
      <h1>Records</h1>
      <Records loadMoreRecords={loadMoreRecords} />
    </div>
  );
};

export default App;
