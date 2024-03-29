import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import { GenreResponseProps } from "./SideBar";

import '../styles/content.scss';

interface ContentProps {
  genreId: number;
}

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
}

export function Content({genreId}: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    setSelectedGenreId(genreId);
  }, [genreId]);

  return (
  <div className="container">
  <header>
    <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
  </header>

  <main>
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
      ))}
    </div>
  </main>
</div>

)}