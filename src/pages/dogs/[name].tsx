import type { NextPage } from 'next'
import { useState } from 'react'
import { getRunningOperationPromises, searchBreed, useAddVoteMutation, useFetchImageQuery, useSearchBreedQuery } from '../../features/dogs/dogs-api-slice'
import { useAppDispatch } from '../../hooks'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { wrapper } from '../../store'
import Image from 'next/image'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;
    if (typeof name === "string") {
      store.dispatch(searchBreed.initiate(name));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

const Dogs: NextPage = () => {
  const router = useRouter()
  const [addVote, { isLoading: isUpdating }] = useAddVoteMutation()
  const { data: dog, error, isLoading, isSuccess: breedSuccess } = useSearchBreedQuery(router.query.name as string)
  const { data: dogImage, isLoading: dogImageLoading } = useFetchImageQuery(dog?.reference_image_id, { skip: !breedSuccess })
  

  // Handle Error View
  // if (error?.status == 404) return <h1>Not Found</h1>
  if (dog?.id == undefined) return <h1>Not Found</h1>
  if (isLoading) return <h1>Loading</h1>
  console.log(dogImage)
  return (
    <>
      {!dogImageLoading && (
        <Image
          src={dogImage?.url as string}
          alt={dogImage?.id}
          height={250}
          width={300}
        />
      )}
      <br/>
      <button
        className={styles.card}
        onClick={() => {
          addVote({ image_id: dogImage?.id, sub_id: "test", value: 2 })
        }}
      >
        <h2>Vote</h2>
      </button>
    </>
  )
}

export default Dogs