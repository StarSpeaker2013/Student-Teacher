// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
