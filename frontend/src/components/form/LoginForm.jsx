import { Form, Button, Segment } from 'semantic-ui-react';
import { useLoginMutation } from '../../redux/auth/authApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();
    return (
        <Form size='large'
            onSubmit={async (e) => {
                const {email,password} = new FormData(e.target);
                await login({
                    email,password
                }).unwrap()
                    .then(() => {
                        setShowSuccessMsg(true);
                        setTimeout(() => {
                            navigate('/');
                        }, 2000)
                    })
                    .catch((err) => {
                        if (!err.status) {
                            /* console.log(err); */
                            setLoginError('Internal server error');
                        }
                        else if (err.status === 422) {
                            setLoginError('Invalid data provided.');
                        }
                        else {
                            /* console.log(err.data); */
                            setLoginError('Unknown error');
                        }
                    })
            }}
        >
            <Segment stacked>
                {loginError}
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
                <Button
                    color='teal'
                    fluid size='large'
                >
                    Login
                </Button>
            </Segment>
        </Form>
    )
}

export default LoginForm