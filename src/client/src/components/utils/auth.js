import { jwtDecode } from "jwt-decode";

export const isUserAuthenticated = () => {
    const authDataString = localStorage.getItem("token");

    if (!authDataString) {
        return false;
    }

    try {
        const authData = JSON.parse(authDataString);
        const token = authData.token.token;

        if (!token) {
            return false;
        }

        const decodedToken = jwtDecode(token);

        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem("authData");
            return false;
        }

        return true;

    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return false;
    }
};