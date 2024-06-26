import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import { Form, Button, Alert } from 'react-bootstrap';

const SignupForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const { data } = await addUser({
                variables: { ...userFormData }
            });
            Auth.login(data.addUser.token);
        }
        catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} varient='danger'>
                    Something went wrong with signup!
                </Alert>

                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your username'
                        name= 'username'
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Username required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Your email'
                        name= 'email'
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Email required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Your password'
                        name= 'password'
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>Password required!</Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SignupForm;