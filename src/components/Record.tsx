import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Record as RecordType } from '../types';
import { store } from '../store';
import { DELETE_RECORD, UPDATE_RECORD } from '../constants';
// import randomHex from 'random-hex-color';

const Record = ({ record, color }: { record: RecordType; color: string }) => {
  // const hex = randomHex();
  // const bgColor = hex.replace('#', '');
  // const density = 50;
  // const opacity = 100;
  // const background = `http://api.thumbr.it/whitenoise-370x370.png?background=${bgColor}ff&noise=626262&density=${density}&opacity=${opacity}`;
  const [, dispatch] = useContext(store);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(record.album_title);
  const [artist, setArtist] = useState(record.artist.name);
  const [year, setYear] = useState(record.year);
  const [condition, setCondition] = useState(record.condition);

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(record.album_title);
    setArtist(record.artist.name);
    setYear(record.year);
    setCondition(record.condition);
  };

  const handleSave = () => {
    const newRecord = {
      ...record,
      album_title: title,
      artist: {
        ...record.artist,
        name: artist,
      },
      year,
      condition,
    };
    setIsEditing(false);
    dispatch({ type: UPDATE_RECORD, payload: newRecord });
  };

  const handleDelete = () => {
    dispatch({ type: DELETE_RECORD, payload: record });
  };

  return (
    <RecordContainer url={color}>
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
      {!isEditing ? (
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
  );
};

const RecordContainer = styled.div<{ url: string }>(({ url }) => ({
  width: 370,
  height: 370,
  border: '1px solid',
  borderRadius: 4,
  backgroundColor: url,
  position: 'relative',
  // backgroundImage: `url(${url})`,
  // backgroundUrl: url,
}));

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
