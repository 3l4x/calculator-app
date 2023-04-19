import { Form, Header } from 'semantic-ui-react'
import ButtonContainer from './ButtonContainer';
import Screen from './Screen';
const Calculator = () => {
  return (
    <div >
      <Header as='h1' color='teal' textAlign='center'>
        Calculator app
      </Header>
      <Form size='large'>
        {/*I could use context here but its only 1 layer of propdrilling so its fine */}
        <Screen />
        <ButtonContainer />
      </Form>

    </div>
  )
}

export default Calculator