import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CartRedirect = () => {
  const { replace } = useRouter()
  useEffect(() => { replace('/cart/_') }, [replace])
  return <></>
}

export default CartRedirect;
