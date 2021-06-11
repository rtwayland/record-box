import { useEffect, useContext } from 'react';
import { getRecords } from './api';
import { SET_NEXT_PAGE, SET_RECORDS } from './constants';
import { store } from './store';
import Nav from './components/Nav';
import Records from './components/RecordList';

const App = () => {
  const [{ records, nextPage }, dispatch] = useContext(store);
  const loadMoreRecords = async () => {
    if (nextPage) {
      const { results: recs, nextPage: next } = await getRecords(nextPage);
      dispatch({ type: SET_RECORDS, payload: [...records, ...recs] });
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
