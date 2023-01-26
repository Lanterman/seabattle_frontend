import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "../components/BasePage/Layout/Layout";
import NotFoundPage from "../components/BasePage/NotFoundPage/NotFoundPage";

import ProfilePage from '../components/ProfilePage/ProfilePage';
import { LobbyListPage, lobbyListLoader } from '../components/LobbyListPage/LobbyListPage/LobbyListPage';
import { LobbyPage, lobbyLoader } from '../components/LobbyPage/LobbyPage/LobbyPage';
import LeadBoardPage from '../components/LeadBoardPage/LeadBoardPage';
import AboutMePage from '../components/AboutMePage/AboutMePage';

import "../App.css";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<ProfilePage />} />
        <Route path="lobbies/" element={<LobbyListPage />} loader={lobbyListLoader} />
        <Route path="lobbies/:slug/" element={<LobbyPage />} loader={lobbyLoader} />
        <Route path="leadboard/" element={<LeadBoardPage />} />
        <Route path="about/" element={<AboutMePage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>    
));

export default router;
