import { WidgetSettings } from "@blinks/shared";
import { FormLayout, TextField } from "@shopify/polaris";
import React from "react";

interface Props {
  settings: WidgetSettings;
  onChange: (value: WidgetSettings) => void;
}

const cssPlaceholder = `.blinks-app-block: {
  color: red;
}

.blinks-app__title: {
  background: black;
}

.blinks-app__list: {
  color: green;
}

.blinks-app__btn: {
  font-size: 20px;
}

.blinks-app__btn-icon {
  border-radius: 20px;
}
`;

export const EditorCustomCss = ({ settings, onChange }: Props): JSX.Element => {
  return (
    <FormLayout>
      <TextField
        label="Custom CSS"
        autoComplete="off"
        value={settings.userCss}
        onChange={(value) => onChange({ ...settings, userCss: value })}
        placeholder={cssPlaceholder}
        multiline={12}
      />
    </FormLayout>
  );
};
