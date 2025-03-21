import { Barra } from "../components/ui/Barra";
import { BarraAbajo } from "../components/ui/BarraAbajo";
import casa from "../assets/casa.webp";

const HomePage = () => {

  return (
    <>
      <Barra />
      <div className="relative w-full" style={{ height: 'calc(100vh - 60px)' }}>
        <img src={casa} alt="House" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-start bg-white bg-opacity-20">
          <div className="bg-white p-8 rounded-lg md:max-w-xl md:ml-48 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-4">Descubre tu vivienda ideal</h1>
            <p className="mb-4">
              Encuentra tu casa de renta o compra entre todos nuestros inmuebles disponibles.
            </p>
            <ul className="list-disc list-inside text-left">
              <li>Oportunidades flexibles</li>
              <li>Tramites ágiles</li>
              <li>Asesoría profesional</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Nosotros</h2>
        <p className="italic text-gray-700">
          Especialistas en bienes raíces. Desde lo clásico hasta lo moderno, ofrecemos una amplia gama de opciones
          para todos los gustos y presupuestos. Confía en nosotros para encontrar la propiedad perfecta. Hacemos que
          el proceso sea fácil, emocionante y sin complicaciones.
        </p>
        <div className="flex justify-center mt-8 space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-facebook"></i></a>
          <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-500 hover:text-gray-700"><i className="fab fa-tiktok"></i></a>
        </div>
      </div>

      <BarraAbajo />
    </>
  );
}

export default HomePage;