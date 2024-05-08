import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
export default function Home() {
    const [file, setFile] = useState(null)
    const [imageSrc, setImageSrc] = useState('');
    const [processed, setProcessed] = useState('');
    const [result, setResult] = useState({});

    const navigate = useNavigate();
    const token = localStorage.getItem('loggedIn');
    console.log(token)
    useEffect(() => {
        if (!localStorage.getItem('loggedIn')) {
            navigate('/')
        }
    }, [token]);

    const baseUrl = "http://127.0.0.1:8000/BreastCancerPrediction/prediction_workflow/"

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            // 'file' should match the name of the field in your backend that accepts the file
            // You can append additional form fields if needed
            // formData.append('fieldName', value);

            const response = await axios.post(baseUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // Optionally, you can handle progress for file upload
                // onUploadProgress: progressEvent => {
                //     const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     console.log(`Upload Progress: ${percentage}%`);
                // },
            });
            setResult(response?.data)
            setImageSrc(`data:image/jpeg;base64,${response?.data?.original_image_base64}`);
            setProcessed(`data:image/jpeg;base64,${response?.data?.processed_image_base64}`);
            console.log('File uploaded successfully:', response.data);
            // Handle response as needed
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error
        }
    };
    console.log(file)

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.topRow}>
                    Breast Cancer Detection Software
                    <button className={styles.logout} onClick={() => {
                        localStorage.clear();
                        toast.success("Logout successfull")
                        setTimeout(() => {
                            navigate('/login')
                        }, 600);
                    }}>Logout</button>
                </div>
                <div className={styles.inner}>
                    <div className={styles.center}>
                        {imageSrc === '' &&
                            <div className={styles.box}>
                                <div className={styles.row}>
                                    <input type="file" className={styles.select} onChange={(e) => {
                                        setFile(e.target.files[0])
                                    }} />
                                    <button onClick={() => {
                                        handleSubmit()
                                    }} className={styles.submit}>Submit</button>
                                </div>
                            </div>
                        }
                        {imageSrc !== '' &&
                            <div className={styles.resultRow}>
                                {imageSrc &&
                                    <div className={styles.uploaded}>
                                        <div className={styles.row}>
                                            <span className={styles.info}>Input image</span>
                                            <img src={imageSrc} alt="Converted Image" className={styles.img} />
                                        </div>
                                    </div>
                                }
                                {processed &&
                                    <div className={styles.uploaded}>
                                        <div className={styles.row}>
                                            <span className={styles.info}>Segmented Image</span>
                                            <img src={processed} alt="Converted Image" className={styles.img} />
                                        </div>

                                    </div>
                                }
                            </div>
                        }
                        {imageSrc !== '' &&
                            <div className={styles.new}>
                                <div className={styles.resultrow}>
                                    Result:
                                    {result?.predicted_class === "Tumour Detected" &&
                                        <span className={styles.resultRed}>{result?.predicted_class}</span>
                                    }
                                    {result?.predicted_class === "Normal Condition" &&
                                        <span className={styles.resultGreen}>{result?.predicted_class}</span>
                                    }
                                </div>
                            </div>
                        }

                        {imageSrc !== '' &&
                            <div className={styles.new}>
                                <button onClick={() => {
                                    setFile(null);
                                    setImageSrc('');
                                    setProcessed('');
                                    setResult({});
                                }} className={styles.newBtn}>Check another result</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
