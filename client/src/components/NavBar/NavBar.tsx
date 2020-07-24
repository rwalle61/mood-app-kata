import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { CheckIns, PageTitle } from '../../types';

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
    defaultActiveKey={PageTitle.CheckIn}
  >
    <NavItem pageTitle={PageTitle.CheckIn} setPage={setPage} disabled={false} />
    <NavItem
      pageTitle={PageTitle.Insights}
      setPage={setPage}
      disabled={!checkIns.length}
    />
  </Nav>
);

export default NavBar;
