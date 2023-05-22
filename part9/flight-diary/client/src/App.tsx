import React, { useEffect, useState } from 'react';
import diaryService from './services/diary';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const fetchDiaries = () => {
    diaryService.getAll()
      .then((res) => setDiaries(res));
  };

  const addDiary = (data: NewDiaryEntry) => {
    diaryService.crate(data)
      .then((res) => {
        setDiaries([ ...diaries, res]);
      });
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <>
      <DiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
}

export default App;
