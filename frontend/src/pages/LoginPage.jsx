import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../utils/constants';
import { useUser } from '../utils/UserContext';

export function LoginPage() {

  useEffect(() => {
    if (localStorage.getItem('authentication-token')) {
      navigate('/perfil');
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { user, setUser } = useUser();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(URL_API + '/users/login', {
      email: formData.email,
      password: formData.password
    }).then((response) => {
      if (response.status === 200) {
        setErrors({});
        // Guardar token en localStorage
        localStorage.setItem('authentication-token', response.data.token);

        axios.get(URL_API + '/users', {
          headers: {
            'authentication-token': response.data.token
          }
        }).then((response) => {
          setUser(response.data);
          // Redirigir a la página de perfil
          navigate('/perfil');
        }).catch((error) => {
          console.error(error);
        });



      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
      setErrors({
        general: error.response.data.error
      });
    });


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-12"
            />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">INICIAR SESIÓN</h2>
        <p className="text-center mb-6">Entra para acceder a tu cuenta</p>
        <form noValidate onSubmit={handleSubmit}>
          {errors.general &&
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
              <span className="block sm:inline">{errors.general}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={
                  () => setErrors({
                    ...errors,
                    general: null
                  })
                } className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
              </span>
            </div>
          }
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electronico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ENTRAR
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}