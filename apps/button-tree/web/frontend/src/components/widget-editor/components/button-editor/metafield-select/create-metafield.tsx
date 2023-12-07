import { Button, FormLayout, InlineStack, TextField } from "@shopify/polaris";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { useApi } from "../../../../../hooks";

export const CreateMetafieldForm = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  const [namespace, setNamespace] = useState("blinks_app");
  const [key, setKey] = useState("");
  const [name, setName] = useState("");

  const { mutate: create, isLoading } = useMutation(
    ["metafield/create"],
    () =>
      api
        .post("metafield/create", { json: { namespace, key, name } })
        .json<any>(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["metafield/find"]);
        setName("");
        setKey("");
      },
    },
  );

  return (
    <FormLayout>
      <InlineStack gap="400" blockAlign="end">
        <TextField
          type="text"
          label="Name"
          autoComplete="off"
          maxLength={60}
          showCharacterCount
          value={name}
          onChange={setName}
          disabled={isLoading}
          minLength={3}
          placeholder="Metafield name"
        />
        <TextField
          type="text"
          label="Namespace"
          autoComplete="off"
          maxLength={40}
          showCharacterCount
          value={namespace}
          onChange={setNamespace}
          disabled={isLoading}
          minLength={3}
        />
        <TextField
          placeholder="button_name"
          type="text"
          label="Key"
          autoComplete="off"
          maxLength={40}
          showCharacterCount
          value={key}
          onChange={setKey}
          disabled={isLoading}
          minLength={3}
        />
        <Button
          loading={isLoading}
          disabled={
            isLoading ||
            namespace.length < 3 ||
            key.length < 3 ||
            name.length < 3
          }
          size="large"
          variant="primary"
          onClick={create}
        >
          Create
        </Button>
      </InlineStack>
    </FormLayout>
  );
};
