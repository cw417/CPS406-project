import styles from '../styles/SignUpForm.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { emailCheck, userCheck } from '../lib/validate'
import { useNavigate } from 'react-router-dom'
import Customer from '../objects/Customer'
import { NavLink } from 'react-router-dom'
import logo from "../images/Logo.png";
export default function SignUp() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            first: '',
            last: '',
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            confirm_email: ''
        },
        validationSchema: Yup.object({
            first: Yup.string().required('Required Field'),
            last: Yup.string().required('Required Field'),
            username: Yup.string().required('Required Field')
            .min(3, 'Must be at least 3 characters')
            .max(10, 'Must be less than 11 characters')
            .test('SpaceInName', 'Invalid Username', function (value) {
                if (value != null)
                    return !(value.includes(" "))
            })
            .test("UserFound", "Username is Taken", async function (value) {
                if (value != null)
                    return !(await userCheck(value))
            }),
            password: Yup.string().required('Required Field')
            .min(8, 'Must be at least 8 characters')
            .test('InvalidCriteria','Password must contain a Number, Special, Uppercase, and Lowercase Character', function (value) {
                return (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(value)
            }),
            confirm_password: Yup.string().required('Required Field')
            .test('PassMismatch','Passwords Do Not Match', function (value) {
                return this.parent.password === value
            }),
            address: Yup.string().required('Required Field'),
            email: Yup.string().required('Required Field')
            .test('InvalidEmail', 'Invalid Email Address', function (value) {
                return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
            })
            .test("Email Found", "Email Already In Use", async function (value) {
                return !(await emailCheck(value))
            }),
            confirm_email: Yup.string().required('Required Field')
            .test('EmailMismatch','Emails Do Not Match', function (value) {
                return this.parent.email === value
            }),
        }),
        onSubmit
    })

    function onSubmit(values) {
        /**
         * Create a new customer object with the current input values, and add it to the database.
         * Chequing accounts is set to 0.
         * Savings account is set to 0.
         * Transaction history is set to an empty array.
         */
        console.log(values)
        console.log("creating new user");
        const newCustomer = new Customer(values.username, values.first, values.last, values.address, values.email, values.password, [], [])
        createUser(newCustomer);
      }

    async function createUser(newCustomer) {

        console.log(`Adding: ${newCustomer.username}`);
        await fetch('http://localhost:5000/customer/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCustomer),
        }).then(response => response.json()).then((data) => {
            newCustomer.setId(data.insertedId)
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        newCustomer.openAccount('Saving');
        navigate('/login');
      }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.signup_form} onSubmit={formik.handleSubmit}>
                <div className={styles.center}>
              <img src={logo} height= "50"  alt="The Reserve" />
              </div>
                    <input
                        type="text"
                        className={styles.input}
                        id="first"
                        name="first"
                        placeholder='First Name'
                        {...formik.getFieldProps('first')}
                    />
                    {formik.errors.first && formik.touched.first ? <span className={styles.error}>{formik.errors.first}</span> : <></>}

                    <input
                        type="last"
                        className={styles.input}
                        id="last"
                        name="last"
                        placeholder='Last Name'
                        {...formik.getFieldProps('last')}
                    />
                    {formik.errors.last && formik.touched.last ? <span className={styles.error}>{formik.errors.last}</span> : <></>}

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

                    <input
                    type="password"
                    className={styles.input}
                    id="confirm_password"
                    name="confirm_password"
                    placeholder='Confirm Password'
                    {...formik.getFieldProps('confirm_password')}
                    />
                    {formik.errors.confirm_password && formik.touched.confirm_password ? <span className={styles.error}>{formik.errors.confirm_password}</span> : <></>}
                    
                    <input
                        type="text"
                        className={styles.input}
                        id="address"
                        name="address"
                        placeholder='Address'
                        {...formik.getFieldProps('address')}
                    />
                    {formik.errors.address && formik.touched.address ? <span className={styles.error}>{formik.errors.address}</span> : <></>}
                    
                    <input
                        type="text"
                        className={styles.input}
                        id="email"
                        name="email"
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email ? <span className={styles.error}>{formik.errors.email}</span> : <></>}

                    <input
                        type="text"
                        className={styles.input}
                        id="confirm_email"
                        name="confirm_email"
                        placeholder='Confirm Email'
                        {...formik.getFieldProps('confirm_email')}
                    />
                    {formik.errors.confirm_email && formik.touched.confirm_email ? <span className={styles.error}>{formik.errors.confirm_email}</span> : <></>}

                    <button type="submit" className={styles.submit}>Sign Up</button>
                    <div className={styles.signup}>
                        Already Have An Account? <NavLink to='/login' className={styles.button}>Login</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
}