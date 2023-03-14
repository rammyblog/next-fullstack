import Link from 'next/link';
import Image from 'next/image';
import { MovieDetails } from './page';


export default function Movie({
  id,
  title,
  poster_path,
  release_date,
}: MovieDetails) {
  const imagePath = `https://image.tmdb.org/t/p/original${poster_path}`;
  return (
    <div>
      <Link href={`/${id}`}>
        <Image src={imagePath} alt={title} width={800} height={800} />
      </Link>
      <h1 className="text-2xl mt-4">{title}</h1>
      {/* <h2>{release_date}</h2> */}
    </div>
  );
}
