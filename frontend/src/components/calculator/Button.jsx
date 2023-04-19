import { Button as SemanticButton } from "semantic-ui-react"
const Button = ({size, fluid, innerText,style,color = 'teal'}) => {
  return (
    <SemanticButton
        color={color}
        fluid={fluid}
        size={size}
        style={{...style,margin: 0}}
    >
        {innerText}
    </SemanticButton>
  )
}

export default Button