import Movie from './Movie';

export type MovieDetails = {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
};

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return (
    <main>
      <div className="grid gap-12 grid-cols-fluid">
        {res.results.map((movie: MovieDetails) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </main>
  );
}
