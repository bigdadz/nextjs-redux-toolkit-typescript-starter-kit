import type { NextPage } from 'next'
import { useAppDispatch, useAppSelector } from '../hooks'
import { incremented, decremented, reseted, amountAdded } from '../features/counter/counter-slice'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home: NextPage = () => {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState(0)

  const increment = () => {
    dispatch(incremented())
  }

  const decrement = () => {
    dispatch(decremented())
  }
  
  const reset = () => {
    dispatch(reseted())
  }

  const amountAdd = () => {
    dispatch(amountAdded(amount))
  }

  const handleAmountInputChange = (event: { currentTarget: { value: string } }) => {
    setAmount(parseInt(event.currentTarget.value))
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ 
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Grid container justifyContent="center" spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            <Item>
              <h1>
                Count is: <a target='_blank' href="https://github.com/bigdadz" rel="noreferrer">{count}</a>
              </h1>
            </Item>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={decrement}
            >
              <h2>- Decrement</h2>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color='primary'
              size="large"
              onClick={reset}
            >
              <h2>Reset</h2>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color='success'
              size="large"
              onClick={increment}
            >
              <h2>Increment +</h2>
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid container justifyContent="right" spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item>
            <Button
              variant="outlined"
              size="large">
              <Link href="/dogs">
                Go to Dogs
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
    // <div className={styles.container}>
    //   <Head>
    //     <title>Redux Toolkit Starter kit</title>
    //     <meta name="description" content="The Starter kit by Bigdadz" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main}>
        // <h1 className={styles.title}>
        //   Count is: <a target='_blank' href="https://github.com/bigdadz" rel="noreferrer">{ count }</a>
        // </h1>

    //     <div className={styles.grid}>
          //  <Button 
          //   variant="contained"
          //   size="large"
          //   onClick={decrement}
          //   >
          //   <h2>- Decrement</h2>
          // </Button>

          // <Button
          //   variant="contained"
          //   size="large"
          //   onClick={reset}
          // >
          //   <h2>Reset</h2>
          // </Button>

          // <Button
          //   variant="contained"
          //   size="large"
          //   onClick={increment}
          // >
          //   <h2>Increment +</h2>
          // </Button>
    //     </div>
    //     <br />
        
    //     <div className={styles.grid}>
    //       <Paper
    //         component="form"
    //         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    //       >
    //         <InputBase
    //           sx={{ ml: 1, flex: 1 }}
    //           placeholder="Search Google Maps"
    //           inputProps={{ 'aria-label': 'search google maps' }}
    //           type="number"
    //           value={amount}
    //           onChange={handleAmountInputChange}
    //         />
    //         <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    //         <IconButton 
    //           color="primary" 
    //           sx={{ p: '10px' }} 
    //           aria-label="directions"
    //           onClick={amountAdd}
    //           >
    //           <AddIcon />
    //         </IconButton>
    //       </Paper>
    //     </div>
    //     <div className={styles.grid}>
          // <Button
          //   variant="contained"
          //   size="large">
          //   <Link href="/dogs">
          //     Go to Dogs
          //   </Link>
          // </Button>
    //     </div>
    //   </main>


    // </div>
  )
}

export default Home
