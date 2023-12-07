import { Popover } from "@shopify/polaris";
import React, { useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 12px;
`;

const Swatch = styled.div<{ bg?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: ${({ bg }) => bg};
  outline: 1px solid black;
`;

const Input = styled(HexColorInput)`
  border-radius: 6px;
  border: 1px solid black;
  height: 32px;
  padding: 8px 8px;
  width: 100%;
`;

interface ColorInputProps {
  label: string;
  color?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ColorInput = ({
  color,
  onChange,
  label,
  className,
}: ColorInputProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const activator = (
    <Container className={className} onClick={() => setOpen(true)}>
      <Swatch bg={color} />
      <div style={{ display: "flex", flexFlow: "column nowrap" }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>{color?.toUpperCase()}</div>
      </div>
    </Container>
  );

  return (
    <Popover activator={activator} active={open} onClose={() => setOpen(false)}>
      <div style={{ background: "#FFFFFF", padding: "16px" }}>
        <HexAlphaColorPicker color={color} onChange={onChange} />
        <div style={{ marginTop: "12px" }}>
          <Input alpha prefixed color={color} onChange={onChange} />
        </div>
      </div>
    </Popover>
  );
};
