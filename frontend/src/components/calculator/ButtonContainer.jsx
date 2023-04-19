import { useMemo, useContext } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { operations, nums } from '../../constants/calculator';
import Button from './Button';
import { CalculatorContext } from '../../providers/CalculatorContext';
const ButtonContainer = () => {
    const {input,addToInput,triggerCalculation,resetAll} = useContext(CalculatorContext);
    const buttons = useMemo(() => {
        const mergedArr = operations.concat(nums);
        const commonBtns = mergedArr.map(calcBtnText => (
            <Button
                onClick={addToInput}
                key={calcBtnText}
                size={'huge'}
                fluid={false}
                innerText={calcBtnText}
            />
        ))/*
        const numsButtons = nums.map(number => (
            <Button
                onClick={addToInput}
                key={number}
                size={'huge'}
                fluid={false}
                innerText={number}
            />
        )) */
        const resetBtn = (
            <Button
                onClick={resetAll}
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

        return [...commonBtns, resetBtn, calculateBtn]
    }, [operations, nums,input])
    return (
        <Segment>
            <Grid padded columns={4}  >
                {buttons}
            </Grid>
        </Segment>
    )
}

export default ButtonContainer