
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Menubar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('access-token');
    navigate('/');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <NavLink to="/dashboard" className="nav-item nav-link">Quizzes</NavLink>
          <NavLink to="/ranking" className="nav-item nav-link">Ranking</NavLink>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button variant="link" className="nav-item nav-link" onClick={logout}>Sair</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menubar;
