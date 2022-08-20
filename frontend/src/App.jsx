import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import Login from './pages/Login';
import Todo from './pages/Todo';
import AddTodo from './pages/AddTodo';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {

    const [userAuthenticatedStatus, setuserAuthenticatedStatus] = useState(false);
    const [token, setToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [cookies, setCookie] = useCookies(['previousLogin', 'token', 'refreshToken', 'username', 'password']);

    const setCookieForFutureAuthentication = (access, refresh) => {
        console.log("setCookieForFutureAuthentication starts");
        setCookie('previousLogin', JSON.stringify(true), { 'maxAge': `${60 * 5}` });
        console.log("previousLogin cookie is set");
        setCookie('token', access, { 'maxAge': `${60 * 5}` });
        console.log("token cookie is set");
        setCookie('refreshToken', refresh, { 'maxAge': `${60 * 5}` });
        console.log("refreshToken cookie is set");
        console.log("setCookieForFutureAuthentication ends");
    }

    const getToken = async (username, password) => {
        console.log("gettoken starts.");
        console.log(`Received username is ${username} and password is ${password}`);
        const options = {
            method: 'POST',
            body: `{"username":"${username}","password":"${password}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        console.log("now awaiting for request");
        await fetch('http://127.0.0.1:8000/api/token/', options)
            .then(response => response.json())
            .then(response => {
                console.log("the final response is : ");
                console.log(response);
                console.log("checking that there any details object in response");
                if (response.detail) {
                    console.log("details object was found in response");
                    alert("Sorry, We are getting some issuse try again.");
                }
                else {
                    console.log("Details object was not found in response");
                    console.log("Cookies are set respect of access and refresh token which is fetched lastly");
                    setCookieForFutureAuthentication(response.access, response.refresh);
                    console.log("Let set the token variable");
                    setToken(response.access)
                    console.log("Let set the refresh token variable");
                    setRefreshToken(response.refresh)
                }
            });
        console.log("gettoken ends.");
    }

    const getTokenFromRefreshToken = async (token) => {
        console.log("getTokenFromRefreshToken starts.");
        const options = {
            method: 'POST',
            body: `{"refresh":"${token}"}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        console.log("refetch the token");
        await fetch('http://127.0.0.1:8000/api/token/refresh/', options)
            .then(response => response.json())
            .then(response => {
                console.log("set the refreshToken again in getTokenFromRefreshToken.");
                setRefreshToken(response.refresh);
                console.log("set the token again in getTokenFromRefreshToken.");
                setToken(response.access);
                // console.log("Rese/t the cookie for access token and refresh token in getTokenFromRefreshToken.");
                setCookieForFutureAuthentication(response.access, response.refresh);
                console.log("There is the response.token");
                console.log(response.access);
                console.log("the response will be returned.");
                return response.access;
            });
        console.log("getTokenFromRefreshToken ends.");
    }

    const checkTokenAsAuthenticationBearersAllFulfiled = async () => {
        console.log("checkTokenAsAuthenticationBearersAllFulfiled starts");

        if (cookies.previousLogin === "true") {
            console.log("we found previouslogin cookie is true. Now set the userAuthenticatedStatus variable value true.");
            setuserAuthenticatedStatus(true);

            if (cookies.token === undefined) {
                console.log("cookies.token is now undefined");
                console.log("Lets check about the refresh token");
                // if (cookies.refreshToken === undefined) {
                //     console.log("There is also cookies.refreshToken is undefined");
                console.log("So we have to finally get the username and password in a variable and relogin");
                const usernameForReloginFromCookie = cookies.username;
                const passwordForReloginFromCookie = cookies.password
                console.log("Relogin again.");
                await getToken(usernameForReloginFromCookie, passwordForReloginFromCookie);
                console.log("User relogged in");
                // }
                // else {
                //     console.log("The refresh token in cookie is : ");
                //     console.log(cookies.refreshToken);
                //     console.log("So we found cookies.refreshToken now we set the refreshToken variable with cookies.refreshToken");
                //     setRefreshToken(cookies.refreshToken);
                //     console.log("Now we need to get the token again using refresh token.");
                //     await getTokenFromRefreshToken(cookies.refreshToken);
                //     console.log("Token is reloaded from refresh token");
                // }
            }
            else {
                console.log("The token in cookie is : ");
                console.log(cookies.token);
                console.log("So we found cookies.token now we set the token variable with cookies.token");
                setToken(cookies.token);
            }
        }
        else {
            console.log("You have not registed or login yet. Please login again.");
        }

        console.log("checkTokenAsAuthenticationBearersAllFulfiled ends");
    }

    useEffect(() => {
        console.log("UseEffect Starts");
        checkTokenAsAuthenticationBearersAllFulfiled();
        console.log("UseEffect ends");
    }, [cookies]);

    // const unusualCheckingOfTokens = async () => {
    //     console.log("unusualCheckingOfTokens starts");
    //     if (cookies.token === undefined) {
    //         if (cookies.refreshToken === undefined) {
    //             await getToken(cookies.username, cookies.password);
    //         }
    //         else {
    //             await getTokenFromRefreshToken(cookies.refreshToken);
    //         }
    //     }
    //     console.log("unusualCheckingOfTokens ends");
    // }

    const getDataMain = async (token) => {
        console.log("getdata starts.");
        console.log("lets check the first that token is avaliable in cookies then start fetching.");
        console.log("token is readded. If in cookies, there was not token then token is regenerated and if there was token then it reconfigured in token variable thus there will no error raise.");
        await checkTokenAsAuthenticationBearersAllFulfiled();
        console.log("checking complete now fetch the data");

        // await unusualCheckingOfTokens();

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        // console.log("The token is : " + token);
        // console.log("The refreshToken is : " + refreshToken);
        // console.log("let set the cookie");
        // setCookie('token', token, { 'maxAge': `${60 * 5}` })
        // setCookie('refreshToken', refreshToken, { 'maxAge': `${60 * 5}` })

        console.log("Fetching starts");
        await fetch('http://127.0.0.1:8000/api', options)
            .then(response => response.json())
            .then(response => { console.log(response); })
            .catch(err => console.error(err));
        console.log("fetching ends");
        console.log("getdata ends");
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={userAuthenticatedStatus == false ? <Login gettoken={getToken} /> : <Todo getdata={getDataMain} token={token} />} />
                <Route path="addtodo" element={<AddTodo />} />
            </Routes>
        </BrowserRouter>
    )
}
