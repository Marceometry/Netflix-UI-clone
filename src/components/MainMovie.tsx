import { format, parseISO } from 'date-fns'
import css from '../css/components/mainMovie.module.scss'

export default function MainMovie({ item }) {
    const date = format(parseISO(item.first_air_date), 'yyyy')
    
    const genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    return (
        <section className={css.container} style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className={css.vertical}>
                <div className={css.horizontal}>
                    <h1 className={css.name}>{item.name}</h1>

                    <div className={css.info}>
                        <span className={css.points}>{item.vote_average} pontos</span>
                        <span className={css.year}>{date}</span>
                        <span className={css.seasons}>{item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's' : ''}</span>
                    </div>
                    
                    <p className={css.description}>{item.overview}</p>

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