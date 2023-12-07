import { useNavigate, useToast } from "@shopify/app-bridge-react";
import { Box, Page } from "@shopify/polaris";
import React from "react";
import { useParams } from "react-router-dom";

import { FooterFaq } from "../../components/footer-faq";
import { WidgetEditor } from "../../components/widget-editor";
import {
  WidgetDeleteModal,
  WidgetNameModal,
} from "../../components/widget-list";
import { useSwitch, useWidget } from "../../hooks";
import { normalizeMetafields, useBulkEdit } from "../../hooks/useBulkEdit";

export default function WidgetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
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

  const {
    widget,
    updateWidget,
    deleteWidget,
    isWidgetUpdating,
    isWidgetDeleting,
  } = useWidget(+id!);

  const normalizedMetafields = widget ? normalizeMetafields(widget.config) : [];

  const handleRename = (name: string) =>
    updateWidget({ name }, { onSuccess: hideRename });

  const handleDelete = () => {
    deleteWidget(+id!, {
      onSuccess: () => {
        hideDelete(), navigate("/");
      },
    });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(widget?.key || "");
    show(`Widget ID copied`);
  };

  if (!id) {
    return null;
  }

  return (
    <Page
      title={widget?.name}
      secondaryActions={[
        {
          content: "Bulk edit metafields",
          onAction: () => bulkEdit(normalizedMetafields),
          disabled: normalizedMetafields.length === 0,
        },
        { content: "Copy ID", onAction: handleCopyId },
        { content: "Rename", onAction: showRename },
      ]}
      backAction={{ content: "Main", url: "/" }}
    >
      <WidgetEditor widgetId={+id} />
      <WidgetNameModal
        title="Rename widget"
        initialName={widget?.name || ""}
        isOpen={isShowRename}
        onClose={hideRename}
        onSave={handleRename}
        isLoading={isWidgetUpdating}
      />
      <WidgetDeleteModal
        isOpen={isShowDelete}
        onClose={hideDelete}
        onConfirm={handleDelete}
        isLoading={isWidgetDeleting}
      />
      {widget && (
        <Box padding="500">
          <FooterFaq />
        </Box>
      )}
    </Page>
  );
}
