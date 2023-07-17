import { useState } from "react";

import Button from "../button/button.components";
import FormInput from "../form-input/form-input.components";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
 } from "../../utils/firebase/firebase.utils";


 const defaultFormFields = {
    email: '',
    password: '',
 };

 const SignInForm = () =>{
    const [FormFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = FormFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth( user );
    }

    const hadleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error)
                
            }
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...FormFields, [name]: value })
    };

    return (
        <div>
            <h2>Already have an account?</h2>
            <span>Sing in with your email and password</span>
            <form onSubmit={hadleSubmit}>
                <FormInput
                    label = 'Email'
                    type = 'email'
                    required
                    onChange = {handleChange}
                    name = 'email'
                    value = {email}
                />
                 <FormInput
                    label = 'Password'
                    type = 'password'
                    required
                    onChange = {handleChange}
                    name = 'password'
                    value = {password}
                />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
 };


 export default SignInForm;