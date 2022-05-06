import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {

  const router = useRouter();
  
  useEffect(() => {
    router.push("/1")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>;
}

export default Redirect;