import css from '../css/components/header.module.scss'

export default function Header({ bg }) {
    return (
        <header className={`${css.container} ${bg ? css.bg : ''}`}>
            <a href="/">
                <img src="/logo-netflix.png" alt="Netflix" />
            </a>

            <a href="/">
                <img src="profile-img.png" alt=":)" />
            </a>
        </header>
    )
}