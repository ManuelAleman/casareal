import { useState } from "react";

export const PrecioCard = ({ formData, setFormData, handlePublicar }) => {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};


    if (!formData.precio) {
      newErrors.precio = "El precio es obligatorio";
    } else if (isNaN(formData.precio)) {
      newErrors.precio = "El precio debe ser un numero";
    } else if (formData.precio < 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    // Checar radio buttons
    if (!document.getElementById("inline-radio").checked && !document.getElementById("inline-2-radio").checked) {
      newErrors.tipo = "Selecciona un tipo de venta";
    }


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
    if (document.getElementById("inline-radio").checked) {
      formData.tipo = "venta";
    }
    else {
      formData.tipo = "renta";
    }
    handlePublicar();
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-5">4. Precio</h3>

      {/* Tipo de venta */}

      <div className="flex mb-5">
        <div className="flex items-center me-4">
          <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Venta</label>
        </div>
        <div className="flex items-center me-4">
          <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Renta</label>
        </div>
      </div>
      {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}



      {/* Calle */}
      <div className="mb-3">
        <h3 className={`text-lg font-semibold ${errors.precio ? "" : "mb-2"} `}>Precio</h3>
        <input
          id="precio"
          onChange={e => handleChange(e)}
          className={`w-full md:w-1/2 px-3 py-2 border ${errors.precio ? 'border-red-500' : 'mb-2'}`}
          placeholder="$0"
          type="number" />
        {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
      </div>





      {/*Continuar */}
      <div className="flex justify-end">
        <button onClick={handleSubmit} className=" bg-blue-500 hover:bg-blue-700 text-right text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Publicar
        </button>
      </div>
    </>
  );
}