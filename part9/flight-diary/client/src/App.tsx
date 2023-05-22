import React, { useEffect, useState } from 'react';
import diaryService from './services/diary';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

enum NotifType {
  info = 'info',
  error = 'error',
  success = 'success'
}

const INIT_NOTIF = {
  type: 'info',
  message: ''
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notif, setNotif] = useState(INIT_NOTIF);

  const Notif = {
    info: (message: string) => {
      setNotif({
        type: 'info',
        message
      });
      setTimeout(() => {
        setNotif(INIT_NOTIF);
      }, 2500);
    },
    error: (message: string) => {
      setNotif({
        type: 'error',
        message
      });
      setTimeout(() => {
        setNotif(INIT_NOTIF);
      }, 2500);
    },
    success: (message: string) => {
      setNotif({
        type: 'success',
        message
      });
      setTimeout(() => {
        setNotif(INIT_NOTIF);
      }, 2500);
    },
  };

  const fetchDiaries = () => {
    diaryService.getAll()
      .then((res) => setDiaries(res))
      .catch((error) => Notif.error(error.message));
  };

  const addDiary = (data: NewDiaryEntry) => {
    diaryService.create(data)
      .then((res) => {
        setDiaries([ ...diaries, res]);
        Notif.success('Diary added successfully!');
      })
      .catch((error) => {
        Notif.error(error.message);
      });
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <>
      <Notification type={notif.type as NotifType} message={notif.message} />
      <DiaryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
}

export default App;
