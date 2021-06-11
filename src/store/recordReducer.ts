import {
  SET_RECORDS,
  SET_NEXT_PAGE,
  SET_SEARCH_VALUE,
  DELETE_RECORD,
} from './../constants';
import { Record } from '../types';
import { UPDATE_RECORD } from '../constants';

export type RecordState = {
  searchValue: string;
  records: Record[];
  nextPage: string | null;
};

export type Action = {
  type: string;
  payload: any;
};

export const initialState: RecordState = {
  searchValue: '',
  records: [],
  nextPage: null,
};

const recordReducer = (state = initialState, action: Action): RecordState => {
  const { payload, type } = action;
  switch (type) {
    case SET_RECORDS:
      return { ...state, records: payload };
    case SET_NEXT_PAGE:
      return { ...state, nextPage: payload };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: payload };
    case UPDATE_RECORD: {
      const recordToUpdate = state.records.find(
        (record) => record.id === payload.id
      );
      const updateAllArtists =
        recordToUpdate?.artist.name !== payload.artist.name;
      const newRecords = state.records.map((record) => {
        if (record.id === payload.id) return payload;
        else if (updateAllArtists && record.artist.id === payload.artist.id) {
          const newRecord = {
            ...record,
            artist: {
              ...record.artist,
              name: payload.artist.name,
            },
          };
          return newRecord;
        }
        return record;
      });
      return { ...state, records: newRecords };
    }
    case DELETE_RECORD: {
      const newRecords = state.records.filter(
        (record) => record.id !== payload.id
      );
      return { ...state, records: newRecords };
    }
    default:
      return state;
  }
};

export default recordReducer;
