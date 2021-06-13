import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import { MdDelete, MdEdit } from 'react-icons/md';
import { lighten } from 'polished';
import randomColor from '../utils/randomColor';
import { Record as RecordType } from '../types';
import { store } from '../store';
import {
  ADD_RECORD,
  DELETE_RECORD,
  SET_SEARCH_VALUE,
  SHOW_ADD_RECORD,
  UPDATE_RECORD,
} from '../constants';
import Vinyl from './Vinyl';
import Button from './Button';

const Record = ({
  record,
  color,
  modal,
}: {
  record?: RecordType;
  color?: string;
  modal?: boolean;
}) => {
  const [{ showAddRecord }, dispatch] = useContext(store);
  const [isEditing, setIsEditing] = useState<boolean | undefined>(modal);
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
        albumColor: randomColor(),
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
  const enableSlide = !!isEditing && !modal;

  return (
    <RecordOverlay show={!!modal}>
      <RecordWrapper>
        <RecordContainer
          color={color || ''}
          modal={!!modal}
          enableSlide={enableSlide}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {(showControls || isEditing) && (
            <Buttons>
              {!isEditing && (
                <>
                  <Button
                    onClick={handleDelete}
                    title="Delete"
                    margin="0 4px 0 0"
                  >
                    <MdDelete size={30} />
                  </Button>
                  <Button onClick={() => setIsEditing(true)} title="Edit">
                    <MdEdit size={30} />
                  </Button>
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
                  <Button padding="4px 0" onClick={handleCancel} title="Cancel">
                    {/* <MdCancel size={30} /> */}
                    Cancel
                  </Button>
                  <Button padding="4px 0" onClick={handleSave} title="Save">
                    {/* <MdSave size={30} /> */}
                    Save
                  </Button>
                </FormButtons>
              </Inputs>
            )}
          </AlbumContents>
        </RecordContainer>
        {!modal && (
          <Vinyl slide={isEditing} color={color} name={record?.artist.name} />
        )}
      </RecordWrapper>
    </RecordOverlay>
  );
};

const RecordWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const RecordContainer = styled.div<{
  color?: string;
  modal?: boolean;
  enableSlide?: boolean;
}>(
  ({ enableSlide }) => ({
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
    boxSizing: 'border-box',
    zIndex: enableSlide ? 3 : 1,
  }),
  ({ modal }) =>
    modal && {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
  ({ color }) => {
    if (color) {
      const lightened = lighten(0.1, color);
      return {
        background: `linear-gradient(45deg, ${color} 10%, ${lightened} 100%)`,
      };
    }
  }
);

const AlbumContents = styled.div({
  width: 250,
  height: 250,
});

const RecordDetails = styled.div({
  border: '1px solid #fafafa',
  color: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: 8,
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
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
  top: 4,
  right: 4,
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
  color: '#fafafa',
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
