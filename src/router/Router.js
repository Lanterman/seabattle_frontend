import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { ProfilePage, profileAction, userInfoLoader } from '../pages/ProfilePage/Profile/ProfilePage';
import { LobbyListPage, lobbyAction, lobbyListLoader } from '../pages/LobbyListPage/LobbyListPage/LobbyListPage';
import { LobbyPage, lobbyLoader } from '../pages/LobbyPage/LobbyPage/LobbyPage';
import LeadBoardPage from '../pages/LeadBoardPage/LeadBoardPage';
import AboutMePage from '../pages/AboutMePage/AboutMePage';
import "../App.css";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route path="profile/:username/" element={<ProfilePage />} loader={userInfoLoader} action={profileAction}/>
        <Route path="login/" element={<LoginPage />} />
        <Route path="register/" element={<RegisterPage />} />
        <Route path="lobbies/" element={<LobbyListPage />} loader={lobbyListLoader} action={lobbyAction}/>
        <Route path="lobbies/:slug/" element={<LobbyPage />} loader={lobbyLoader} />
        <Route path="leadboard/" element={<LeadBoardPage />} />
        <Route path="about/" element={<AboutMePage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>    
));

export default router;
