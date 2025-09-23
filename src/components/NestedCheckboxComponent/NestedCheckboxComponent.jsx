import { useState } from 'react';
import Checkboxes from './Checkboxes';

export default function NestesedCheckboxComponent() {
  const [checked, setChecked] = useState({}); // store id and boolean value of checbox status
  const checkboxesData = [
    {
      id: 1,
      label: 'Fruits',
      children: [
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        {
          id: 4,
          label: 'Citrus',
          children: [
            { id: 5, label: 'Orange' },
            { id: 6, label: 'Lemon' },
          ],
        },
      ],
    },
    {
      id: 7,
      label: 'Vegetables',
      children: [
        { id: 8, label: 'Carrot' },
        { id: 9, label: 'Broccoli' },
      ],
    },
  ];
  return <Checkboxes data={checkboxesData} checked={checked} setChecked={setChecked} />;
}
