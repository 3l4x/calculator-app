import { Button as SemanticButton,Grid } from "semantic-ui-react"
const Button = ({size, onClick, fluid, innerText,color = 'teal'}) => {
  return (
    <Grid.Column textAlign='center'>
        <SemanticButton
            style={{margin: 0}}
            color={color}
            fluid={fluid}
            size={size}
            onClick={onClick}
        >
            {innerText}
        </SemanticButton>
    </Grid.Column>
  )
}

export default Button