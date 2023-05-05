import React, { PropsWithChildren } from "react";

const Wrapper: React.FC<PropsWithChildren> = (props) => {
  return (props?.children as React.ReactElement) || null;
};

export default Wrapper;
