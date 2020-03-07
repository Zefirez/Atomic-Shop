import React from 'react';

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'


import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        //draw sign-up info from this.state
        const { displayName, email, password, confirmPassword } = this.state;

        //stop execution of passwords do not match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            //send new user data to firebase to create a new user with provided info
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            //merge said data with displayName and insert it into our user database
            await createUserProfileDocument(user, { displayName })
            //mission complete, time to clear the state object
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h1 className='title'>I do not have an account</h1>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='DisplayName'
                        required />

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required />

                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required />

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required />

                    <CustomButton type='Sumbit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp