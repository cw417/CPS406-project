import styles from '../styles/LoginForm.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { userCheck } from '../lib/validate'

export default function LoginForm() {

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

        const JSONdata = JSON.stringify(values)
        console.log(JSONdata)

        const endpoint = `http://localhost:4000/customer/${JSONdata.username}`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)

        const result = {temp: 'hi'}
        
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

                    <div>
                        Don't Have An Account Yet? {/* Add Link To Sign Up Page */}
                    </div>
                </form>
            </div>
        </>
    );
}