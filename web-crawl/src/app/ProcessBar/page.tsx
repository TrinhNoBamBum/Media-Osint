'use client'
import React from 'react';
const ProgressBar = ( {percent}:any) => {
  return (
    <div className="bg-gray-200 h-8 rounded-full">
      <div
        
        className="bg-blue-500 h-full rounded-full"
        style={{ width: `${percent}%` }}
      >{percent } %</div>
    </div>
  );
};

export default ProgressBar;