import { useRouter } from 'next/router'

const CartRedirect = () => {
  useRouter().replace('/cart/_')
  return <></>
}

export default CartRedirect;
