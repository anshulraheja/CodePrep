import React, { useState } from 'react';
import json from './FileData.json';
import './FileExplorer.css';

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFolder = !!node.children;

  const toggleExpand = () => {
    if (isFolder) setIsExpanded((prev) => !prev);
  };

  // sort: directories first, then files, both alphabetically
  //   const sortedChildren = isFolder
  //     ? [...node.children].sort((a, b) => {
  //         const isDirA = !!a.children;
  //         const isDirB = !!b.children;
  //         if (isDirA !== isDirB) return isDirA ? -1 : 1; // dirs before files
  //         return a.name.localeCompare(b.name); // alphabetical
  //       })
  //     : [];

  const sortedChildren =
    isFolder &&
    node.children
      ?.slice() // make a copy of the list (so original array is not changed)
      .sort((a, b) => {
        // 1️⃣ If one is folder and the other is file
        if (a.children && !b.children) return -1; // a = folder, b = file → folder comes first
        if (!a.children && b.children) return 1; // a = file, b = folder → folder comes first

        // 2️⃣ If both are same type (both folder or both file)
        return a.name.localeCompare(b.name); // sort alphabetically
      });

  return (
    <div className="tree-node">
      <div
        className={`tree-label ${isFolder ? 'folder' : 'file'}`}
        onClick={toggleExpand}
        role={isFolder ? 'button' : 'none'}
        tabIndex={isFolder ? 0 : -1}
      >
        {isFolder ? (isExpanded ? '📂' : '📁') : '📄'} {node.name}
      </div>

      {isFolder && isExpanded && (
        <div className="tree-children">
          {sortedChildren.length > 0 ? (
            sortedChildren.map((child) => <TreeNode key={child.id} node={child} />)
          ) : (
            <div className="empty">(empty)</div>
          )}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  return (
    <div className="file-explorer">
      <h2>File Explorer</h2>
      {json.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default FileExplorer;
