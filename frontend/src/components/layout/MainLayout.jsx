import { Outlet } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

const MainLayout = () => {
    return (
        <>
            <nav></nav>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Outlet />
                </Grid.Column>
            </Grid>
            <footer></footer>
        </>
    )
}

export default MainLayout