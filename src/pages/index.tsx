import React from 'react'
import { GetServerSideProps } from 'next'
import Tmdb from '../services/Tmdb'

import MainMovie from '../components/MainMovie'
import List from '../components/List'

import css from '../css/home.module.scss'

export default function Home({ list, chosenMovieInfo }) {
  // {console.log(list)}
  
  return (
    <div className={css.container}>      
      <MainMovie item={chosenMovieInfo} />

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

  const originals = list.filter(i => i.slug === 'originals')
  const random = Math.floor(Math.random() * originals[0].items.results.length - 1)
  const chosenMovie = originals[0].items.results[random]

  const chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv')
  
  return {
    props: { list, chosenMovieInfo }
  }
}