import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  box-sizing: border-box;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 28px;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  z-index: ${(p) => (p.selected ? 2 : 0)};
  text-transform: capitalize;

  color: ${(p) => (p.selected ? "#303030" : "#777777")};
  font-weight: 500;
  background-color: ${(p) => (p.selected ? "#ffffff" : "transparent")};

  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out;

  &:not(:first-of-type) {
    margin-left: -1px;
  }

  border-radius: 8px;

  ${(p) =>
    !p.selected &&
    css`
      &:hover {
        z-index: 1;
        border-color: #555555;
      }
    `}
`;

interface PillProps {
  children: ReactNode;
  selected: boolean;
  onSelect?: () => void;
  className?: string;
}

export const Pill = ({
  children,
  className,
  selected,
  onSelect,
}: PillProps): JSX.Element => (
  <Container className={className} selected={selected} onClick={onSelect}>
    {children}
  </Container>
);
