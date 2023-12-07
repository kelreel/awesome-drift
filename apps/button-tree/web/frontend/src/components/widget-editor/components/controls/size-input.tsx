import { Select, TextField } from "@shopify/polaris";
import React, { ReactElement, useEffect, useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const units = ["px", "%"];

export const SizeInput = ({ value, onChange, label }: Props): ReactElement => {
  const unit = units.find((unit) => value.endsWith(unit)) ?? "px";

  const [input, setInput] = useState(parseInt(value).toString() ?? "0px");

  useEffect(() => {
    setInput(parseInt(value).toString() ?? "0px");
  }, [value]);

  const handleChange = (value: string) => {
    setInput(value);
    if (!isNaN(parseInt(value))) {
      onChange(`${value}${unit}`);
    }
  };

  const handleBlur = () => {
    if (input === "") {
      onChange(`0${unit}`);
    }
  };

  const handleUnitChange = (unit: string) => {
    onChange(`${value}${unit}`);
  };

  return (
    <TextField
      label={label}
      type="number"
      step={1}
      value={input}
      onChange={handleChange}
      autoComplete="off"
      onBlur={handleBlur}
      connectedRight={
        <Select
          label="Unit"
          labelHidden
          value={unit}
          onChange={handleUnitChange}
          options={units}
        />
      }
    />
  );
};
