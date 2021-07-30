import './App.css';
import { Container, Grid, Typography, Paper, Button, TextField } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { Edit, Delete } from '@material-ui/icons'




function App() {

  const [cakes, setCakes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const imageRef: any = useRef(null);

  const [formValue, setFormValue]: [any, any] = useState({});
  const [imageValue, setImageValue] = useState<File | any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    setLoaded(false);
    getCakes().then((cakes) => {
      setCakes(cakes);
      setLoaded(true);
    });

  }, []);

  async function getCakes() {
    const request = await fetch('/api/cake');
    const cakes = await request.json();
    console.log(cakes);
    return cakes;
  }


  function handleNameChange(e: any) {
    setFormValue({ ...formValue, name: e.target.value });
  }

  function handleCommentChange(e: any) {
    setFormValue({ ...formValue, comment: e.target.value });
  }

  function handleImageChange(e: any) {
    setImageValue(e.target.files[0]);
  }

  function handleYumFactorChange(e: any) {
    setFormValue({ ...formValue, yumFactor: e.target.value })
  }


  async function handleDelete(cake: any) {
    try {
      const result = await fetch(`http://localhost/api/cake/${cake.id}`, { method: 'DELETE', });
      setCakes(await getCakes());
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleEdit(cake: any) {
    setFormValue(cake);
    setShowForm(true);
  }

  async function submitCake() {
    try {

      const fd = new FormData();
      fd.append('data', JSON.stringify(formValue));
      if (imageValue) {
        fd.append('image', imageValue);
      }

      if (!(formValue as any).id) {

        const result = await fetch('http://localhost/api/cake', {
          method: 'POST',
          body: fd
        }).catch(e => console.log(e));
      } else {

        const result = await fetch(`http://localhost/api/cake/${(formValue as any).id}`, {
          method: 'PUT',
          body: fd
        }).catch(e => console.log(e));
      }

      setShowForm(false);
      setFormValue({})
      setCakes(await getCakes());
    } catch (e) {
      alert(e.message);
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <Typography style={{ marginBottom: 50 }} variant="h1">
            Welcome to cakey!
          </Typography>
          {!showForm ?

            <Paper style={{ padding: '20px 10px' }}>
              <Button style={{ backgroundColor: 'lightblue', color: 'white', marginBottom: 10 }} onClick={() => setShowForm(true)}>Add Cake</Button>

              {!loaded ? <Typography>Loading</Typography> :
                <Grid container>


                  {
                    cakes?.length > 0 ? cakes.map((cake: any) =>
                      <Grid item xs={4} style={{ cursor: 'pointer' }}>
                        <img src={cake.imageUrl} style={{ width: '100%' }} />
                        <div style={{ textAlign: 'left' }}>
                          <Typography variant="body1">{cake.name}</Typography>
                          <Typography variant="body2">{cake.comment}</Typography>

                          <Button onClick={() => handleEdit(cake)}>
                            <Edit />
                          </Button>

                          <Button onClick={() => handleDelete(cake)}>
                            <Delete />
                          </Button>
                        </div>
                      </Grid>
                    ) : <Typography variant="h5">Please Add some scrummy cakes</Typography>
                  }
                </Grid>
              }

            </Paper>

            :

            <Paper style={{ padding: '20px 0' }}>

              <Container maxWidth="sm">
                <Grid container direction="column">
                  <TextField placeholder="Name" onChange={handleNameChange} value={formValue.name} style={{ marginBottom: 20 }} />
                  <TextField placeholder="Comment" onChange={handleCommentChange} value={formValue.comment} style={{ marginBottom: 20 }} />
                  <TextField type="number" placeholder="Yummy Yummy Factor" value={formValue.yumFactor} onChange={handleYumFactorChange} style={{ marginBottom: 20 }} />

                  <Button onClick={() => imageRef?.current?.click()}>Image</Button>
                  <input type="file" onChange={handleImageChange} hidden ref={imageRef} />

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
