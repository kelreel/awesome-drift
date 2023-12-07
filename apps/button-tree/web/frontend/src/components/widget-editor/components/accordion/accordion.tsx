import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

interface Props {
  className?: string;
  active: string;
}

export const Accordion = ({ className }: Props): JSX.Element => {
  return <Container className={className}>Accordion</Container>;
};
