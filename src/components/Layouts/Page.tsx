import React from "react";

export const Page = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <div className="pb-5 pt-3 pe-3">{children}</div>;
