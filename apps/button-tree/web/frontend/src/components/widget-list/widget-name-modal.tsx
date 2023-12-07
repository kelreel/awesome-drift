import { Loading } from "@shopify/app-bridge-react";
import { Modal, TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  initialName: string;
  onSave: (name: string) => void;
  title: string;
  onClose: () => void;
  isLoading?: boolean;
}

export const WidgetNameModal = ({
  initialName,
  isOpen,
  title,
  onSave,
  onClose,
  isLoading,
}: Props) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  return (
    <Modal
      title={title}
      open={isOpen}
      onClose={onClose}
      primaryAction={{
        content: "Save",
        onAction: () => onSave(name),
        disabled: isLoading || name.length < 3,
      }}
      loading={isLoading}
      secondaryActions={[{ content: "Cancel", onAction: onClose }]}
    >
      {isLoading && <Loading />}
      <Modal.Section>
        <TextField
          type="text"
          value={name}
          onChange={setName}
          autoComplete="off"
          label="Widget name"
          maxLength={60}
          showCharacterCount
        />
      </Modal.Section>
    </Modal>
  );
};
