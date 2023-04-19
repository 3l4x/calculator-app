
import { Segment, Form } from 'semantic-ui-react';
import style from './Screen.style';
const Screen = () => {
    return (
        <Segment>

            <Form.Input style={style.input} fluid placeholder='Enter a number' />
        </Segment>
    )
}

export default Screen