import { FC, MouseEvent, useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router'
import { IPeoples } from '../../types/resultAPI.interface'
import { Result } from '../Result/Result'
import styles from './Main.module.scss'

interface IMain {
  result: IPeoples | null
  isLoading: boolean
  onSearch: (endpoint: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Main: FC<IMain> = ({ result, isLoading, onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const currentDetails = searchParams.get('details')

  useEffect(() => {
    onSearch(`people/?page=${currentPage}`)
  }, [])

  const closeDetails = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.main)) {
      setSearchParams({ page: currentPage.toString() })
    }
  }

  return (
    <main className={styles.main} onClick={(e) => closeDetails(e)}>
      <Result result={result} isLoading={isLoading} onSearch={onSearch} />
      {currentDetails && <Outlet />}
    </main>
  )
}

export default Main
