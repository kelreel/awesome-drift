import { Loading } from "@shopify/app-bridge-react";
import { Modal } from "@shopify/polaris";
import React from "react";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const WidgetDeleteModal = ({
  isOpen,
  onConfirm,
  onClose,
  isLoading,
}: Props) => {
  return (
    <Modal
      title="Delete widget"
      open={isOpen}
      onClose={onClose}
      primaryAction={{
        content: "Delete",
        onAction: onConfirm,
        destructive: true,
      }}
      instant
      size="small"
      loading={isLoading}
      sectioned
      secondaryActions={[{ content: "Cancel", onAction: onClose }]}
    >
      {isLoading && <Loading />}
      <p>
        Are you sure you want to delete the widget? This action cannot be
        undone.
      </p>
    </Modal>
  );
};
