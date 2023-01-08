import React from "react";

const EmptyContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center text-2xl text-gray-500 dark:text-gray-400">
      {children}
    </div>
  );
};

export default EmptyContent;
