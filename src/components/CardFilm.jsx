export default function CardFilm({ film, addToFavorites, addToWatchlist }) {

    const imageUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const title = film.title || film.name || "Titolo non disponibile";
    return (
        <div className="card-film "> 
            <img src={imageUrl} alt={title} />
            <h2>{title}</h2>
            <p>{film.overview}</p>
            <button className="fav" onClick={() => addToFavorites(film)}>Add to favourite</button>
            <button className="watch" onClick={() => addToWatchlist(film)}>Add to watchlist</button>
        </div>
    )
}