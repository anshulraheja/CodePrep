export default function Settings({ data, setData }) {
  const handleSettingsData = (e) => {
    setData((prevState) => ({
      ...prevState,
      theme: e.target.name,
    }));
  };

  console.log('setting', data);
  return (
    <div>
      <label>
        <input
          type="radio"
          name="dark"
          id="dark"
          checked={data?.theme === 'dark'}
          onChange={handleSettingsData}
        />
        dark
      </label>

      <label>
        <input
          type="radio"
          name="light"
          id="light"
          checked={data?.theme === 'light'}
          onChange={handleSettingsData}
        />
        light
      </label>
    </div>
  );
}
