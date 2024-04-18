import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import { toast } from 'react-toastify';
export default function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('loggedIn');
    console.log(token)
    useEffect(() => {
        if (!localStorage.getItem('loggedIn')) {
            navigate('/')
        }
    }, [token]);
    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                Breast Cancer Detection Software
                <button className={styles.logout} onClick={() => {
                    localStorage.clear();
                    toast.success("Logout successfull")
                    setTimeout(() => {
                        navigate('/login')
                    }, 600);
                }}>Logout</button>
            </div>
        </div>
    )
}
