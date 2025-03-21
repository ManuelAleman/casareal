import Modal from 'react-modal';

Modal.setAppElement('#root');

export const FiltrosModal = ({ isOpen, onClose, filtrarPosts }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        filtrarPosts({
            precioMin: e.target[0].value,
            precioMax: e.target[1].value,
            tipo: e.target[2].value,
            estado: e.target[3].value,
            ciudad: e.target[4].value,
            numPisos: e.target[5].value,
            numHabitaciones: e.target[6].value,
            numBanos: e.target[7].value,
        });
        onClose();
    }

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal-content max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
      
            <div className="p-4">
                <h2 className="text-xl mb-4">Filtros</h2>
                <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Rango de Precio</label>
                        <input type="text" placeholder="Mínimo" className="border p-2 w-full mb-2" />
                        <input type="text" placeholder="Máximo" className="border p-2 w-full" />
                    </div>

                    {
                        //Renta o venta
                    }
                    <div className="mb-4">
                        <label className="block mb-2">Tipo de Propiedad</label>
                        <select className="border p-2 w-full">
                            <option value="">Cualquiera</option>
                            <option value="renta">Renta</option>
                            <option value="venta">Venta</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Estado</label>
                        <input type="text" className="border p-2 w-full" />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Ciudad</label>
                        <input type="text" className="border p-2 w-full" />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Número de Pisos</label>
                        <input type="number" className="border p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Número de Habitaciones</label>
                        <input type="number" className="border p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Número de Baños</label>
                        <input type="number" className="border p-2 w-full" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 mr-2">Cerrar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Aplicar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};