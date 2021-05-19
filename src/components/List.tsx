import { useContext, useState } from 'react'
import { Link } from 'react-scroll'
import { MovieContext } from '../contexts/MovieContext'
import css from '../css/components/list.module.scss'

export default function List({ title, items }) {
    const { selectMovie } = useContext(MovieContext)
    const [scrollX, setScrollX] = useState(0)
    const [scrollRight, setScrollRight] = useState(true)

    function handleScroll(direction: string) {
        let x = scrollX
        let listWidth = items.results.length * 150

        if (direction === 'left') {
            x = scrollX + Math.round(window.innerWidth / 3)
        } else if (direction === 'right') {
            x = scrollX - Math.round(window.innerWidth / 3)
        }

        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 80
            setScrollRight(false)
        } else { setScrollRight(true) }

        if (x > 0) {
            x = 0
        }

        setScrollX(x)
    }

    return (
        <>
        {items.results.length > 0 && (
            <div className={css.container}>
                <h2>{title}</h2>

                <div className={css.listarea}>
                    <div className={css.left} onClick={() => handleScroll('left')} style={{
                        display: scrollX === 0 ? 'none' : 'flex'
                    }}>
                        <img src="/arrow-left.svg" alt="<" />
                    </div>
                    
                    <div className={css.right} onClick={() => handleScroll('right')} style={{
                        display: !scrollRight ? 'none' : 'flex'
                    }}>
                        <img src="/arrow-right.svg" alt=">" />
                    </div>

                    <div className={css.list} style={{
                        width: items.results.length * 150,
                        marginLeft: scrollX
                    }}>
                        {items.results.map((item, key) => (
                            <div className={css.item} key={key} >
                                <Link to='mainMovie' smooth={true} duration={500} >
                                <img onClick={() => selectMovie(item)} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}