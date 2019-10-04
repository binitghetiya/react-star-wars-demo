import HomeComponent from "../components/HomeComponent";
import LoginComponent from "../components/LoginComponent";

const routes = [
  { path: "/", exact: true, name: "Home", component: HomeComponent },
  { path: "/login", exact: true, name: "Login", component: LoginComponent }
];

export default routes;
