import MultiStepper from './MultiStepper';

// Multi Step Component Defination
const NameComponent = () => {
    return (
        <div>
            <label htmlFor="name">Enter Name</label>
            <input type="text" id="name" />
        </div>
    );
};

const GenderComponent = () => {
    return (
        <div>
            <h4>Select Gender</h4>
            <input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
        </div>
    );
};

const TechComponent = () => {
    return (
        <div>
            <h4>Select the tech you are proficient in:-</h4>
            <input type="checkbox" name="react" value="react" id="react" />
            <label htmlFor="react">React</label>
            <input type="checkbox" name="js" value="js" id="js" />
            <label htmlFor="js">JavaScript</label>
        </div>
    );
};

const DEFAULT_STEPS = [
    {
        id: 'name',
        title: 'Name',
        component: NameComponent,
    },
    {
        id: 'gender',
        title: 'Gender',
        component: GenderComponent,
    },
    {
        id: 'tech',
        title: 'Tech',
        component: TechComponent,
    },
];


const MultiStepperComponent = () => {
    return <MultiStepper steps={DEFAULT_STEPS}/>;
};

export default MultiStepperComponent;
