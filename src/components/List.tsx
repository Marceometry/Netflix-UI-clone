import { useState } from 'react'
import css from '../css/components/list.module.scss'

export default function List({ title, items }) {
    const [scrollX, setScrollX] = useState(0)

    function handleLeftArrow() {
        let x = scrollX + 150

        if (x > 0) {
            x = 0
        }

        setScrollX(x)
    }

    function handleRightArrow() {

    }

    return (
        <div className={css.container}>
            <h2>{title}</h2>

            <div className={css.listarea}>
                <div className={css.left} onClick={handleLeftArrow} style={{
                    display: scrollX === 0 ? 'none' : 'flex'
                }}>
                    <img src="/arrow-left.svg" alt="<" />
                </div>
                
                <div className={css.right} onClick={handleRightArrow}>
                    <img src="/arrow-right.svg" alt=">" />
                </div>

                <div className={css.list} style={{
                    width: items.results.length * 150,
                    marginLeft: scrollX
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div className={css.item} key={key} >
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}