import {createContext,useState} from 'react'
import { evaluate } from 'mathjs'


export const CalculatorContext = createContext();

const CalculatorProvider = ({children}) => {
    const [input, setInput] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('')

    const addToInput = (e) => {
        setInput((prevState) => (prevState + e.target.innerText))
    };

    const resetAll = () => {
        setValue('');
        setError('');
        setInput('');
    }


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
        <CalculatorContext.Provider value={{input,setInput ,value, error, addToInput, resetAll, triggerCalculation}}>
            {children}
        </CalculatorContext.Provider>
    )
}


export default CalculatorProvider;