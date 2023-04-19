import { Form, Header} from 'semantic-ui-react'
import ButtonContainer from './ButtonContainer';
import Screen from './Screen';
const Calculator = () => {
  return (
    <div >
      <Header as='h1' color='teal' textAlign='center'>
        Calculator app
      </Header>
      <Form size='large'>
          <Screen />
          <ButtonContainer />
      </Form>

    </div>
  )
}

export default Calculator