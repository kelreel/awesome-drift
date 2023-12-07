import { ButtonConfig } from "@blinks/shared";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Icon, Text, Tooltip } from "@shopify/polaris";
import {
  DeleteMajor,
  DragHandleMinor,
  DuplicateMinor,
  RiskMinor,
} from "@shopify/polaris-icons";
import React from "react";
import styled, { css } from "styled-components";

const RightPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;

const Actions = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
`;

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  min-height: 44px;
  border-radius: 12px;

  box-shadow:
    0 0 0 1px rgb(0 0 0/14%),
    0 2px 2px rgb(0 0 0/14%);

  ${(p) =>
    p.selected &&
    css`
      background-color: #c4cdff40;
      outline: 1px dashed #3b4ef7;
    `};

  transition:
    border 200ms ease,
    background-color 300ms ease,
    box-shadow 200ms ease,
    transform 100ms ease;

  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    box-shadow:
      0 0 0 1px rgb(0 0 0/20%),
      0 2px 2px rgb(0 0 0/20%);
  }

  &:hover ${Actions} {
    display: flex;
  }
`;

interface Props {
  config: ButtonConfig;
  onEdit: (id: string) => void;
  onClone: (id: string) => void;
  onDelete: (id: string) => void;
  selected: boolean;
}

export const ButtonListItem = ({
  config: {
    id,
    data: { label, url },
  },
  selected,
  onDelete,
  onClone,
  onEdit,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const name =
    label.type === "static"
      ? label.static
      : label.metafield
        ? `{{ ${label.metafield.namespace}.${label.metafield.key} }}`
        : "{{ EMPTY_LABEL_METAFIELD }}";

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${name}" button?`)) {
      onDelete(id);
    }
  };

  const hasWarn = url.type === "static" ? !url.static : !url.metafield;

  return (
    <Container
      selected={selected}
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={() => onEdit(id)}
    >
      <div style={{ maxWidth: "260px" }}>
        <Text as="p" truncate>
          {name}
        </Text>
      </div>
      <RightPanel>
        <Actions onClick={(e) => e.stopPropagation()}>
          <Button
            size="micro"
            onClick={() => onClone(id)}
            icon={DuplicateMinor}
          />
          <Button size="micro" onClick={handleDelete} icon={DeleteMajor} />
          <div
            ref={setActivatorNodeRef}
            style={{ cursor: "move" }}
            {...listeners}
          >
            <Icon source={DragHandleMinor} />
          </div>
        </Actions>
        {hasWarn && (
          <Tooltip
            content={
              <Text as="p">
                This button will be always hidden. URL value is required.
              </Text>
            }
          >
            <Icon tone="critical" source={RiskMinor} />
          </Tooltip>
        )}
      </RightPanel>
    </Container>
  );
};
