import styles from '../styles/LoginForm.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userCheck } from '../lib/validate'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function LoginForm() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username:'',
            password:''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
            .required("Please Enter a Username")
            .test("UserNotFound", "User Does Not Exist", async function (value) {
                if (value != null)
                    return await userCheck(value)
            }),
            password: Yup.string().required("Please Enter a Password")
        }),
        onSubmit
    })

    async function onSubmit(values) {
        
        return axios.get("http://localhost:5000/customer").then(response => {
            if (values.username === 'admin' && values.password === 'adminpw') {
                localStorage.setItem('admin', "true")
                navigate('/');
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].username === values.username){
                        if (values.password === response.data[i].password)
                            localStorage.setItem('admin', "false")
                            localStorage.setItem('userId', response.data[i]._id)
                            navigate('/dashboard');
                    }
                }  
            }
        })
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.login_form} onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        className={styles.input}
                        id="username"
                        name="username"
                        placeholder='Username'
                        {...formik.getFieldProps('username')}
                    />
                    {formik.errors.username && formik.touched.username ? <span className={styles.error}>{formik.errors.username}</span> : <></>}

                    <input
                        type="password"
                        className={styles.input}
                        id="password"
                        name="password"
                        placeholder='Password'
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password ? <span className={styles.error}>{formik.errors.password}</span> : <></>}

                    <button type="submit" className={styles.submit}>Login</button>

                    <div className={styles.signup}>
                        Don't Have An Account Yet? <NavLink to='/Signup' className={styles.button}>Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
}