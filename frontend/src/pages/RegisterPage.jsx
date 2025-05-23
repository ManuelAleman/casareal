import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../utils/constants';

export const RegisterPage = () => {

  useEffect(() => {
    if (localStorage.getItem('authentication-token')) {
      navigate('/perfil');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
     if (!formData.name) {
    newErrors.name = 'El nombre es requerido';
  } else if (!formData.name.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
    newErrors.name = 'El nombre solo debe contener letras';
  }
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
    else if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = 'El teléfono no es válido';
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    else if (!formData.email.match("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (formData.email !== formData.repeatEmail) newErrors.repeatEmail = 'Los correos electrónicos no coinciden';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6 || formData.password.length > 30) newErrors.password = 'La contraseña debe tener al menos 6 caracteres y menos de 30 caracteres';
    if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = 'Las contraseñas no coinciden';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios.post(URL_API + '/users/register', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      }).then((response) => {
        if (response.status === 201) {
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
          alert('Error al crear el usuario');
        }
      }).catch((error) => {
        setErrors({
          general: error.response.data.error
        });
      });

    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-12"
            />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">REGISTRARSE</h2>
        <p className="text-center mb-8">Introduce los datos para crear una cuenta</p>


        <form onSubmit={handleSubmit} noValidate>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Teléfono
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat-email">
                Repetir correo
              </label>
              <input
                type="email"
                id="repeatEmail"
                value={formData.repeatEmail}
                onChange={handleChange}
                placeholder="Repetir correo"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.repeatEmail ? 'border-red-500' : ''}`}
              />
              {errors.repeatEmail && <p className="text-red-500 text-sm">{errors.repeatEmail}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat-password">
                Repetir contraseña
              </label>
              <input
                type="password"
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repetir contraseña"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 ${errors.repeatPassword ? 'border-red-500' : ''}`}
              />
              {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            REGISTRARSE
          </button>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline">Volver aquí</Link>
        </p>
      </div>
    </div>
  );
};