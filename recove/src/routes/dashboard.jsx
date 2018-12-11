import UserProfile from "views/UserProfile/UserProfile.jsx";
import Historial from "views/Historial/Historial.jsx";
import Favoritos from "views/Favoritos/Favoritos.jsx";
import Maps from "views/Maps/Maps.jsx";
import Publications from "views/Publications/Publications.jsx";

import {
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn
} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/home/historial",
    sidebarName: "Mi Historial",
    navbarName: "Historial de Publicaciones",
    icon: ContentPaste,
    component: Historial
  },
  {
    path: "/home/mapa",
    sidebarName: "Puntos Recove",
    navbarName: "Todos los puntos Recove",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/home/publicaciones",
    sidebarName: "Publicar",
    navbarName: "Realizar Publicación",
    icon: BubbleChart,
    component: Publications
  },
  {
    path: "/home/favoritos",
    sidebarName: "Interés",
    navbarName: "Publicaciones de Interés",
    icon: LibraryBooks,
    component: Favoritos
  },
  {
    path: "/home/perfil",
    sidebarName: "Mi perfil",
    navbarName: "Editar Perfil",
    icon: Person,
    component: UserProfile
  },
  //{ redirect: true, path: "/", to: "/historial", navbarName: "Redirect" }
];

export default dashboardRoutes;