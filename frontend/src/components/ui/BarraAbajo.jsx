import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function BarraAbajo() {
  return (
    <div className="w-full bg-gray-300 px-4 py-6 sm:flex sm:items-center sm:justify-between">
      <Footer.Copyright href="#" by="CasaReal™" year={2024} />
      <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
        <Footer.Icon href="#" icon={BsFacebook} />
        <Footer.Icon href="#" icon={BsInstagram} />
        <Footer.Icon href="#" icon={BsTwitter} />
        <Footer.Icon href="#" icon={BsGithub} />
      </div>
    </div>
  )
}