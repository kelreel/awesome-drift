import { useToast } from "@shopify/app-bridge-react";
import { ActionList, Badge, Button, Popover } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";

import { normalizeMetafields } from "../../hooks/useBulkEdit";
import { WidgetBrief } from "./widget-list";

const Container = styled.div<{ $hasBorder: boolean }>`
  display: grid;
  grid-template-areas:
    "name actions"
    "tags actions";
  grid-template-columns: 1fr 1fr;
  padding: 12px;
  row-gap: 8px;

  ${(p) =>
    p.$hasBorder &&
    css`
      border-bottom: 1px solid #cccccc;
    `}
`;

const Id = styled.div`
  cursor: pointer;
  margin-right: 30px;

  &:hover {
    filter: brightness(0.5);
  }
`;

const Name = styled.div`
  grid-area: name;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const Tags = styled.div`
  grid-area: tags;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
`;

interface Props {
  widget: WidgetBrief;
  hasBorder: boolean;
  onDelete: (widget: WidgetBrief) => void;
  onEdit: (widget: WidgetBrief) => void;
  onRename: (widget: WidgetBrief) => void;
  onMetafieldsEdit: (widget: WidgetBrief) => void;
}

export const WidgetListItem = ({
  widget,
  hasBorder,
  onEdit,
  onMetafieldsEdit,
  onRename,
  onDelete,
}: Props) => {
  const { show } = useToast();

  const canEditMf = normalizeMetafields(widget.config).length > 0;

  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const btnCount = widget.config.buttons.length;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(widget.key);
    show(`"${widget.name}" ID copied`);
  };

  return (
    <Container $hasBorder={hasBorder}>
      <Name>{widget.name}</Name>
      <Tags>
        <Badge
          tone={btnCount > 0 ? "success" : "enabled"}
        >{`${btnCount} button${btnCount === 1 ? "" : "s"}`}</Badge>
      </Tags>
      <Actions>
        <Id onClick={handleCopyKey}>
          <Badge>{`ID: ${widget.key}`}</Badge>
        </Id>
        <Button onClick={() => onEdit(widget)} variant="primary">
          Edit
        </Button>
        <Popover
          active={popoverActive}
          activator={
            <Button onClick={togglePopoverActive} disclosure>
              More actions
            </Button>
          }
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "Edit metafields",
                disabled: !canEditMf,
                onAction: () => {
                  onMetafieldsEdit(widget);
                  togglePopoverActive();
                },
              },
              {
                content: "Rename",
                onAction: () => {
                  onRename(widget);
                  togglePopoverActive();
                },
              },
              {
                content: "Remove",
                onAction: () => {
                  onDelete(widget);
                  togglePopoverActive();
                },
                destructive: true,
              },
            ]}
          />
        </Popover>
      </Actions>
    </Container>
  );
};
