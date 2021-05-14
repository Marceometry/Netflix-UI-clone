import { GetServerSideProps } from 'next'
import Tmdb from '../services/Tmdb'

import List from '../components/List'

import css from '../css/home.module.scss'

export default function Home({ list }) {

  {console.log(list)}
  
  return (
    <div className={css.container}>
      <h1>Netflix</h1>
      

      <section className={css.lists}>
        {list.map((item, key) => {
          return (
            <List key={key} title={item.title} items={item.items} />
          )
        })}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await Tmdb.getHomeList()
  
  return {
    props: { list }
  }
}