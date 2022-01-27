import type { NextPage } from 'next'
import { useAppDispatch, useAppSelector } from '../hooks'
import { incremented, decremented, reseted, amountAdded } from '../features/counter/counter-slice'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Image from 'next/image'

import { useFetchBreedsQuery } from '../features/dogs/dogs-api-slice'

const Home: NextPage = () => {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState(0)
  const [numDogs, setNumDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)

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
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit Starter kit</title>
        <meta name="description" content="The Starter kit by Bigdadz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Count is: <a target='_blank' href="https://github.com/bigdadz" rel="noreferrer">{ count }</a>
        </h1>

        <div className={styles.grid}>
          <button 
            className={styles.card}
            onClick={decrement}
            >
            <h2>- Decrement</h2>
          </button>

          <button
            className={styles.card}
            onClick={reset}
          >
            <h2>Reset</h2>
          </button>

          <button
            className={styles.card}
            onClick={increment}
          >
            <h2>Increment +</h2>
          </button>
        </div>

        <div className={styles.grid}>
          <button
            className={styles.card}
            onClick={amountAdd}
          >
            <h2>Add</h2>  
          </button>
          <input type="number" value={amount} onChange={handleAmountInputChange} />
        </div>
        <div className={styles.grid}>
          <p>Dogs to fetch:</p>
          <select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select> <br/>
        </div>
        { !isFetching && 
          <div className={styles.grid}>
            
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <Image
                        src={breed.image.url}
                        alt={breed.name}
                        height={250}
                        width={300}
                      />
                      {/* <img src={breed.image.url} alt={breed.name} height={250}/> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
