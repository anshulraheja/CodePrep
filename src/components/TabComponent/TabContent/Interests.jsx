export default function Interests({ data, setData }) {
  const handleInterestChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      interests: e.target.checked
        ? [...prevState.interests, e.target.name]
        : prevState.interests.filter((item) => item !== e.target.name),
    }));
  };
  console.log('interest', data);
  return (
    <div>
      <label htmlFor="javascript">
        <input
          type="checkbox"
          name="javascript"
          checked={data.interests.includes('javascript')}
          onChange={handleInterestChange}
        />
        Javascript
      </label>
      <label htmlFor="react">
        <input
          type="checkbox"
          name="react"
          checked={data.interests.includes('react')}
          onChange={handleInterestChange}
        />
        React
      </label>
      <label htmlFor="angular">
        <input
          type="checkbox"
          name="angular"
          checked={data.interests.includes('angular')}
          onChange={handleInterestChange}
        />
        Angular
      </label>
    </div>
  );
}
