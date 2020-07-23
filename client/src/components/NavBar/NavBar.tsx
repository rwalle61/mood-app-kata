import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { pageTitles } from '../../types/index';

type NavLinkProps = {
  pageTitle: string;
  setPage: (pageTitle: string) => void;
};

const NavLink: React.FC<NavLinkProps> = ({ pageTitle, setPage }) => (
  <Nav.Link
    href={`#${pageTitle}`}
    eventKey={pageTitle}
    onSelect={() => setPage(pageTitle)}
  >
    {pageTitle}
  </Nav.Link>
);

type NavBarProps = {
  page: string;
  setPage: (pageTitle: string) => void;
};

const NavBar: React.FC<NavBarProps> = ({ page, setPage }) => (
  <Navbar bg='light'>
    <Nav variant='pills' className='mr-auto' activeKey={page}>
      <NavLink pageTitle={pageTitles.CHECK_IN} setPage={setPage} />
      <NavLink pageTitle={pageTitles.MOOD_INSIGHTS} setPage={setPage} />
    </Nav>
  </Navbar>
);

export default NavBar;
