import { Form, Button, Segment } from 'semantic-ui-react';
import { useRegisterMutation } from '../../redux/auth/authApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
    const [register, { isLoading }] = useRegisterMutation();
    const [registrationError, setRegistrationError] = useState(null);
    const navigate = useNavigate();
    return (
        <Form size='large'
            onSubmit={async (e) => {
                const formData = new FormData(e.target);
                const email = formData.get('email');
                const password = formData.get('password');
                const confirmPassword = formData.get('confirm-password');
                if(password !== confirmPassword){
                    setRegistrationError('Passwords do not match');
                    return;
                }
                await register({
                    email,password
                }).unwrap()
                    .then(() => {
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000)
                    })
                    .catch((err) => {
                        if (!err.status) {
                            /* console.log(err); */
                            setRegistrationError('Internal server error');
                        }
                        else if (err.status === 422) {
                            setRegistrationError('Invalid registration data provided.');
                        }
                        else if (err.status === 409) {
                            setRegistrationError('A user already exists with that email.');
                        }
                        else {
                            /* console.log(err.data); */
                            setRegistrationError('Unknown error');
                        }
                    })
            }}
        >
            <Segment stacked>
                {registrationError}
                <Form.Input
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name='email'
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                />
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Confirm password'
                    type='password'
                    name='confirm-password'
                />
                <Button
                    color='teal'
                    fluid size='large'
                >
                    Register
                </Button>
            </Segment>
        </Form>
    )
}

export default RegisterForm