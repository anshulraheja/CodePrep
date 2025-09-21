export default function Profile({ data, setData }) {
  const handleProfileData = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log('profile', data);
  return (
    <div>
      <form>
        <div>
          <label htmlFor="name" type="text">
            Name
          </label>
          <input name="name" id="name" onChange={handleProfileData} value={data?.name} />
        </div>
        <div>
          <label htmlFor="age" type="number">
            Age
          </label>
          <input name="age" id="age" onChange={handleProfileData} value={data?.age} />
        </div>
        <div>
          <label htmlFor="email" type="email">
            Email
          </label>
          <input name="email" id="email" onChange={handleProfileData} value={data?.email} />
        </div>
      </form>
    </div>
  );
}
