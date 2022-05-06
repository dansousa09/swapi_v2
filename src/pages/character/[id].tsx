import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ICharacter } from "../../interfaces/ICharacter";

interface IProps {
  data: ICharacter;
}

const Character: NextPage<IProps> = ({ data }) => {
  // console.log(data);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="container">
      <h1>{data.name}</h1>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch('https://swapi.dev/api/people/' + params?.id);
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const res = await fetch('https://swapi.dev/api/people');
  const data = await res.json();

  const paths = []
  
  for (let i = 1; i <= data.count; i++) {
    const id = i.toString();
    let param = {
      params: {
        id
      }
    }
    paths.push(param);
  }

  return {
    paths,
    fallback: false
  }
}

export default Character;