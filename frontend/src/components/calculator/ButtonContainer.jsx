import { useMemo, memo } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { operations, nums } from '../../constants/calculator';
import Button from './Button';
const ButtonContainer = ({ addToInput, triggerCalculation,input, setInput,setError }) => {
    //add usecallback here
    const buttons = useMemo(() => {
        const operationsButtons = operations.map(operation => (
            <Button
                onClick={addToInput}
                key={operation}
                size={'huge'}
                fluid={false}
                innerText={operation}
            />
        ))
        const numsButtons = nums.map(number => (
            <Button
                onClick={addToInput}
                key={number}
                size={'huge'}
                fluid={false}
                innerText={number}
            />
        ))
        const resetBtn = (
            <Button
                onClick={()=>{
                    setInput('');
                    setError('');
                }}
                key={'reset'}
                size={'huge'}
                fluid={false}
                innerText={'C'}
            />
        )
        const calculateBtn = (
            <Button
                onClick={triggerCalculation}
                key={'calculate'}
                color={'grey'}
                size={'huge'}
                fluid={false}
                innerText={'='}
            />
        )

        return [...operationsButtons, ...numsButtons, resetBtn, calculateBtn]
    }, [operations, nums,input,setError,setError])
    return (
        <Segment>
            <Grid padded columns={4}  >
                {buttons}
            </Grid>
        </Segment>
    )
}

export default ButtonContainer