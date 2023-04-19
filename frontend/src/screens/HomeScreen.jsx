import Calculator from "../components/calculator/Calculator"
import NumberManager from "../components/numbermanager/NumberManager"
import CalculatorProvider from "../providers/CalculatorContext"
import { Grid } from 'semantic-ui-react'
const HomeScreen = () => {
  return (
    <>
      <Grid.Column style={{ maxWidth: 700 }}>
        <CalculatorProvider>
          <Calculator />
        </CalculatorProvider>
      </Grid.Column>
      <Grid.Column  style={{ maxWidth: 350 }} >
        <NumberManager/>
      </Grid.Column>
    </>
  )
}

export default HomeScreen