import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

import { BasePage } from "../pages/BasePage/BasePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage, registerUserAction } from "../pages/RegisterPage/RegisterPage";
import { ProfilePage, profileAction, userInfoLoader } from '../pages/ProfilePage/Profile/ProfilePage';
import { LobbyListPage, lobbyAction, lobbyListLoader } from '../pages/LobbyListPage/LobbyListPage/LobbyListPage';
import { LobbyPage, lobbyLoader } from '../pages/LobbyPage/LobbyPage/LobbyPage';
import { LeadBoardPage, getTopUserListLoader } from '../pages/LeadBoardPage/LeadBoard/LeadBoardPage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import "../App.css";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
        <Route index element={<BasePage />} />
        <Route path="profile/:username/" element={<ProfilePage />} loader={userInfoLoader} action={profileAction}/>
        <Route path="sign-in/" element={<LoginPage />} />
        <Route path="sign-up/" element={<RegisterPage />} action={registerUserAction} />
        <Route path="lobbies/" element={<LobbyListPage />} loader={lobbyListLoader} action={lobbyAction}/>
        <Route path="lobbies/:slug/" element={<LobbyPage />} loader={lobbyLoader} />
        <Route path="leadboard/" element={<LeadBoardPage />} loader={getTopUserListLoader} />
        <Route path="about/" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Route>    
));

export default router;
