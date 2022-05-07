/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {

  const router = useRouter();
  
  useEffect(() => {
    setTimeout(() => {
    router.push("/1")
    }, 1000);
  }, [])

  return <></>;
}

export default Redirect;