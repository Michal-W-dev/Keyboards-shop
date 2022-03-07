import styles from './selectPage.module.scss'
import useBackground from '../../hooks/useBackground'
import { useRouter } from 'next/router'
import Link from 'next/link'


const SelectPage = () => {
  const backgroundImage = useBackground({ stripesNum: 4, topSatur: 30, lowSatur: 10 })
  const { route } = useRouter()

  return (
    <div className={styles.selectPage} style={{ backgroundImage }}>
      {
        ['products', 'profile'].map(pageName => {
          return (
            <Link href={`/admin/${pageName}`} key={pageName} passHref>
              <div className={route.includes(pageName) ? styles.active : ''}>{pageName}</div>
            </Link>
          )
        })
      }
    </div>
  )
}
export default SelectPage;