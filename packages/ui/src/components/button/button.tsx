import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "medium" | "large";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  children: ReactNode;
}

const BaseButton = styled.button
  .withConfig({
    shouldForwardProp: (prop) => !["variant", "size", "kind"].includes(prop),
  })
  .attrs<ButtonProps>((props) => {
    const { className, type = "button", active } = props;
    return { className: `${className || ""}${active ? " active" : ""}`, type };
  })`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-radius: ${(p) => p.theme.rounding[200]}px;
  background: none;
  border: 1px solid transparent;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  will-change: opacity;
  font-family: inherit;
  font-weight: 600;

  :focus,
  :active {
    outline: 0;
  }

  :focus,
  :hover {
    text-decoration: none;
  }

  :disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

BaseButton.defaultProps = {
  variant: "primary",
  size: "medium",
};

const dynamicButtonStyles = ({ size, variant, theme: { buttons } }: any) => {
  const variants = buttons.variants;
  const sizes = buttons.sizes;

  return css({
    ...variants?.[variant],
    ...sizes?.[size],
  });
};

export const Button = styled(BaseButton)`
  ${dynamicButtonStyles}
`;
