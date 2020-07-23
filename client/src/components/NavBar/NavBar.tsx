import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { pageTitles } from '../../types/index';
import { CheckIns } from '../../types/checkin';

type NavItemProps = {
  pageTitle: string;
  setPage: (pageTitle: string) => void;
  disabled: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ pageTitle, setPage, disabled }) => (
  <Nav.Item>
    <Nav.Link
      href={`#${pageTitle}`}
      eventKey={pageTitle}
      onSelect={() => setPage(pageTitle)}
      disabled={disabled}
    >
      <h4>{pageTitle}</h4>
    </Nav.Link>
  </Nav.Item>
);

type NavBarProps = {
  setPage: (pageTitle: string) => void;
  checkIns: CheckIns;
};

const NavBar: React.FC<NavBarProps> = ({ setPage, checkIns }) => (
  <Nav
    justify
    className='justify-content-center'
    variant='pills'
    defaultActiveKey={pageTitles.CHECK_IN}
  >
    <NavItem
      pageTitle={pageTitles.CHECK_IN}
      setPage={setPage}
      disabled={false}
    />
    <NavItem
      pageTitle={pageTitles.MOOD_INSIGHTS}
      setPage={setPage}
      disabled={!checkIns.length}
    />
  </Nav>
);

export default NavBar;
