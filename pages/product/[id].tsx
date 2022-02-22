import { useRouter } from 'next/router'
import products from '../../data/product'
import Image from 'next/image'

const Product = () => {
  const { query } = useRouter()

  let productId: number;
  if (query.id && !Array.isArray(query.id)) productId = Number(query.id);
  else return <h1>loading..</h1>;
  if (!products[productId]) return <h1>Id does not exist</h1>;

  const { images, name } = products[productId];

  return (
    <div>
      <h1>{name}</h1>
      {images.map((src, idx) => (
        <div key={idx} style={{ width: '50%', height: '350px', position: 'relative', display: 'inline-block' }}>
          <Image src={src} alt={name} layout='fill' objectFit='contain' />
        </div>
      ))}
    </div>
  )
}
export default Product;