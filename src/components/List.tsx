import css from '../css/components/list.module.scss'

export default function List({ title, items }) {
    return (
        <div className={css.container}>
            <h2>{title}</h2>

            <div className={css.listarea}>
                <div className={css.list}>
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