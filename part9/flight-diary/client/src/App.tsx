import React, { useEffect, useState } from 'react';
import diaryService from './services/diary';
import DiaryList from './components/DiaryList';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[] | null>([]);

  const fetchDiaries = () => {
    diaryService.getAll()
      .then((res) => setDiaries(res));
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <>
      <DiaryList diaries={diaries} />
    </>
  );
}

export default App;
