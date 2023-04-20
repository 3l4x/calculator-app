import {Menu, Container, Dropdown, Image}  from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  return (
    <Menu fixed='top' inverted>
    <Container>
      <Menu.Item
        as='div'
        header
        onClick={() => navigate('/')}
      >
        Home
      </Menu.Item>
      <Menu.Item
        as='div'
        onClick={() => navigate('/login')}
      >
        Login
      </Menu.Item>
      <Menu.Item
        as='div'
        onClick={() => navigate('/register')}
      >
        Register
      </Menu.Item>
    </Container>
  </Menu>
  )
}

export default Header