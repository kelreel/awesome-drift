import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  background-color: yellow;
  padding: 10px 20px;
`;

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ className, children }: Props): JSX.Element => {
  return <Container className={className}>{children}</Container>;
};
