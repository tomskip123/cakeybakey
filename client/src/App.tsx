import './App.css';
import { Container, Grid, Typography, Paper, Button, TextField } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';




function App() {

  const [cakes, setCakes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const imageRef: any = useRef(null);

  const [formValue, setFormValue] = useState({});

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

  async function addCake() {

  }

  function handleNameChange(e) {
    setFormValue({ ...formValue, name: e.target.value });
  }

  function handleCommentChange(e) {
    setFormValue({ ...formValue, comment: e.target.value });
  }

  function submitCake() {
    console.log(formValue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <Typography style={{ marginBottom: 50 }} variant="h1">
            Welcome to cakey!
          </Typography>
          {!showForm ? <Paper style={{ padding: '20px 0' }}>
            <Button style={{ backgroundColor: 'lightblue', color: 'white' }} onClick={() => setShowForm(true)}>Add Cake</Button>
            <Grid container>

              {cakes.map((cake) =>
                <Grid item xs={4}>

                </Grid>
              )}
            </Grid>
          </Paper> : <Paper style={{ padding: '20px 0' }}>

            <Container maxWidth="sm">
              <Grid container direction="column">
                <TextField placeholder="Name" onChange={handleNameChange} style={{ marginBottom: 20 }} />
                <TextField placeholder="Comment" onChange={handleCommentChange} style={{ marginBottom: 20 }} />

                <Button onClick={() => imageRef?.current?.click()}>Image</Button>
                <input type="file" hidden ref={imageRef} />

                <Button onClick={submitCake}>Save</Button>
              </Grid>
            </Container>

          </Paper>}

        </Container>
      </header>
    </div>
  );
}

export default App;
