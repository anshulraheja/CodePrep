import { useState, memo } from 'react';
import './TabContainer.css';

function TabContainer({ tabList, defaultActiveTab }) {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab < tabList.length ? defaultActiveTab : 0
  );

  //    const [errors, setErrors] = useState({}); // track validation errors
  const [data, setData] = useState({
    name: '',
    age: '',
    email: '',
    interests: [],
    theme: '',
  });

  const ActiveTabComponent = tabList[activeTab].component;

  const handlePrevbutton = () => {
    setActiveTab((prev) => prev - 1);
  };

  const handleNextbutton = () => {
    setActiveTab((prev) => prev + 1);
  };

  const handleSubmitbutton = () => {
    console.log(data);
  };

  //   Error handling and validation is left

  //  const validateTab = () => {
  //     const newErrors = {};
  //     if (activeTab === 0) {
  //       if (!profileData.name) newErrors.name = 'Name is required';
  //       if (!profileData.email) newErrors.email = 'Email is required';
  //     }
  //     if (activeTab === 2 && !settingsData.theme) {
  //       newErrors.theme = 'Please select a theme';
  //     }
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  return (
    <div>
      <div role="tablist">
        {tabList.map((item, index) => (
          <TabButton key={index} isActive={activeTab === index} onClick={() => setActiveTab(index)}>
            {item.title}
          </TabButton>
        ))}
      </div>
      <div role="tabpanel">
        <ActiveTabComponent data={data} setData={setData} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrevbutton}>Prev</button>}
        {activeTab < tabList.length - 1 && <button onClick={handleNextbutton}>Next</button>}
        {activeTab === tabList.length - 1 && <button onClick={handleSubmitbutton}>Submit</button>}
      </div>
    </div>
  );
}

const TabButton = memo(function TabButton({ isActive, onClick, children }) {
  return (
    <button
      className={isActive ? 'active-tab' : ''}
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default TabContainer;
