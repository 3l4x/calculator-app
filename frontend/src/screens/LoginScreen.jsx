import {Grid,Header,Message} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/form/LoginForm';
const LoginScreen = () => {
    const navigate = useNavigate();
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 350 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <LoginForm/>
                <Message>
                    Not a member yet? <a onClick={(e)=>{
                        e.preventDefault();
                        navigate('/register');
                    }}>Sign up!</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default LoginScreen