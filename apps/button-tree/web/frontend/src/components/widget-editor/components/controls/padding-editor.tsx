import { WidgetPadding } from "@blinks/shared";
import { FormLayout } from "@shopify/polaris";
import React from "react";

import { SizeInput } from "./size-input";

interface PaddingEditorProps {
  padding: WidgetPadding | null;
  onChange: (value: WidgetPadding) => void;
}

export const PaddingEditor = ({
  padding,
  onChange,
}: PaddingEditorProps): JSX.Element => {
  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <SizeInput
          label="Top"
          value={padding?.top ?? "0px"}
          onChange={(top) => onChange({ ...padding, top })}
        />
        <SizeInput
          label="Right"
          value={padding?.right ?? "0px"}
          onChange={(right) => onChange({ ...padding, right })}
        />
      </FormLayout.Group>
      <FormLayout.Group>
        <SizeInput
          label="Bottom"
          value={padding?.bottom ?? "0px"}
          onChange={(bottom) => onChange({ ...padding, bottom })}
        />
        <SizeInput
          label="Left"
          value={padding?.left ?? "0px"}
          onChange={(left) => onChange({ ...padding, left })}
        />
      </FormLayout.Group>
    </FormLayout>
  );
};
