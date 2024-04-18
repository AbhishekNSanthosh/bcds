import React, { useState } from 'react'
import styles from './login.module.css'
import immage from '../../../assets/hospital.svg'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        if (username === "user" && password === "root") {
            toast.success("Login successfull");
            setTimeout(() => {
                navigate('/')
            }, 500);
            localStorage.setItem('loggedIn', 'success')
        } else {
            toast.error("Login failed");
        }
    }
    useEffect(() => {
        if (localStorage.getItem('loggedIn')) {
            navigate('/')
        }
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.left}>
                    <span className={styles.title}>Login</span>
                    <div className={styles.col}>
                        <input onChange={(e) => {
                            setUsername(e.target.value)
                        }} type="text" className={styles.txt} placeholder='Username' />
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" className={styles.txt} placeholder='Password' />
                        <button onClick={(e) => {
                            e.preventDefault()
                            handleLogin();
                        }} className={styles.submit}>Submit</button>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={immage} alt="" className={styles.image} />
                </div>
            </div>
        </div>
    )
}
