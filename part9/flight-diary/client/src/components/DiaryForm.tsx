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
          <input type="date" name="date" id="date" value={date} onChange={handleChange} />
        </label><br />
        <label htmlFor="visibility">
          visibility
          <span>
            <input type="radio" name="visibility" id="great" value='great' onChange={handleChange} checked={formData.visibility === 'great'} />
            <label htmlFor="great">great</label>
          </span>
          <span>
            <input type="radio" name="visibility" id="good" value='good' onChange={handleChange} checked={formData.visibility === 'good'} />
            <label htmlFor="good">good</label>
          </span>
          <span>
            <input type="radio" name="visibility" id="ok" value='ok' onChange={handleChange} checked={formData.visibility === 'ok'} />
            <label htmlFor="ok">ok</label>
          </span>
          <span>
            <input type="radio" name="visibility" id="poor" value='poor' onChange={handleChange} checked={formData.visibility === 'poor'} />
            <label htmlFor="poor">poor</label>
          </span>
        </label><br />
        <label htmlFor="weather">
          weather
          <span>
            <input type="radio" name="weather" id="sunny" value='sunny' onChange={handleChange} checked={formData.weather === 'sunny'} />
            <label htmlFor="sunny">sunny</label>
          </span>
          <span>
            <input type="radio" name="weather" id="rainy" value='rainy' onChange={handleChange} checked={formData.weather === 'rainy'} />
            <label htmlFor="rainy">rainy</label>
          </span>
          <span>
            <input type="radio" name="weather" id="ok" value='cloudy' onChange={handleChange} checked={formData.weather === 'cloudy'} />
            <label htmlFor="cloudy">cloudy</label>
          </span>
          <span>
            <input type="radio" name="weather" id="stormy" value='stormy' onChange={handleChange} checked={formData.weather === 'stormy'} />
            <label htmlFor="stormy">stormy</label>
          </span>
          <span>
            <input type="radio" name="weather" id="windy" value='windy' onChange={handleChange} checked={formData.weather === 'windy'} />
            <label htmlFor="windy">windy</label>
          </span>
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