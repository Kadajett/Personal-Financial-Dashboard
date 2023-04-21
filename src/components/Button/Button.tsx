import React from "react";

const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => any;
}) => {
  return (
    <button
      type="button"
      className={
        "rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" +
        " " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
