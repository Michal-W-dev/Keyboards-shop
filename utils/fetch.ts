import { Dispatch, SetStateAction } from 'react'
import axios from 'axios';
import { IProduct } from '../types'


export const getData = async (fetchedElement: string, id = '') => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${fetchedElement}/${id}.json`)
    if (!res.ok) throw Error('Fail to load data')
    const data = await res.json()
    return data
  } catch (err: any) {
    return { error: err.message || err || 'Fail to load data' }
  }
}

interface GetProducts {
  setProducts: Dispatch<SetStateAction<IProduct[]>>
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  setError?: Dispatch<SetStateAction<string>>
}

export const getProducts = ({ setProducts, setIsLoading, setError }: GetProducts) => {
  setIsLoading && setIsLoading(true)
  axios(`${process.env.NEXT_PUBLIC_DB_URL}/products/.json`)
    .then(({ data }) => Object.entries(data).map(product => (
      { _id: product[0], ...product[1] as IProduct }
    )))
    .then(products => { setProducts(products); setIsLoading && setIsLoading(false) })
    .catch(e => {
      setError && setError(e.message || 'Fail to load data');
      setIsLoading && setIsLoading(false)
    })
}

interface GetProduct {
  setProduct: Dispatch<SetStateAction<any>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string>>
}

export const getProduct = ({ setProduct, setIsLoading, setError }: GetProduct, id: string) => {
  if (id) {
    setIsLoading(true)
    axios(`${process.env.NEXT_PUBLIC_DB_URL}/products/${id}.json`)
      .then(({ data }) => { setProduct(data); setIsLoading(false) })
      .catch(e => { setError(e.message || 'Fail to load data'); setIsLoading(false) })
  }
}

interface UpdateProduct {
  setError: Dispatch<SetStateAction<string>>
  updatedProduct: any
  id: string
}


export const updateProduct = ({ setError, updatedProduct, id }: UpdateProduct) => {
  return axios.put(`${process.env.NEXT_PUBLIC_DB_URL}/products/${id}.json`,
    updatedProduct,
    { headers: { 'Content-Type': 'application/json' } })
    .catch(e => setError(e.message || 'Fail to update data'))
}


export const deleteProduct = (id: string) => {
  return axios(`${process.env.NEXT_PUBLIC_DB_URL}/products/${id}.json`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}