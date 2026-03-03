import { createBrowserRouter } from 'react-router-dom'
import CharactersPage from '@/features/characters/page/CharacterPage'
import CharacterDetailPage from '@/features/characters/page/CharacterDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CharactersPage />
  },
  {
    path: '/characters/:id',
    element: <CharacterDetailPage />
  }
])