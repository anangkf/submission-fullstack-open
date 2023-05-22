import axios from 'axios';

const diaryService = {
  getAll: async (): Promise<DiaryEntry[] | null> => {
    try {
      const res = await axios.get('/api/diaries');
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};

export default diaryService;