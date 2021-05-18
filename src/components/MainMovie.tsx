import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import css from '../css/components/mainMovie.module.scss'

export default function MainMovie({ item }) {
    const relevance = `${item.vote_average * 10}%`

    if (item.first_air_date) {
        var date = format(parseISO(item.first_air_date), 'yyyy')
    } else if (item.release_date) {
        var date = format(parseISO(item.release_date), 'yyyy')
    }

    let description = item.overview
    if (description.length > 300) {
        description = description.substring(0, 300) + '...'
    }
    
    const genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    if (item.number_of_seasons) {
        var seasonsOrDuration = `${item.number_of_seasons} temporada${item.number_of_seasons > 1 ? 's' : ''}`
    } else if (item.runtime) {
        var seasonsOrDuration = `${item.runtime} min`
    }

    return (
        <section className={css.container} style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className={css.vertical}>
                <div className={css.horizontal}>
                    <h1 className={css.name}>{item.name ? item.name : item.title ? item.title : ''}</h1>

                    <div className={css.info}>
                        <span className={css.relevance}>{relevance} relevante</span>
                        <span className={css.year}>{date}</span>
                        <span className={css.seasons}>{seasonsOrDuration}</span>
                    </div>
                    
                    <p className={css.description}>{description}</p>

                    <div className={css.buttons}>
                        <button>&#9654; Assistir</button>
                        <button>+ Minha Lista</button>
                    </div>

                    <span className={css.genres}><strong>Gêneros:</strong> {genres.join(', ')}</span>
                </div>
            </div>
        </section>
    )
}