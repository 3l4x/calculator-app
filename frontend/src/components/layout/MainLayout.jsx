import { Outlet } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

const MainLayout = () => {
    return (
        <>
            <nav></nav>
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