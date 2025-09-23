import { useState } from 'react';
import './Checkboxes.css';
export default function Checkboxes({ data, checked, setChecked }) {
  const handleChange = (isChecked, node) => {
    setChecked((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node?.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };

      updateChildren(node);

      // if all children are checked, mark parent as checked

      const verifyParent = (node) => {};

      verifyParent(node);
      return newState;
    });
  };

  console.log(checked);

  return (
    <div>
      {data?.map((node) => (
        <div key={node.id} className="list-item">
          <input
            type="checkbox"
            name={node.label}
            id={node.id}
            checked={checked[node.id] || false}
            onChange={(e) => handleChange(e.target.checked, node)}
          />
          <label htmlFor={node.id}>{node.label}</label>

          {node.children && (
            <Checkboxes data={node.children} checked={checked} setChecked={setChecked} />
          )}
        </div>
      ))}
    </div>
  );
}
