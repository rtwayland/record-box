import axios from 'axios';
import { v4 as uuid } from 'uuid';
import randomHex from 'random-hex-color';
import { Record } from './types';

const initialDataUrl =
  'https://gist.githubusercontent.com/seanders/df38a92ffc4e8c56962e51b6e96e188f/raw/b032669142b7b57ede3496dffee5b7c16b8071e1/page1.json';

export const getRecords = async (url?: string | null) => {
  const { data } = await axios.get(url || initialDataUrl);
  const results = data.results.map((record: Record) => ({
    ...record,
    id: uuid(),
    albumColor: randomHex(),
  }));
  const recordRes = { ...data, results };
  return recordRes;
};
