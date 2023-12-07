import { WidgetSettings } from "@blinks/shared";
import { useToast } from "@shopify/app-bridge-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useApi } from "./useApi";

interface Widget {
  id: number;
  name: string;
  namespace: string;
  key: string;
  config: WidgetSettings;
}

export const useWidget = (widgetId?: number) => {
  const api = useApi();
  const qc = useQueryClient();

  const { show } = useToast();

  const { data: widget, isLoading: isWidgetLoading } = useQuery(
    [`widget`, widgetId],
    async () => api.get(`widget/${widgetId}`).json<Widget>(),
    {
      enabled: !!widgetId,
    },
  );

  const { mutate: updateWidget, isLoading: isWidgetUpdating } = useMutation({
    mutationFn: (data: Partial<Widget>) => {
      // update config or name
      return api.patch(`widget/${data.id}`, { json: { ...data } }).json();
    },
    onSuccess: (_, patch) => {
      qc.invalidateQueries(["widget", patch.id]);
      qc.invalidateQueries(["widget-list"]);
      show("Widget saved", { duration: 5_000 });
    },
  });

  const { mutate: deleteWidget, isLoading: isWidgetDeleting } = useMutation({
    mutationFn: (widgetId: number) => {
      return api.delete(`widget/${widgetId}`).json();
    },
    onSuccess: () => {
      qc.invalidateQueries(["widget-list"]);
      show("Widget deleted", { duration: 5_000 });
    },
  });

  return {
    widget,
    isWidgetLoading,
    updateWidget,
    isWidgetUpdating,
    deleteWidget,
    isWidgetDeleting,
  };
};
