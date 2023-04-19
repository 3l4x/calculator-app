import { Form, Header } from 'semantic-ui-react'
import ButtonContainer from './ButtonContainer';
import Screen from './Screen';
import { useState } from 'react';
import { evaluate } from 'mathjs'
const Calculator = () => {
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('')
  const addToInput = (e) => {
    setInput((prevState) => (prevState + e.target.innerText))
  };

  const triggerCalculation = () => {
    try {
      const result = evaluate(input);
      setValue(result);
      setError('');
    } catch (error) {
      setError('Invalid input!')
      setValue('')
    }
  };
  return (
    <div >
      <Header as='h1' color='teal' textAlign='center'>
        Calculator app
      </Header>
      <Form size='large'>
        {/*I could use context here but its only 1 layer of propdrilling so its fine */}
        <Screen inputProps={{ input, setInput }} errorAndValue={{ error, value }} />
        <ButtonContainer addToInput={addToInput} triggerCalculation={triggerCalculation} input={input} setInput={setInput} setError={setError} />
      </Form>

    </div>
  )
}

export default Calculator