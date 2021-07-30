import './App.css';
import { Container, Grid, Typography, Paper } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <Typography style={{marginBottom: 50}} variant="h1">
            Welcome to cakey!
          </Typography>
          <Paper >
            <Grid container>

              <Grid item>
                <h1>welcome</h1>
              </Grid>

            </Grid>
          </Paper>

        </Container>
      </header>
    </div>
  );
}

export default App;
