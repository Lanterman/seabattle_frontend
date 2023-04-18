import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "../pages/BasePage/Layout/Layout";
import NotFoundPage from "../pages/BasePage/NotFoundPage/NotFoundPage";

import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { LobbyListPage, lobbyListLoader } from '../pages/LobbyListPage/LobbyListPage/LobbyListPage';
import { LobbyPage, lobbyLoader } from '../pages/LobbyPage/LobbyPage/LobbyPage';
import LeadBoardPage from '../pages/LeadBoardPage/LeadBoardPage';
import AboutMePage from '../pages/AboutMePage/AboutMePage';
import "../App.css";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<ProfilePage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="register/" element={<RegisterPage />} />
        <Route path="lobbies/" element={<LobbyListPage />} loader={lobbyListLoader} />
        <Route path="lobbies/:slug/" element={<LobbyPage />} loader={lobbyLoader} />
        <Route path="leadboard/" element={<LeadBoardPage />} />
        <Route path="about/" element={<AboutMePage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>    
));

export default router;
