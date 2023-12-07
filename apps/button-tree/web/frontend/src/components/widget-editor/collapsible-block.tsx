import { Collapsible, Icon } from "@shopify/polaris";
import { MinusMinor, PlusMinor } from "@shopify/polaris-icons";
import React, { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0px;
`;

const IconContainer = styled.div`
  transition: all 200ms;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  padding: 14px 0;
  justify-content: space-between;
  user-select: none;

  &:hover ${IconContainer} {
    transform: scale(1.3);
  }
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 6px 1px 10px;
`;

interface Props {
  className?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  title: string | ReactNode;
}

export const CollapsibleBlock = ({
  className,
  isOpen,
  onOpen,
  onClose,
  children,
  title,
}: Props): JSX.Element => {
  return (
    <Container className={className}>
      <Title onClick={() => (isOpen ? onClose() : onOpen())}>
        <TitleText>{title}</TitleText>
        <IconContainer>
          <Icon source={isOpen ? MinusMinor : PlusMinor} />
        </IconContainer>
      </Title>
      <Collapsible
        id="1"
        open={isOpen}
        transition={{ duration: "300ms", timingFunction: "ease-in-out" }}
      >
        <Content>{children}</Content>
      </Collapsible>
    </Container>
  );
};
