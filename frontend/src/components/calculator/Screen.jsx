
import { Segment, Form } from 'semantic-ui-react';
import style from './Screen.style';
import { useEffect } from 'react';
const Screen = ({ inputProps: {input, setInput }, errorAndValue : {error, value} }) => {
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