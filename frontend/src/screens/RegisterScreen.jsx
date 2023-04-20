import {Grid,Header,Message} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/form/RegisterForm';
const RegisterScreen = () => {
    const navigate = useNavigate();
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 350 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register an account
                </Header>
                <RegisterForm/>
                <Message>
                    Already a member? <a onClick={(e)=>{
                        e.preventDefault();
                        navigate('/login');
                    }}>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default RegisterScreen