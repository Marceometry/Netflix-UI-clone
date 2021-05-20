import axios from "axios"

const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint: string) => {
    const { data } = await axios(`${API_BASE}${endpoint}language=pt-BR&api_key=${process.env.TMDB_API_KEY}`)
    return data
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch('/discover/tv?with_network=213&')
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch('/trending/all/week?')
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch('/movie/top_rated?')
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch('/discover/movie?with_genres=28&')
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch('/discover/movie?with_genres=35&')
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch('/discover/movie?with_genres=27&')
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch('/discover/movie?with_genres=10749&')
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch('/discover/movie?with_genres=99&')
            }
        ]
    },

    getMovieInfo: async (movieId, type) => {
        let info = {}

        if (movieId) {
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?`)
                    break
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?`)
                    break
                default:
                    info = null
                    break
            }
        }

        return info
    }
}