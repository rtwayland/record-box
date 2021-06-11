import { useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { getRecords } from './api';
import { SET_NEXT_PAGE, SET_RECORDS } from './constants';
import { store } from './store';
import Nav from './components/Nav';
import Records from './components/RecordList';
import Record from './components/Record';
import { Record as RecordType } from './types';

const App = () => {
  const [{ records, nextPage, showAddRecord }, dispatch] = useContext(store);
  const getSyncedNewRecords = (
    originalRecords: RecordType[],
    newRecords: RecordType[]
  ) => {
    const names: { [key: string]: string } = {};
    originalRecords.forEach(
      (record: RecordType) => (names[record.artist.id] = record.artist.name)
    );
    const updatedNewRecords = newRecords.map((record: RecordType) => {
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
      <Container>
        <h1>Records</h1>
        <Records loadMoreRecords={loadMoreRecords} />
      </Container>
      {showAddRecord && <Record modal />}
    </div>
  );
};

const Container = styled.div({
  margin: '0 auto',
  padding: 24,
  boxSizing: 'border-box',
  maxWidth: 1450,
  overflow: 'auto',
  height: 'calc(100vh - 80px)',
});

export default App;
