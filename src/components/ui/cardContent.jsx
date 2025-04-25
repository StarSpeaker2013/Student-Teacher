// src/components/ui/cardContent.js
import React from 'react';

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
