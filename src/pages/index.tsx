import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Tmdb from '../services/Tmdb'

import MainMovie from '../components/MainMovie'
import List from '../components/List'

import css from '../css/home.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

      <MainMovie item={chosenMovieInfo} />

      <section className={css.lists}>
        {list.map((item, key) => {
          return (
            <List key={key} title={item.title} items={item.items} />
          )
        })}
      </section>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await Tmdb.getHomeList()

  const originals = list.filter(i => i.slug === 'originals')
  const random = Math.floor(Math.random() * list[1].items.results.length - 1)
  const chosenMovie = list[1].items.results[random]
  let chosenMovieInfo = null

  if (chosenMovie?.first_air_date) {
    chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv')
  } else if (chosenMovie?.release_date) {
    chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'movie')
  }

  console.log(chosenMovieInfo)
  
  return {
    props: { list, chosenMovieInfo }
  }
}