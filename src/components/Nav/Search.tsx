import styled from '@emotion/styled';
import { ChangeEvent, useContext } from 'react';
import { SET_SEARCH_VALUE } from '../../constants';
import { store } from '../../store';

const Search = () => {
  const [{ searchValue }, dispatch] = useContext(store);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SEARCH_VALUE, payload: event.target.value });
  };

  return (
    <Input
      value={searchValue}
      placeholder="Search..."
      onChange={handleChange}
    />
  );
};

const Input = styled.input({
  height: 32,
  fontSize: 18,
  paddingLeft: 8,
});

export default Search;
