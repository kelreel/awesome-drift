import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { css, styled } from "styled-components";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary", "outline"],
      control: { type: "inline-radio" },
    },
    size: {
      options: ["medium", "large"],
      control: { type: "inline-radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: (args) => (
    <Button variant="primary" {...args}>
      Button
    </Button>
  ),
};

export const Secondary: Story = {
  render: (args) => (
    <Button variant="secondary" {...args}>
      Button
    </Button>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <Button variant="outline" {...args}>
      Button
    </Button>
  ),
};

const GroupContainer = styled.div<{ aligned?: boolean }>`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  ${(p) =>
    p.aligned &&
    css`
      justify-items: start;
      grid-template-columns: auto;
    `};

  & + & {
    margin-top: 30px;
  }
`;

export const Group: Story = {
  render: () => (
    <>
      <GroupContainer>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>

        <Button variant="primary" size="large">
          Primary
        </Button>
        <Button variant="secondary" size="large">
          Secondary
        </Button>
        <Button variant="outline" size="large">
          Outline
        </Button>
      </GroupContainer>
      <GroupContainer aligned>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </GroupContainer>
    </>
  ),
};
