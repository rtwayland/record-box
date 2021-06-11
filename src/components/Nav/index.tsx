import styled from '@emotion/styled';
import { useContext } from 'react';
import { MdAddCircle } from 'react-icons/md';
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
      <button onClick={showAddRecord} title="Add">
        <MdAddCircle size={30} />
      </button>
    </NavBar>
  );
};

const NavBar = styled.header({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: 'auto 1fr auto',
  columnGap: 24,
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
