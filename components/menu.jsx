import Link from "next/link";
import useUser, { USER_STATES } from "/hooks/useUser";
import { auth } from "/firebase/client";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {logo} from "/constant/logo"

export default function Menu() {
  const user = useUser();
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand>
        <Link href="/"><img src={logo} alt="Logo empresa" width="64" height="64" className="cursor-img"/></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {user === USER_STATES.NOT_LOGGED && (
          <Nav>
            <Nav.Link>
              <Link href="/login">Iniciar sesión</Link>
            </Nav.Link>
            <Nav.Link>
              <Link href="/singup">Registrarse</Link>
            </Nav.Link>
          </Nav>
        )}
        {user && (
          <Nav>
            <NavDropdown
              title={`Bienvenido ${user.displayName}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link href="/perfil">Mi perfil</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="/ofertas">Mis ofertas</Link>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  auth.signOut();
                }}
              >
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
      <style jsx>{`
              .cursor-img{
                cursor:pointer;
              }
        `}</style>
    </Navbar>

    
  );
}
