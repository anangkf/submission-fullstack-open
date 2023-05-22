import axios from 'axios';

const diaryService = {
  getAll: async (): Promise<DiaryEntry[]> => {
    try {
      const res = await axios.get('/api/diaries');
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  crate: async (data: NewDiaryEntry): Promise<DiaryEntry> => {
    try {
      const res = await axios.post('/api/diaries', data);
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};

export default diaryService;