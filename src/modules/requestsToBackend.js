import axios from "axios";

export async function refreshTokenRequest() {
    const refreshToken = sessionStorage.getItem("refresh_token");
    let isRedirect = false;

    await axios.post(
        `${window.env.BASE_URL}/auth/token/refresh/`, 
        {refresh_token: refreshToken}
        )
        .then(function(response) {
            sessionStorage.setItem("auth_token", response.data.access_token);
            sessionStorage.setItem("user_id", response.data.user);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            // document.cookie = `refresh_token = ${response.data.refresh_token}`;
        })
        .catch(function(error) {
            isRedirect = true;
            sessionStorage.removeItem("auth_token");

        });
    
    return isRedirect;
};