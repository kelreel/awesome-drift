import { Align } from "@blinks/shared";
import React from "react";
import styled from "styled-components";

import { Pill, Pills } from "../../../pills";

interface Props {
  align: Align | string;
  onChange: (align: Align) => void;
}

const $Pills = styled(Pills)`
  flex: 1;
`;

export const AlignInput = ({ align, onChange }: Props): JSX.Element => {
  return (
    <$Pills>
      {["left", "center", "right"].map((item) => (
        <Pill
          key={item}
          selected={item === align}
          onSelect={() => onChange(item as Align)}
        >
          {item}
        </Pill>
      ))}
    </$Pills>
  );
};
