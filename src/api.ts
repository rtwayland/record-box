import { INITIAL_DATA_URL } from './constants';
import randomColor from './utils/randomColor';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Record } from './types';

export const getRecords = async (url?: string | null) => {
  const { data } = await axios.get(url || INITIAL_DATA_URL);
  const results = data.results.map((record: Record) => {
    return {
      ...record,
      id: uuid(),
      albumColor: randomColor(),
    };
  });
  const recordRes = { ...data, results };
  return recordRes;
};
