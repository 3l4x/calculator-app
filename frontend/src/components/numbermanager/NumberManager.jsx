import { Segment, Button, Header, Form, Label, Divider } from "semantic-ui-react"
import { selectUser } from "../../redux/auth/authSlice"
import { useSelector } from "react-redux"
import { useGetNumberQuery, usePostNumberMutation } from "../../redux/calculator/calculatorApiSlice"
import { useCallback, useContext, useEffect, useState } from "react"
import { CalculatorContext } from "../../providers/CalculatorContext"
const NumberManager = () => {
    const clearMessages = useCallback(() => {
        //clear messages after 2 seconds
        setTimeout(() => {
            setSuccessMsg('');
            setErrorMsg('');
        }, 2000)
    }, [])

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const { value, input, setInput } = useContext(CalculatorContext);
    const user = useSelector(selectUser);

    //query
    const { data: number, isFetching, error: getError } = useGetNumberQuery(null, {
        skip: !user,

    });

    useEffect(()=>{
        console.log(number);
    },[number])

    //mutation
    const [postNumber, { isLoading }] = usePostNumberMutation({
        refetchQuereies: [{query : useGetNumberQuery}]
    });

    return (
        <>
            <Header as='h2' style={{ marginBottom: 20 }} color='teal' textAlign='center'>
                Number manager
            </Header>
            {
                user ? (
                    <Segment style={{ display: 'flex', flexDirection: 'column', gap: 5 }} stacked>
                        <Label size="large">User actions</Label>
                        <Button color='teal' size='small'
                            onClick={async () => {
                                if (!value) {
                                    setErrorMsg('No number to save. Please calculate something first.');
                                    clearMessages();
                                    return;
                                }
                                await postNumber(value)
                                    .unwrap()
                                    .then((response) => {
                                        setSuccessMsg('Number saved successfully!');
                                    }).catch((err) => {
                                        if (!err.status) {
                                            setErrorMsg('Internal server error');
                                        }
                                        else if (err.status === 404) {
                                            setErrorMsg('User not found');
                                        }
                                        else if (err.status === 401) {
                                            setErrorMsg('Invalid credentials');
                                        }
                                        else if (err.status === 400) {
                                            setErrorMsg('Expression missing.');
                                        }
                                        else if (err.status === 422) {
                                            setErrorMsg('Invalid expression provided.');
                                        }
                                        else {
                                            /* console.log(err.data); */
                                            setErrorMsg('Unknown error');
                                        }
                                    }).finally(() => {
                                        clearMessages();
                                    })
                            }}
                        >
                            Save result to server
                        </Button>
                        <Button color='teal' size='small'
                            style={{ marginBottom: 20 }}
                            onClick={() => {
                                console.log(number);
                                if (number) setInput(number);
                            }}
                        >
                            Load saved to calculator
                        </Button>
                        {errorMsg && <Label color='red' style={{ opacity: 0.5 }}>
                            {errorMsg}
                        </Label>}
                        {successMsg && <Label color='green' style={{ opacity: 0.5 }}>
                            {successMsg}
                        </Label>}

                        <Divider />
                        <Label size="large">Currently saved number</Label>
                        <Form.Input
                            fluid
                            error={(getError) ? true : false}
                            disabled={true}
                            value={(getError ?? (number ?? 'No number saved'))}
                        />
                    </Segment>
                ) : (
                    <Segment style={{ display: 'flex', flexDirection: 'column', gap: 20 }} stacked>
                        You must be logged in to use this feature!
                    </Segment>
                )
            }
        </>
    )
}

export default NumberManager