import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import randomHex from 'random-hex-color';
import { Record as RecordType } from '../types';
import { store } from '../store';
import {
  ADD_RECORD,
  DELETE_RECORD,
  SHOW_ADD_RECORD,
  UPDATE_RECORD,
} from '../constants';

const Record = ({
  record,
  color,
  modal,
}: {
  record?: RecordType;
  color?: string;
  modal?: boolean;
}) => {
  // const hex = randomHex();
  // const bgColor = hex.replace('#', '');
  // const density = 50;
  // const opacity = 100;
  // const background = `http://api.thumbr.it/whitenoise-370x370.png?background=${bgColor}ff&noise=626262&density=${density}&opacity=${opacity}`;
  const [{ showAddRecord }, dispatch] = useContext(store);
  const [isEditing, setIsEditing] = useState(modal || false);
  const [title, setTitle] = useState(record?.album_title || '');
  const [artist, setArtist] = useState(record?.artist.name || '');
  const [year, setYear] = useState(record?.year || '');
  const [condition, setCondition] = useState(record?.condition || '');

  const reset = () => {
    setIsEditing(false);
    if (showAddRecord) dispatch({ type: SHOW_ADD_RECORD, payload: false });
  };

  const handleCancel = () => {
    reset();
    setTitle(record?.album_title || '');
    setArtist(record?.artist.name || '');
    setYear(record?.year || '');
    setCondition(record?.condition || '');
  };

  const handleSave = () => {
    if (record) {
      const updatedRecord: RecordType = {
        ...record,
        album_title: title,
        artist: {
          ...record?.artist,
          name: artist,
        },
        year: +year,
        condition,
      };
      dispatch({ type: UPDATE_RECORD, payload: updatedRecord });
    } else {
      const newRecord: RecordType = {
        id: uuid(),
        album_title: title,
        albumColor: randomHex(),
        artist: {
          id: uuid(),
          name: artist,
        },
        year: +year,
        condition,
      };
      dispatch({ type: ADD_RECORD, payload: newRecord });
    }
    reset();
  };

  const handleDelete = () => {
    dispatch({ type: DELETE_RECORD, payload: record });
  };

  return (
    <RecordOverlay show={!!modal}>
      <RecordContainer color={color || ''} modal={!!modal}>
        <Buttons>
          {isEditing ? (
            <>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </Buttons>
        {!isEditing && record ? (
          <>
            <Title>{record.album_title}</Title>
            <Artist>{record.artist.name}</Artist>
            <Year>{record.year}</Year>
            <Condition>{record.condition}</Condition>
          </>
        ) : (
          <>
            <input
              value={title}
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
            <input
              value={artist}
              placeholder="Artist"
              onChange={({ target }) => setArtist(target.value)}
            />
            <input
              value={year}
              placeholder="Year"
              onChange={({ target }) => setYear(+target.value)}
            />
            <input
              value={condition}
              placeholder="Condition"
              onChange={({ target }) => setCondition(target.value)}
            />
          </>
        )}
      </RecordContainer>
    </RecordOverlay>
  );
};

const RecordContainer = styled.div<{ color?: string; modal?: boolean }>(
  ({ color }) => ({
    width: 370,
    height: 370,
    border: '1px solid',
    borderRadius: 4,
    backgroundColor: color || '#222',
    position: 'relative',
    // backgroundImage: `url(${url})`,
    // backgroundUrl: url,
  }),
  ({ modal }) =>
    modal && {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }
);

const RecordOverlay = styled.div<{ show?: boolean }>(
  ({ show }) =>
    show && {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 100,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
);

const Buttons = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
});

const Title = styled.div({});
const Artist = styled.div({});
const Year = styled.div({});
const Condition = styled.div({});

export default Record;
