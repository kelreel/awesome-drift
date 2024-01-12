import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button></Button>,
};
