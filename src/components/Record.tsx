import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import randomHex from 'random-hex-color';
import { MdCancel, MdSave, MdDelete, MdEdit } from 'react-icons/md';
import { Record as RecordType } from '../types';
import { store } from '../store';
import {
  ADD_RECORD,
  DELETE_RECORD,
  SET_SEARCH_VALUE,
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
  const colors = ['#40383d', '#525252', '#323232', '#9F5344'];
  // const hex = randomHex();
  // const bgColor = hex.replace('#', '');
  // const density = 50;
  // const opacity = 100;
  // const background = `http://api.thumbr.it/whitenoise-370x370.png?background=${bgColor}ff&noise=626262&density=${density}&opacity=${opacity}`;
  const [{ showAddRecord }, dispatch] = useContext(store);
  const [isEditing, setIsEditing] = useState(modal || false);
  const [showControls, setShowControls] = useState(false);
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

  const handleArtistSearch = (name: string) => {
    dispatch({ type: SET_SEARCH_VALUE, payload: name });
  };

  return (
    <RecordOverlay show={!!modal}>
      <RecordContainer
        color={color || ''}
        modal={!!modal}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {(showControls || isEditing) && (
          <Buttons>
            {!isEditing && (
              <>
                <button onClick={handleDelete} title="Delete">
                  <MdDelete size={30} />
                </button>
                <button onClick={() => setIsEditing(true)} title="Edit">
                  <MdEdit size={30} />
                </button>
              </>
            )}
          </Buttons>
        )}
        <AlbumContents>
          {!isEditing && record ? (
            <RecordDetails>
              <Title>{record.album_title}</Title>
              <ArtistYear
                onClick={() => handleArtistSearch(record.artist.name)}
              >
                <Artist>{record.artist.name}</Artist> • {record.year}
              </ArtistYear>
              <Condition>Condition: {record.condition}</Condition>
            </RecordDetails>
          ) : (
            <Inputs>
              <Label>
                Album Title
                <Input
                  value={title}
                  placeholder="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </Label>
              <Label>
                Artist
                <Input
                  value={artist}
                  placeholder="Artist"
                  onChange={({ target }) => setArtist(target.value)}
                />
              </Label>
              <Label>
                Year
                <Input
                  value={year}
                  placeholder="Year"
                  onChange={({ target }) => setYear(+target.value)}
                />
              </Label>
              <Label>
                Condition
                <Input
                  value={condition}
                  placeholder="Condition"
                  onChange={({ target }) => setCondition(target.value)}
                />
              </Label>
              <FormButtons>
                <button onClick={handleCancel} title="Cancel">
                  {/* <MdCancel size={30} /> */}
                  Cancel
                </button>
                <button onClick={handleSave} title="Save">
                  {/* <MdSave size={30} /> */}
                  Save
                </button>
              </FormButtons>
            </Inputs>
          )}
        </AlbumContents>
      </RecordContainer>
    </RecordOverlay>
  );
};

const RecordContainer = styled.div<{ color?: string; modal?: boolean }>(
  ({ color }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 370,
    borderRadius: 4,
    background: 'linear-gradient(45deg, rgb(50,50,50) 10%, rgb(82,82,82) 100%)',
    position: 'relative',
    padding: 40,
    margin: 8,
    '@media (max-width: 500px)': {
      width: 245,
      height: 245,
    },
  }),
  ({ modal }) =>
    modal && {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    }
);

const AlbumContents = styled.div({
  width: 250,
  height: 250,
  '@media (max-width: 500px)': {
    width: 150,
    height: 150,
  },
});

const RecordDetails = styled.div({
  border: '1px solid #ddd',
  color: '#ddd',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: 8,
  width: '100%',
  height: '100%',
});

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

const Title = styled.div({ fontSize: 24, fontWeight: 'bold', marginBottom: 8 });

const ArtistYear = styled.div({
  fontSize: 18,
  marginBottom: 8,
});

const Artist = styled.span({
  cursor: 'pointer',
  textDecoration: 'underline',
});
const Condition = styled.div({ fontSize: 14 });

const Inputs = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
});

const Label = styled.label({
  display: 'flex',
  flexDirection: 'column',
  color: '#ddd',
});

const Input = styled.input({
  paddingLeft: 8,
  border: 'none',
  height: 24,
  borderRadius: 4,
  marginTop: 4,
  marginBottom: 8,
});

const FormButtons = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  columnGap: 8,
  marginTop: 16,
});

export default Record;
