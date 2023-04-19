import { useMemo, memo } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { operations, nums } from '../../constants/calculator';
import Button from './Button';
const ButtonContainer = () => {
    const buttons = useMemo(() => {
        const operationsButtons = operations.map(operation => (
            <Grid.Column key={operation} textAlign='center' style={{ padding: 0 }}>
                <Button size={'huge'} fluid={false} innerText={operation} />
            </Grid.Column>
        ))
        const numsButtons = nums.map(number => (
            <Grid.Column key={number} textAlign='center'>
                <Button  size={'huge'} fluid={false} innerText={number} />
            </Grid.Column>
        ))
        const calculateBtn = <Grid.Column key={'calculate'} textAlign='center'>
            <Button  color={'grey'} size={'huge'} style={{paddingRight: 45}} fluid={false} innerText={'Calculate!'} />
        </Grid.Column>

        return [...operationsButtons, ...numsButtons, calculateBtn]
    }, [operations, nums])
    return (
        <Segment>

            <Grid padded columns={4}  >
                {buttons}
            </Grid>
        </Segment>
    )
}

export default memo(ButtonContainer)