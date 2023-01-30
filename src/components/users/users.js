import './users.css';
import { SignSuccesfully } from '../loader/loader';
import { Error } from '../loader/loader';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { firestoreDB, app } from '../../service/firebase';
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';


const auth = getAuth(app);

const Users = (props) => {

    const [error, setError] = useState(false);
    const [succes, setSucess] = useState(false);
    const [view, setView] = useState(false);

    const AuthHandler = async (e) => {

        e.preventDefault();
        const email = e.target.elements.email.value;
        const pass = e.target.elements.pass.value;
        const rpass = e.target.elements.rpass.value;
        const obtains = 20;

        if (pass === rpass && pass.length >= 8) {

            const auth = getAuth();

            const infoUser = await createUserWithEmailAndPassword(auth, email, pass).then((firebaseUser) => {
                return firebaseUser;
            });

            const docRef = doc(firestoreDB, `users/${infoUser.user.uid}`);
            setDoc(docRef, { email: email, password: pass, obtains: obtains });

            setError(false);
            setSucess(true);

        } else {

            setError(true);

        }

    }

    const loginHandler = async (e) => {

        e.preventDefault();

        const email = e.target.elements.email.value;
        const pass = e.target.elements.pass.value;

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, pass)
                    .then((userCredentials) => {

                        props.setUserData(userCredentials);
                        console.log(email);
                    })
                    .catch((error) => {
                        const errorCode = error.code;

                        console.log(errorCode);
                    });
            })
    }

    const Login = () => {
        return (
            <div className='b-color'>
                <div className='form-size'>
                    <form className='form' onSubmit={loginHandler}>
                        <h2 className='form-title'>Login</h2>
                        <div className='form-container'>
                            <div className='form-group'>
                                <input className="form-input" type="text" name="email" id="email" placeholder=' ' />
                                <label for="email" className='form-label'>Email:</label>
                                <span className='form-line'></span>
                            </div>
                            <div className='form-group'>
                                <input className="form-input" type="password" name="pass" id="pass" placeholder=' ' />
                                <label for="password" className='form-label'>Password:</label>
                                <span className='form-line'></span>
                            </div>
                            <button className='form-button' type="submit">Enter account</button>
                        </div>
                    </form>
                    <button className='setView-button' onClick={() => setView(!view)}>Dont have account? Sign In</button>
                    {error ? <Error></Error> : null}
                </div>
            </div>
        )
    }

    const SignIn = () => {

        return (

            <div className='b-color'>
                <div className='form-size'>
                    <form className='form' onSubmit={AuthHandler}>
                        <h2 className='form-title'>Sign In</h2>
                        <div className='form-container'>
                            <div className='form-group'>
                                <input className="form-input" type="text" name="email" id="email" placeholder=' ' />
                                <label for="email" className='form-label'>Email:</label>
                                <span className='form-line'></span>
                            </div>
                            <div className='form-group'>
                                <input className="form-input" type="password" name="pass" id="pass" placeholder=' ' />
                                <label for="password" className='form-label'>Password:</label>
                                <span className='form-line'></span>
                            </div>
                            <div className='form-group'>
                                <input className="form-input" type="password" name="rpass" id="rpass" placeholder=' ' />
                                <label for="repeatPassword" className='form-label'>Repeat password:</label>
                                <span className='form-line'></span>
                            </div>
                            <button className='form-button' type="submit">Register account</button>
                        </div>
                    </form>
                    <button className='setView-button' onClick={() => setView(!view)}>You have a account? Login</button>
                    {error ? <Error></Error> : null}
                    {succes ? <SignSuccesfully /> : null}
                </div>
            </div>
        )
    }

    return (
        <div>
            {view ? <SignIn></SignIn> : <Login></Login>}
        </div>
    )
}

export default Users;