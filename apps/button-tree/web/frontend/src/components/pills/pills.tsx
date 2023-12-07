import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 2px;
`;

interface PillsProps {
  children: ReactNode;
  className?: string;
}

export const Pills = ({ children, className }: PillsProps): JSX.Element => {
  return <Container className={className}>{children}</Container>;
};
