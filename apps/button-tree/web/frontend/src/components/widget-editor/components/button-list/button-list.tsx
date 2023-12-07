import { ButtonConfig, randomString, WidgetSettings } from "@blinks/shared";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BlockStack, FormLayout } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

import { AddButtonPopover } from "./add-button-popover";
import { ButtonListItem } from "./button-list-item";

const AddButtonContainer = styled.div<{ $hasButtons: boolean }>`
  margin: ${(p) => (p.$hasButtons ? "12px" : 0)} 0;
`;

interface Props {
  settings: WidgetSettings;
  onChange: (value: WidgetSettings) => void;
  onEdit: (id: string) => void;
  selected: string | null;
}

export const ButtonList = ({
  settings,
  onChange,
  onEdit,
  selected,
}: Props): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const hasButtons = settings.buttons.length > 0;

  const handleChange = (buttons: ButtonConfig[]) =>
    onChange({
      ...settings,
      buttons,
    });

  const handleAdd = (value: Omit<ButtonConfig, "id">) => {
    const id = randomString();
    handleChange([...settings.buttons, { ...value, id }]);

    onEdit(id);
  };

  const handleClone = (id: string) => {
    const newId = randomString();

    const btn = settings.buttons.find((btn) => btn.id === id);
    if (!btn) {
      return;
    }

    handleChange([...settings.buttons, { ...btn, id: newId }]);

    onEdit(newId);
  };

  const handleDelete = (id: string) => {
    handleChange(settings.buttons.filter((btn) => btn.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      const oldIndex = settings.buttons.findIndex(({ id }) => id === active.id);
      const newIndex = settings.buttons.findIndex(({ id }) => id === over!.id);

      handleChange(arrayMove(settings.buttons, oldIndex, newIndex));
    }
  };

  return (
    <FormLayout>
      <BlockStack gap="200">
        {hasButtons && (
          <BlockStack gap="300">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={settings.buttons}
                strategy={verticalListSortingStrategy}
              >
                {settings.buttons.map((config) => (
                  <ButtonListItem
                    key={config.id}
                    config={config}
                    onEdit={onEdit}
                    onClone={handleClone}
                    selected={config.id === selected}
                    onDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </BlockStack>
        )}
        <AddButtonContainer $hasButtons={hasButtons}>
          <BlockStack inlineAlign="end" gap="300">
            {/* {!hasButtons && (
              <Text variant="headingMd" as="h6">
                Create first button
              </Text>
            )} */}
            <AddButtonPopover onAdd={handleAdd} />
          </BlockStack>
        </AddButtonContainer>
      </BlockStack>
    </FormLayout>
  );
};
