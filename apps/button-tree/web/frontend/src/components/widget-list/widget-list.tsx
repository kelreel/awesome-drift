import { WidgetSettings } from "@blinks/shared";
import { Button } from "@gsc/ui";
import { useNavigate } from "@shopify/app-bridge-react";
import { Card } from "@shopify/polaris";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { useApi, useSwitch, useWidget } from "../../hooks";
import { normalizeMetafields, useBulkEdit } from "../../hooks/useBulkEdit";
import { WidgetDeleteModal } from "./widget-delete-modal";
import { WidgetListItem } from "./widget-list-item";
import { WidgetNameModal } from "./widget-name-modal";

export interface WidgetBrief {
  id: number;
  name: string;
  key: string;
  buttonCount: number;
  config: WidgetSettings;
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const WidgetList = () => {
  const navigate = useNavigate();
  const bulkEdit = useBulkEdit();

  const {
    value: isShowRename,
    on: showRename,
    off: hideRename,
  } = useSwitch(false);
  const {
    value: isShowDelete,
    on: showDelete,
    off: hideDelete,
  } = useSwitch(false);

  const api = useApi();

  const {
    widget,
    updateWidget,
    deleteWidget,
    isWidgetUpdating,
    isWidgetDeleting,
  } = useWidget();

  const [tempWidget, setTempWidget] = useState<WidgetBrief | null>(null);

  const { data, isLoading } = useQuery(["widget-list"], () =>
    api.get("widget/all").json<WidgetBrief[]>(),
  );

  const handleEdit = useCallback(
    (widget: WidgetBrief) => navigate(`/widget/${widget.id}`),
    [navigate],
  );

  const handleMetafieldsEdit = useCallback(
    (widget: WidgetBrief) => {
      bulkEdit(normalizeMetafields(widget.config));
    },
    [bulkEdit],
  );

  const handleRename = useCallback(
    (widget: WidgetBrief) => {
      setTempWidget(widget);
      showRename();
    },
    [showRename],
  );

  const handleDelete = useCallback(
    (widget: WidgetBrief) => {
      setTempWidget(widget);
      showDelete();
    },
    [showDelete],
  );

  return (
    <Card padding="0">
      <Container>
        {data?.map((widget, idx) => (
          <WidgetListItem
            key={widget.id}
            hasBorder={idx < data.length - 1}
            widget={widget}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRename={handleRename}
            onMetafieldsEdit={handleMetafieldsEdit}
          />
        ))}
      </Container>

      <WidgetNameModal
        title="Rename widget"
        initialName={tempWidget?.name || ""}
        isOpen={isShowRename}
        onClose={hideRename}
        onSave={(name) =>
          updateWidget({ id: tempWidget!.id, name }, { onSuccess: hideRename })
        }
        isLoading={isWidgetUpdating}
      />
      <WidgetDeleteModal
        isOpen={isShowDelete}
        onClose={hideDelete}
        onConfirm={() => {
          deleteWidget(tempWidget!.id, { onSuccess: hideDelete });
        }}
        isLoading={isWidgetDeleting}
      />
      <Button variant="primary">Button</Button>
    </Card>
  );
};
