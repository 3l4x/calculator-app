import { Menu, Container, Dropdown, Image } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUser } from '../../redux/auth/authSlice';
import { useLogoutMutation } from '../../redux/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { deleteCredentials } from '../../redux/auth/authSlice';
const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const [logoutError, setLogoutError] = useState('');
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

        {
          !user ? (
            <>
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
            </>

          ) : (
            <Menu.Item
              as='div'
              onClick={async () => {
                await logout()
                  .unwrap()
                  .then(() => {
                    dispatch(deleteCredentials());
                  })
                  .catch((err) => {
                    if (!err.originalStatus) {
                      setLogoutError('Internal server error');
                    }
                    else if (err.originalStatus === 401) {
                      setLogoutError('Invalid logout request');
                    }
                    else {
                      setLogoutError('Unknown error');
                    }
                    console.log(logoutError);
                  })
                  .finally(() => {
                    setTimeout(() => {
                      setLogoutError('')
                      navigate('/');
                      window.location.reload(); //refreshing page,emptying cache
                    }, 1500)
                  })
              }}
            >
              Logout
            </Menu.Item>
          )
        }
      </Container>
    </Menu>
  )
}

export default Header