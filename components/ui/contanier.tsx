import React from "react";

const Contanier = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-7xl">{children}</div>;
};

export default Contanier;
