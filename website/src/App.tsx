import { useState } from 'react';
import { HomePage } from './home/HomePage';
import { TalkPage } from './talk/TalkPage';

type Page = 'home' | 'talk';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  if (page === 'talk') {
    return <TalkPage onBack={() => setPage('home')} />;
  }

  return <HomePage onNavigateToTalk={() => setPage('talk')} />;
}
