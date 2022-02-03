import type { NextPage } from 'next'
import { useState } from 'react'
import { getRunningOperationPromises, searchBreed, useAddVoteMutation, useFetchBreedsQuery, useFetchImageQuery, useSearchBreedQuery } from '../../features/dogs/dogs-api-slice'
import { useAppDispatch } from '../../hooks'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { wrapper } from '../../store'
import Image from 'next/image'
import Link from 'next/link'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === "string") {
      // store.dispatch(searchBreed.initiate(name));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

const DogsHome: NextPage = () => {
  const [numDogs, setNumDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)
  
  
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <p>Dogs to fetch:</p>
        <select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select> <br />
      </div>
      
        {!isFetching && 
          <div className={styles.grid}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {data.map((breed) => (
                  <tr key={breed.id}>
                    <td>
                      <Link href={`/dogs/${breed.name}`}>Show</Link>
                    </td>
                    <td>{breed.name}</td>
                    <td>
                      <Image
                        src={breed.image.url}
                        alt={breed.name}
                        height={250}
                        width={300}
                      />
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
  )
}

export default DogsHome