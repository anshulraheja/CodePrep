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

      const verifyParent = (node) => {
        if (!node.children) return newState[node.id] || false;

        const allChildrenChecked = node.children.every((child) => verifyParent(child));

        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };

      data.forEach((node) => verifyParent(node));

      // for (let i = node.length - 1; i >= 0; i--) {
      //   const parentId = node[i];
      //   const parentNode = findNodeById(data, parentId);
      //   const allChildrenChecked = parentNode.children.every((child) => newState[child.id]);
      //   newState[parentId] = allChildrenChecked;
      // }

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
