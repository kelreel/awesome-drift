import { ButtonConfig } from "@blinks/shared";
import { ActionList, Button, Popover } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

import { ButtonPreset, getPreset } from "./presets";

interface Props {
  onAdd: (config: Omit<ButtonConfig, "id">) => void;
}

export const AddButtonPopover = ({ onAdd }: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleAdd = (preset: ButtonPreset) => {
    onAdd(getPreset(preset));
    setPopoverActive(false);
  };

  return (
    <div>
      <Popover
        active={popoverActive}
        activator={
          <Button onClick={togglePopoverActive} variant="primary" disclosure>
            Add button
          </Button>
        }
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            { content: "Custom button", onAction: () => handleAdd("custom") },
            { content: "Buy on Amazon", onAction: () => handleAdd("amazon") },
            { content: "Buy on Ebay", onAction: () => handleAdd("ebay") },
          ]}
        />
      </Popover>
    </div>
  );
};
