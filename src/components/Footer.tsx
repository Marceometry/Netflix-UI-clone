import css from '../css/components/footer.module.scss'

export default function Footer() {
    return (
        <footer className={css.footer}>
            <p>Feito com <span>&#10084;</span> por Marcelino Teixeira</p>
            <p>Dados pegos do site <a href="https://www.themoviedb.org/" target="_blank">TheMovieDB</a></p>
            <p>Direitos de imagem <a href="https://netflix.com/" target="_blank">Netflix</a></p>
        </footer>
    )
}