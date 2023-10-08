import { useToast } from '@chakra-ui/react';
import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const toast = useToast()
    const [loading, setLoading] = useState(true);
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);

    let loginUser = async (e, username, password) => {
        e.preventDefault();
        let response = await fetch("/api/token/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': username, 'password': password }),
            },
        )
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem(('authTokens'), JSON.stringify(data));
            navigate("/")
        }
        else {
            toast({
                title: 'Some Error Occured',
                description: data.details,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
    }


    let registerUser = async (e, rfirstname, rlastname, remail, rpassword) => {
        e.preventDefault();
        let response = await fetch("/api/register/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'name': rfirstname+" " + rlastname,'email':remail, 'password': rpassword }),
            },
        )
        let data = await response.json();
        if (response.status === 201) {
            toast({
                title: 'Registered Successfully!',
                description: `Registration with ${data.username} successful. Please login`,
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            loginUser(e,data.username,rpassword)
            navigate("/")
        }
        else {
            toast({
                title: 'Some Error Occured',
                description: data.details,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
    }


    let updateToken = async ()=> {

        let response = await fetch('/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }



    let addTask = async (e) => {
        e.preventDefault();
        let response = await fetch("/api/tasks/create/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + String(authTokens.access)
                },
                body:JSON.stringify({'refresh':authTokens?.refresh})
            },
        )
        let data = await response.json();
        if (response.status === 201) {
            navigate(`/edit/${data.id}`)
        }
        else {
            toast({
                title: 'Some Error Occured',
                description: data.details,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
    }

    let logoutUser = () =>{
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens')
        navigate("/login")
    }



    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        addTask:addTask,
    }


    useEffect(()=> {
        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])
    


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}