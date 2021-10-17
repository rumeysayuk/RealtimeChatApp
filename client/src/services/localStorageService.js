export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
}
export const removeUserFromLocalStorage = () => {
    if (getTokenFromLocalStorage()) {
        localStorage.clear();
    }
}
