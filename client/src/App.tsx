import './App.css';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';




function App() {

  const [cakes, setCakes] = useState([]);

  useEffect(() => {

    getCakes().then((cakes) => {
      setCakes(cakes);
    });

  }, []);

  async function getCakes() {
    const request = await fetch('/api/cake');
    const cakes = await request.json();
    console.log(cakes);
    return cakes;
  }


  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <Typography style={{ marginBottom: 50 }} variant="h1">
            Welcome to cakey!
          </Typography>
          <Paper >
            <Grid container>

              {cakes.map((cake) =>
                <Grid item xs={4}>

                </Grid>
              )}
            </Grid>
          </Paper>

        </Container>
      </header>
    </div>
  );
}

export default App;
