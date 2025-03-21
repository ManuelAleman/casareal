import { useState } from "react";

export const PublicacionCard = ({ formData, setFormData, setPagina }) => {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file
    });
  }

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo) newErrors.titulo = 'El titulo es requerido';
    else if (formData.titulo.length < 5 || formData.titulo.length > 50) newErrors.titulo = 'El titulo debe tener mas de 5 letras y menos de 50 letras';
    if (!formData.descripcion) newErrors.descripcion = 'La descripción es requerida';
    else if (formData.descripcion.length > 300) newErrors.descripcion = 'La descripción debe tener menos de 300 letras';
    if (!formData.foto) newErrors.foto = 'La foto es requerida';
    else if (!formData.foto.type.includes('image')) newErrors.foto = 'El archivo debe ser una imagen';

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setPagina(2);
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-5">1. Publicación</h3>


      {/* Titulo de la publicación */}
      <label className="block font-bold " htmlFor="titulo">
        Titulo de la publicación
      </label>
      <label htmlFor="titulo" className="text-sm mb-1">Agrega un titulo llamativo para tu publicación</label>
      <input
        type="text"
        id="titulo"
        value={formData.titulo}
        onChange={handleChange}
        placeholder="Titulo"
        className={`w-full px-3 py-2 border  ${errors.titulo ? 'border-red-500' : 'mb-2'}`}
      />
      {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}

      {/* Descripción de la publicación */}
      <label className="block font-bold " htmlFor="descripcion">
        Descripción de la publicación
      </label>
      <label htmlFor="descripcion" className="text-sm mb-1">Agrega una descripción detallada de la propiedad</label>
      <textarea
        id="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        rows={5}
        className={`w-full px-3 py-2 border ${errors.descripcion ? 'border-red-500' : 'mb-2'}`}
      />

      {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}

      {/* Foto principal */}
      <label className="block font-bold " htmlFor="foto">
        Foto principal
      </label>
      <label htmlFor="foto" className="text-sm mb-1">Muestra una foto de tu vivienda</label>
      <input
        type="file"
        id="foto"
        onChange={onFileChange}
        className={`w-full py-2 border ${errors.foto ? 'border-red-500' : 'mb-2'}`}
      />

      {errors.foto && <p className="text-red-500 text-sm">{errors.foto}</p>}

      {/*Continuar */}
      <div className="flex justify-end">
        <button onClick={handleSubmit} className=" bg-blue-500 hover:bg-blue-700 text-right text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Continuar
        </button>
      </div>
    </>
  );
}