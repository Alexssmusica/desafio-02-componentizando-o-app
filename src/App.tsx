
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useState } from 'react';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleSetSelectGenreID(id: number): void {
    setSelectedGenreId(id);
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar selectGenreId={handleSetSelectGenreID}/>
      <Content genreId={selectedGenreId}/>
    </div>
  )
}