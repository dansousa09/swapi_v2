import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useData } from '../contexts/data'
import { ICharacter, ICharacters } from '../interfaces/ICharacter'
import styles from '../styles/Home.module.css'

interface Props {
  newData: ICharacters;
}

const Home: NextPage<Props> = ({ newData }) => {

  const { data, handleSetData } = useData();
  console.log(data)

  useEffect(() => {
    handleSetData(newData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data?.results?.map((character: ICharacter) => {
          const id = character.url.split('people/')[1];
          return (
            <li key={character.created}>
              <Link href={`/character/${id}`}  >
                <a>
                  <h2>{character.name}</h2>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://swapi.dev/api/people?page=${params?.page}`);
  const data = await res.json();

  return {
    props: {
      newData: data
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://swapi.dev/api/people`);
  const data = await res.json();
  const paths = []
  for (let i = 0; i < data.count; i++) {
    const { count } = data;
    const qntPages = Math.ceil(count / 10);
    for (let j = 1; j <= qntPages; j++) {
      const param = {
        params: {
          page: j.toString()
        }
      }
      paths.push(param);
    }
  }

  return {
    paths,
    fallback: false
  }
}



export default Home
