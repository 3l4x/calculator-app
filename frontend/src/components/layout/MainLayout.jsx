import { Outlet } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import Header from '../common/Header';

const MainLayout = () => {
    return (
        <>
            <Header/>
            <main
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid
                    textAlign='center'
                    verticalAlign='top'
                    columns={2}
                >
                    <Outlet />
                </Grid>
            </main>
            <footer></footer>
        </>
    )
}

export default MainLayout