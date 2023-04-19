import { Segment, Button,Header } from "semantic-ui-react"
const NumberManager = () => {
    return (
        <>
            <Header as='h2' style={{marginBottom: 20}} color='teal' textAlign='center'>
                Number manager
            </Header>
            <Segment style={{display: 'flex', flexDirection: 'column', gap: 20}} stacked>
                <Button color='teal' fluid size='large'>
                    Save Number
                </Button>
                <Button color='teal' fluid size='large'>
                    Get saved number
                </Button>
            </Segment>

        </>
    )
}

export default NumberManager