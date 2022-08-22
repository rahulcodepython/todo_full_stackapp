import React from 'react';
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import Login from './pages/Login';
import Todo from './pages/Todo';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {

    const [cookies, setCookie] = useCookies(['previousLogin', 'token', 'refreshToken', 'username', 'password']);

    // const checkingCookiesOnThisSite = () => {
    //     console.log("checkingCookiesOnThisSite starts in App component");

    //     if (cookies.previousLogin === "true") {
    //         console.log("we found previouslogin cookie is true. Now set the userAuthenticatedStatus variable value true.");
    //     }

    //     else {
    //         console.log("we found previouslogin cookie is false or undefined");
    //     }

    //     console.log("checkingCookiesOnThisSite ends in App component");
    // }

    // useEffect(() => {
    //     console.log("UseEffect Starts in App component");
    //     checkingCookiesOnThisSite();
    //     console.log("UseEffect ends in App component");
    // }, []);

    const getTokenFromRefreshTokenAndFetchData = async (token) => {
        // console.log("getTokenFromRefreshTokenAndFetchData starts in App component");

        const options = {
            method: 'POST',
            body: `{"refresh":"${token}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        // console.log("token regenerated from refreshToken");

        await fetch('http://127.0.0.1:8000/api/token/refresh/', options)
            .then(response => response.json())
            .then(response => {
                console.log("Set new token in cookie");
                setCookie('token', response.access, { 'maxAge': `${60 * 5}` });
                // console.log("Set new refreshToken in cookie");
                setCookie('refreshToken', response.refresh, { 'maxAge': `${60 * 5}` });
                // console.log("Fetch Data from new token");
                fetchDataFromServer(response.access);
            })

        // console.log("getTokenFromRefreshTokenAndFetchData ends in App component");
    }

    const fetchDataFromServer = async (token) => {
        // console.log("fetchDataFromServer starts in App component");
        // console.log(token);
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // console.log("Fetching starts");

        await fetch('http://127.0.0.1:8000/api', options)
            .then(response => response.json())
            .then(response => {
                window.sessionStorage.setItem('allTodos', JSON.stringify(response));
                // console.log("The response of data is : " + response);
            })
            .catch(err => console.error(err));

        // console.log("fetchDataFromServer ends in App component");
    }

    const getData = async () => {
        // console.log("GetData starts in App component");

        if (cookies.token === undefined) {
            // console.log("undefined cookies.token cookie");
            // console.log("Lets check the refresh token is defined or not");

            if (cookies.refreshToken === undefined) {
                // console.log("undefined cookies.refreshToken cookie");
                // console.log("Regenerate access and refresh token from username and password");
                await getToken(cookies.username, cookies.password, true);
            }

            else {
                // console.log("cookies.refreshToken is defined");
                // console.log("lets get token from refreshToken");
                await getTokenFromRefreshTokenAndFetchData(cookies.refreshToken);
            }
        }

        else {
            // console.log("We found cookies.token is defined");
            await fetchDataFromServer(cookies.token);
        }

        // console.log("GetData ends in App component");
    }

    const getToken = async (username, password, getDataAutomatic) => {
        // console.log("getToken function starts in App component");

        const options = {
            method: 'POST',
            body: `{"username":"${username}","password":"${password}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        // console.log("now awaiting for request");

        await fetch('http://127.0.0.1:8000/api/token/', options)
            .then(response => response.json())
            .then(response => {
                if (response.detail) {
                    alert("Something is wrong relogin.");
                }

                else {
                    // console.log("Set the previousLogin cookie true");
                    setCookie('previousLogin', JSON.stringify(true), { 'maxAge': `${60 * 5}` })
                    // console.log("Set the token cookie");
                    setCookie('token', response.access, { 'maxAge': `${60 * 5}` })
                    // console.log("Set the refresh cookie");
                    setCookie('refreshToken', response.refresh, { 'maxAge': `${60 * 5}` })
                    // console.log("username cookie is set");
                    setCookie('username', username, { 'maxAge': `${60 * 5}` });
                    // console.log("password cookie is set");
                    setCookie('password', password, { 'maxAge': `${60 * 5}` });

                    if (getDataAutomatic) {
                        // console.log("Fetch data automatic after getting token");
                        fetchDataFromServer(response.access);
                    }
                }
            })

        // console.log("getToken function ends in App component");
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={cookies.previousLogin === "true" ? <Todo getdata={getData} /> : <Login gettoken={getToken} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
