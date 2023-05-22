import React from 'react';

type DiaryProps = {
  diaries: DiaryEntry[] | null;
}

const DiaryList: React.FC<DiaryProps> = ({ diaries }) => {
  return (
    <div>
      <ul>
        {diaries?.map((diary) => {
          const { id, date, weather, visibility } = diary;
          return (
            <li key={id} style={{ padding: 12, listStyle: 'none' }}>
              <span style={{ fontWeight: 'bold' }}>{date}</span><br />
            weather: {weather} <br />
            visibility: {visibility} <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DiaryList;