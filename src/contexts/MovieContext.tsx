import { createContext, useEffect, useState } from 'react'
import Tmdb from '../services/Tmdb'

type currentMovie = {
    name: string
    title: string
    id: number
    vote_average: number
    backdrop_path: string
    first_air_date: string
    release_date: string
    overview: string
    genres: { name: string }
    number_of_seasons: number
    runtime: number
}

type MovieContextProps = {
    loading: boolean
    currentMovie: currentMovie
    stopLoading: () => void
    selectMovie: (item: currentMovie) => void
}

export const MovieContext = createContext({} as MovieContextProps)

export function MovieProvider({ children, chosenMovieInfo }) {
    const [currentMovie, setCurrentMovie] = useState(chosenMovieInfo)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCurrentMovie(chosenMovieInfo)
    }, [chosenMovieInfo])

    async function selectMovie(item: currentMovie) {
        setLoading(true)
        if (item.first_air_date) {
            setCurrentMovie(await Tmdb.getMovieInfo(item.id, 'tv'))
        } else if (item.release_date) {
            setCurrentMovie(await Tmdb.getMovieInfo(item.id, 'movie'))
        }        
    }

    function stopLoading() {
        setLoading(false)
    }

    return (
        <MovieContext.Provider value={{ currentMovie, selectMovie, loading, stopLoading }}>
            {children}            
        </MovieContext.Provider>
    )
}