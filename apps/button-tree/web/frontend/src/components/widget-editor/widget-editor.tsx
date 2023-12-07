import "../../../widget-runtime/widget";

import { SharedConfig, WidgetBootstrap, WidgetSettings } from "@blinks/shared";
import { ContextualSaveBar, Loading } from "@shopify/app-bridge-react";
import { BlockStack, Layout } from "@shopify/polaris";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

import { useWidget } from "../../hooks/useWidget";
import { CollapsibleBlock } from "./collapsible-block";
import { ButtonEditor, ButtonList } from "./components/button-list";
import {
  EditorCustomCss,
  EditorGeneral,
  EditorTitle,
  HideElementsSettings,
} from "./components/widget-settings";

const TabCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0 16px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsPanel = styled.div``;

const PreviewContainer = styled.div`
  position: sticky;
  top: 20px;
`;

const PreviewCard = styled(TabCard)`
  padding: 16px;
`;

const CardContent = styled.div`
  padding: 0px;
`;

interface Props {
  widgetId: number;
}

export const WidgetEditor = ({ widgetId }: Props): ReactElement => {
  const [settings, setSettings] = useState<WidgetSettings>();
  const [debouncedSettings] = useDebounce(settings, 300);
  const ref = useRef<HTMLDivElement>(null);
  const [isChanged, setIsChanged] = useState(false);

  // open first button setting on widget open
  const isButtonSelectedOnInit = useRef(false);

  const [editButtonId, setEditButtonId] = useState<string | null>(null);

  const { widget, isWidgetLoading, isWidgetUpdating, updateWidget } =
    useWidget(widgetId);

  useEffect(() => {
    if (widget?.config) {
      setSettings(widget.config);
      if (!isButtonSelectedOnInit.current && widget.config.buttons.length > 0) {
        setEditButtonId(widget.config.buttons[0].id);
        isButtonSelectedOnInit.current = false;
      }
    }
  }, [widget?.config]);

  const handleDiscard = () => {
    setSettings(widget?.config);
    setIsChanged(false);
  };

  useEffect(() => {
    if (ref.current && debouncedSettings) {
      window[SharedConfig.windowRuntimeKey](ref.current, {
        settings: JSON.stringify(debouncedSettings),
        platform: "Demo",
        editButtonId,
        onButtonEdit: (id) => {
          if (editButtonId === id) {
            setEditButtonId(null);
          } else {
            setEditButtonId(id);
            setPanel("buttons");
          }
        },
      } as WidgetBootstrap);
    }
  }, [debouncedSettings, editButtonId]);

  const handleChange = (settings: WidgetSettings) => {
    setSettings((prev) => ({ ...prev, ...settings }));
    setIsChanged(true);
  };

  const [panel, setPanel] = useState("buttons");

  return (
    <Layout>
      <ContextualSaveBar
        fullWidth
        visible={isChanged && !isWidgetUpdating}
        saveAction={{
          onAction: () => {
            updateWidget(
              { config: settings, id: widgetId },
              { onSuccess: () => setIsChanged(false) },
            );
          },
          disabled: false,
          loading: false,
        }}
        discardAction={{
          onAction: handleDiscard,
          disabled: false,
          loading: false,
        }}
      />
      {(isWidgetLoading || isWidgetUpdating) && <Loading />}
      {settings && (
        <Layout.Section variant="fullWidth">
          <Container>
            <SettingsPanel>
              <BlockStack gap="100">
                <TabCard>
                  <CardContent>
                    <CollapsibleBlock
                      title="Buttons"
                      isOpen={panel === "buttons"}
                      onOpen={() => setPanel("buttons")}
                      onClose={() => setPanel("")}
                    >
                      <ButtonList
                        settings={settings}
                        onChange={handleChange}
                        onEdit={(id) => {
                          setEditButtonId(id === editButtonId ? null : id);
                        }}
                        selected={editButtonId}
                      />

                      <ButtonEditor
                        settings={settings}
                        onChange={handleChange}
                        buttonId={editButtonId}
                      />
                    </CollapsibleBlock>
                  </CardContent>
                </TabCard>

                <TabCard>
                  <CardContent>
                    <CollapsibleBlock
                      title="Layout"
                      isOpen={panel === "layout"}
                      onOpen={() => setPanel("layout")}
                      onClose={() => setPanel("")}
                    >
                      <EditorGeneral
                        settings={settings}
                        onChange={handleChange}
                      />
                    </CollapsibleBlock>
                  </CardContent>
                </TabCard>

                <TabCard>
                  <CardContent>
                    <CollapsibleBlock
                      title="Heading"
                      isOpen={panel === "heading"}
                      onOpen={() => setPanel("heading")}
                      onClose={() => setPanel("")}
                    >
                      <EditorTitle
                        settings={settings}
                        onChange={handleChange}
                      />
                    </CollapsibleBlock>
                  </CardContent>
                </TabCard>

                <TabCard>
                  <CardContent>
                    <CollapsibleBlock
                      title="Custom CSS"
                      isOpen={panel === "css"}
                      onOpen={() => setPanel("css")}
                      onClose={() => setPanel("")}
                    >
                      <EditorCustomCss
                        settings={settings}
                        onChange={handleChange}
                      />
                    </CollapsibleBlock>
                  </CardContent>
                </TabCard>

                <TabCard>
                  <CardContent>
                    <CollapsibleBlock
                      title="Advanced"
                      isOpen={panel === "advanced"}
                      onOpen={() => setPanel("advanced")}
                      onClose={() => setPanel("")}
                    >
                      <HideElementsSettings
                        settings={settings}
                        onChange={handleChange}
                      />
                    </CollapsibleBlock>
                  </CardContent>
                </TabCard>
              </BlockStack>
            </SettingsPanel>
            <PreviewContainer>
              <PreviewCard>
                <div ref={ref}></div>
              </PreviewCard>
            </PreviewContainer>
          </Container>
        </Layout.Section>
      )}
    </Layout>
  );
};
