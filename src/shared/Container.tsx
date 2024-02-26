import React from "react";
import classNames from "classnames";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <main className={classNames(" mx-auto w-10/12", className)}>
      {children}
    </main>
  );
};
export default Container;
