import Link from 'next/link'
import css from '../css/components/header.module.scss'

export default function Header({ bg }) {
    return (
        <header className={`${css.container} ${bg ? css.bg : ''}`}>
            <Link href="/">
                <a>
                    <img src="/logo-netflix.png" alt="Netflix" />
                </a>
            </Link>

            <Link href="/">
                <a>
                    <img src="profile-img.png" alt=":)" />
                </a>
            </Link>
        </header>
    )
}