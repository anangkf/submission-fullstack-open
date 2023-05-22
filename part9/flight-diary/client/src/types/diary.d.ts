interface SensitiveDiaryEntry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
}

interface DiaryEntry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

type NewDiaryEntry = DiaryEntry<Omit, 'id'>

interface NotifState {
  type: 'info' | 'error' | 'success';
  message: string;
}