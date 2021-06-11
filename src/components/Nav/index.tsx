import styled from '@emotion/styled';
import { useContext } from 'react';
import { SHOW_ADD_RECORD } from '../../constants';
import { store } from '../../store';
import Search from './Search';

const Nav = () => {
  const [, dispatch] = useContext(store);
  const showAddRecord = () => {
    dispatch({ type: SHOW_ADD_RECORD, payload: true });
  };

  return (
    <NavBar>
      <Logo>Record Box</Logo>
      <Search />
      {/* <Right>
      </Right> */}
      <button onClick={showAddRecord}>Add +</button>
    </NavBar>
  );
};

const NavBar = styled.header({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  width: '100%',
  height: 55,
  backgroundColor: '#fafafa',
  boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.05)',
  boxSizing: 'border-box',
  zIndex: 1,
});

const Logo = styled.div({
  fontSize: 24,
  cursor: 'pointer',
});

export default Nav;
