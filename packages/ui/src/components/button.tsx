import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  background-color: red;
  padding: 10px 20px;
`;

interface Props {
  className?: string;
}

export const Button = ({ className }: Props): JSX.Element => {
  return <Container className={className}>Button</Container>;
};
