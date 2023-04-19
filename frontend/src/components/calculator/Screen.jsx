
import { Segment, Form } from 'semantic-ui-react';
import style from './Screen.style';
import { useContext } from 'react';
import {CalculatorContext} from '../../providers/CalculatorContext';
const Screen = () => {
    const {input,setInput,error,value} = useContext(CalculatorContext);
    return (
        <Segment>
            <Form.Input
                style={style.input}
                value={input}
                error={error ? true : false}
                placeholder='Enter a calculation!'
                onChange={(e) => setInput(e.target.value)}
                fluid
            />
            <Form.Input
                style={style.output}
                fluid
                error={error ? true : false}
                disabled={true}
                value={error ? error : value}
            />
        </Segment>
    )
}

export default Screen