import Calculator from "../components/calculator/Calculator"
import CalculatorProvider from "../providers/CalculatorContext"
const HomeScreen = () => {
  return (
    <CalculatorProvider>
      <Calculator />
    </CalculatorProvider>
  )
}

export default HomeScreen