import { useNavigate } from "@shopify/app-bridge-react";
import { BlockStack, Button, ButtonProps, Text } from "@shopify/polaris";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { useApi, useSwitch } from "../../hooks";
import { WidgetNameModal } from "./widget-name-modal";

interface Props extends Partial<ButtonProps> {
  isButton?: boolean;
}

export const CreateWidget = ({ isButton = false, ...props }: Props) => {
  const { value: isOpen, on: show, off: hide } = useSwitch(false);

  const navigate = useNavigate();

  const api = useApi();
  const { mutate: createWidget, isLoading: isCreating } = useMutation(
    (name: string) =>
      api.post("widget", { json: { name } }).json<{ id: number }>(),
    {
      onSuccess: (res) => {
        hide();
        navigate(`/widget/${res.id}`);
      },
    },
  );

  const btn = (
    <Button onClick={show} variant="primary" tone="success" {...props}>
      Create widget
    </Button>
  );

  return (
    <>
      {isButton ? (
        btn
      ) : (
        <BlockStack gap="600" align="center" inlineAlign="center">
          <Text as="h2" variant="headingLg">
            Create you first widget
          </Text>
          {btn}
        </BlockStack>
      )}
      <WidgetNameModal
        title="Create widget"
        onClose={hide}
        initialName="New widget"
        isOpen={isOpen}
        onSave={createWidget}
        isLoading={isCreating}
      />
    </>
  );
};
