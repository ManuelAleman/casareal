
import { Button, Navbar, Avatar, Dropdown } from "flowbite-react";
import logo from "../../assets/logo.png";
import fotoPerfil from "../../assets/perfil.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../utils/constants";
import { useUser } from "../../utils/UserContext";

export function Barra() {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('authentication-token');
    setUser(null);
    navigate('/');
  }

  return (
    <Navbar fluid rounded>
      <NavLink to="/">
        <img src={logo} className="ml-5 h-6 sm:h-9" alt="CasaReal Logo" />

      </NavLink>
      <div className="flex md:order-2">
        {
          user ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img={fotoPerfil} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.nombre}</span>
                  <span className="block truncate text-sm font-medium">{user.correo}</span>
                </Dropdown.Header>
                <Dropdown.Item as={NavLink} to="/perfil">Mi perfil</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/publicar">Publicar propiedad</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/citas">Ver mis citas</Dropdown.Item>
                <Dropdown.Divider />
                {
                  user.tipo === 'admin' && (
                    <>
                      <Dropdown.Item as={NavLink} to="/admin/autorizar">Autorizar publicaciones</Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/admin/asignar">Asignar vendedores</Dropdown.Item>
                    </>
                  )
                }

                {
                  user.tipo === 'vendedor' && (
                    <>
                      <Dropdown.Item as={NavLink} to="/vendedor/propiedades">Mis propiedades asignadas</Dropdown.Item>
                    </>
                  )
                }

                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <Button as={NavLink} to="/login" color="blue">
              Iniciar Sesión
            </Button>
          )
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={NavLink} to="/" className="md:font-bold md:text-lg">
          Inicio
        </Navbar.Link>
        <Navbar.Link as={NavLink} className="md:font-bold md:text-lg" to="/propiedades">Propiedades</Navbar.Link>
        <Navbar.Link as={NavLink} className="md:font-bold md:text-lg" to="/mapa">Mapa</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
