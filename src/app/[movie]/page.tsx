import Image from 'next/image';
import { Button } from '../components/Button';
// import BackButton from '../components/BackButton';

type GenreType = {
  id: number;
  name: string;
};

export default async function MovieDetail({
  params,
}: {
  params: { movie: string };
}) {
  const { movie } = params;
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 60 },
    }
  );
  const res = await data.json();
  const imagePath = `https://image.tmdb.org/t/p/original`;
  return (
    <>
      {/* <BackButton /> */}
      <div className="flex-none md:flex lg:flex-row sm:flex-col">
        <Image
          className="basis-1/4 mr-10"
          src={imagePath + res.poster_path}
          width={500}
          height={800}
          priority
          alt={res.title}
        />
        <div className="basis-3/4">
          <h2 className="text-3xl">{res.title}</h2>
          <h2 className="text-lg">{res.release_date}</h2>
          <h2>Runtime: {res.runtime} minutes</h2>
          <h2>
            Genres:
            {res.genres.map((genre: GenreType) => (
              <Button key={genre.id} buttonType="normal" text={genre.name} />
            ))}
          </h2>

          <h2>
            Status: <Button buttonType="normal" text={res.status} />
          </h2>

          <p>{res.overview}</p>
        </div>
      </div>
    </>
  );
}
