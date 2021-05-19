import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Tmdb from '../services/Tmdb'

import { MovieProvider } from '../contexts/MovieContext'
import Header from '../components/Header'
import MainMovie from '../components/MainMovie'
import List from '../components/List'
import Footer from '../components/Footer'

import css from '../css/home.module.scss'

export default function Home({ list, chosenMovieInfo }) {
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])
  
  return (
    <div className={css.container}>
      <Head>
        <title>Netflix</title>
      </Head>

      <Header bg={blackHeader} />

      <MovieProvider chosenMovieInfo={chosenMovieInfo}>
        <MainMovie />

        <section className={css.lists}>
          {list.map((item, key) => {
            return (
              <List key={key} title={item.title} items={item.items} />
            )
          })}
        </section>
      </MovieProvider>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {  
  const list = await Tmdb.getHomeList()

  let randomListIndex = Math.floor(Math.random() * list.length - 1)
  if (list[randomListIndex] === undefined || null) {
    randomListIndex = 0
  }

  let randomItem = Math.floor(Math.random() * list[randomListIndex].items.results.length - 1)
  let chosenMovie = list[randomListIndex].items.results[randomItem]

  if (chosenMovie === undefined || null) {
    chosenMovie = list[randomListIndex].items.results[0]
  }
  
  if (chosenMovie.first_air_date) {
    var chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv')
  } else if (chosenMovie.release_date) {
    var chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'movie')
  }

  return {
    props: { list, chosenMovieInfo }
  }
}