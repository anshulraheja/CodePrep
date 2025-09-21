import TabContainer from './TabContainer';
import Interests from './TabContent/Interests';
import Profile from './TabContent/Profile';
import Settings from './TabContent/Settings';

const tabList = [
  {
    title: 'Profile',
    component: Profile,
  },
  {
    title: 'Interest',
    component: Interests,
  },

  {
    title: 'Settings',
    component: Settings,
  },
];

function TabComponent() {
  return (
    <>
      <TabContainer tabList={tabList} defaultActiveTab={0} />
    </>
  );
}

export default TabComponent;
