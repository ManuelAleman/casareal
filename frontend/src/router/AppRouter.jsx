import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PropiedadesPage } from "../pages/PropiedadesPage";
import { MapaPage } from "../pages/MapaPage";
import { ProfilePage } from "../pages/ProfilePage";
import { PublicarPage } from "../pages/PublicarPage";
import { PropiedadPage } from "../pages/PropiedadPage";
import { AutorizarPage } from "../pages/AutorizarPage";
import { AsignarVendedorPage } from "../pages/AsignarVendedorPage";
import { CitasPage } from "../pages/CitasPage";
import { PropiedadesAsignadas } from "../pages/PropiedadesAsignadas";
import { GenerarContrato } from "../pages/GenerarContrato";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/propiedades" element={<PropiedadesPage />} />
        <Route path="/mapa" element={<MapaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:post_id" element={<PropiedadPage />} />
        <Route path="/user/:user_id" element={<HomePage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/publicar" element={<PublicarPage />} />
        <Route path="/citas" element={<CitasPage />} />
        <Route path="/vendedor/propiedades" element={<PropiedadesAsignadas />} />
        <Route path="/vendedor/contrato/:id" element={<GenerarContrato />} />

        <Route path="/admin/autorizar" element={<AutorizarPage />} />
        <Route path="/admin/asignar" element={<AsignarVendedorPage />} />

        <Route path="*" element={<Navigate to="/" replace={false} />} />
      </Routes>
    </BrowserRouter>
  );
};
