import {Grid,Form,Header,Image,Segment,Button,Message} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
const LoginScreen = () => {
    const navigate = useNavigate();
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ width: 350 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
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

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
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