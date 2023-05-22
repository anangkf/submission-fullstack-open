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