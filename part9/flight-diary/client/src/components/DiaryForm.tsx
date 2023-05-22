import React, { useState } from 'react';

type DiaryFormProps = {
  addDiary: (data: NewDiaryEntry) => void;
}

const INIT_FORM_DATA = {
  date: '',
  visibility: '',
  weather: '',
  comment: ''
};

const DiaryForm: React.FC<DiaryFormProps> = ({ addDiary }) => {
  const [formData, setFormData] = useState<NewDiaryEntry>(INIT_FORM_DATA);
  const  { date, visibility, weather, comment } = formData;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDiary(formData);
    setFormData(INIT_FORM_DATA);
  };

  return (
    <div>
      <h3>Add new Diary</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">
          date
          <input type="text" name="date" id="date" value={date} onChange={handleChange} />
        </label><br />
        <label htmlFor="visibility">
          visibility
          <input type="text" name="visibility" id="visibility" value={visibility} onChange={handleChange} />
        </label><br />
        <label htmlFor="weather">
          weather
          <input type="text" name="weather" id="weather" value={weather} onChange={handleChange} />
        </label><br />
        <label htmlFor="comment">
          comment
          <input type="text" name="comment" id="comment" value={comment} onChange={handleChange} />
        </label><br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;