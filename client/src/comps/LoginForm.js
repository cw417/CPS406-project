import styles from '../styles/LoginForm.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userCheck } from '../lib/validate'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import logo from "../images/Logo.png";
import Bank from '../objects/Bank'

export default function LoginForm() {

    const navigate = useNavigate();
    const reserve = new Bank();

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
        reserve.login(values.username, values.password)
        .then(response => {
            if (response === 'admin') {
                navigate('/admin')
            } else if (response === 'customer') {
                navigate('/dashboard')
            }
        })
    }

    return (
        <>
            <div className={styles.container}>
            
                <form className={styles.login_form} onSubmit={formik.handleSubmit}>
                <div className={styles.center}>
              <img src={logo} height= "50"  alt="The Reserve" />

              </div>
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
                        Don't Have An Account Yet?<NavLink to='/Signup' className={styles.button}>Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
}