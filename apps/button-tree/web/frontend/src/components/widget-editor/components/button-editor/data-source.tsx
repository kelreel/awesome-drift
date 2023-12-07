import { ButtonDataSource } from "@blinks/shared";
import { RadioButton, TextField } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

import { MetafieldSelect } from "./metafield-select/metafield-select";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
`;

interface Props {
  value: ButtonDataSource;
  onChange: (value: ButtonDataSource) => void;
  type?: "text" | "url";
  staticLabel?: string;
  placeholder?: string;
  className?: string;
}

export const DataSource = ({
  value,
  onChange,
  staticLabel,
  placeholder,
  type = "text",
  className,
}: Props): JSX.Element => {
  return (
    <Container className={className}>
      <RadioContainer>
        <RadioButton
          label="String"
          checked={value.type === "static"}
          onChange={() => onChange({ ...value, type: "static" })}
        />
        <RadioButton
          label="Metafield value"
          checked={value.type === "metafield"}
          onChange={() => onChange({ ...value, type: "metafield" })}
        />
      </RadioContainer>
      {value.type === "static" && (
        <TextField
          type={type}
          label={staticLabel}
          autoComplete="off"
          maxLength={300}
          showCharacterCount
          placeholder={placeholder}
          value={value.static}
          onChange={(str) =>
            onChange({
              ...value,
              static: str,
            })
          }
        />
      )}
      {value.type === "metafield" && (
        <MetafieldSelect
          value={value.metafield}
          onSelect={(metafield) =>
            onChange({
              ...value,
              metafield,
            })
          }
        />
      )}
    </Container>
  );
};
