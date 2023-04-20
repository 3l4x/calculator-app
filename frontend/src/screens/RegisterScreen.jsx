import {Grid,Form,Header,Image,Segment,Button,Message} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
const RegisterScreen = () => {
    const navigate = useNavigate();
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 350 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register an account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
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