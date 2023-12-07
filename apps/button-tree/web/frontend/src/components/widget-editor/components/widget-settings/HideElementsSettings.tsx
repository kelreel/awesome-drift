import {
  HideElementCondition,
  HideElementRule,
  WidgetSettings,
} from "@blinks/shared";
import {
  Banner,
  BlockStack,
  Button,
  Card,
  Checkbox,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
import { CancelMajor } from "@shopify/polaris-icons";
import React from "react";
import styled from "styled-components";

interface Props {
  settings: WidgetSettings;
  onChange: (value: WidgetSettings) => void;
}

const List = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: 12px;
  margin: 12px 0;
`;

const Rule = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgb(0 0 0/14%),
    0 2px 2px rgb(0 0 0/14%);
  gap: 12px;
  flex: 1;
  padding: 10px 10px;
  width: 100%;
  position: relative;
`;

const DeleteBtnWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(0.7);
`;

const ConditionOptions: { label: string; value: HideElementCondition }[] = [
  {
    label: "Always",
    value: "always",
  },
  {
    label: "All buttons visible",
    value: "all_btn_has_data",
  },
  {
    label: "At least one button visible",
    value: "one_btn_has_data",
  },
];

export const HideElementsSettings = ({
  settings,
  onChange,
}: Props): JSX.Element => {
  const { enable, rules } = settings.hideElements;

  const handleChange = (data: Partial<WidgetSettings["hideElements"]>) => {
    onChange({
      ...settings,
      hideElements: { ...settings.hideElements, ...data },
    });
  };

  const handleAddRule = () => {
    handleChange({ rules: [...rules, { condition: "always", selector: "" }] });
  };

  const handleRuleChange = (ruleIndex: number, data: HideElementRule) => {
    const newRules = [...rules];
    newRules[ruleIndex] = { ...newRules[ruleIndex], ...data };
    handleChange({ rules: newRules });
  };

  const handleRuleDelete = (ruleIndex: number) => {
    if (confirm(`Are you sure you want to delete rule?`)) {
      const newRules = [...rules];
      newRules.splice(ruleIndex, 1);
      handleChange({ rules: newRules });
    }
  };

  return (
    <FormLayout>
      <BlockStack gap="200">
        <Card padding="0">
          <Banner
            tone="info"
            action={{ content: "Learn more", url: "https://shopify.com" }}
          >
            <p>
              You can hide page elements like "Buy now" or "Add to cart" buttons
              from Online Store with conditions.
            </p>
          </Banner>
        </Card>

        <Checkbox
          label="Hide elements"
          checked={enable}
          onChange={(value) => handleChange({ enable: value })}
        />
      </BlockStack>
      {enable && (
        <BlockStack gap="200" inlineAlign="start">
          <List>
            {rules.map((rule, index) => (
              <Rule key={index}>
                <Select
                  label="Condition"
                  options={ConditionOptions}
                  value={rule.condition}
                  onChange={(value) =>
                    handleRuleChange(index, {
                      ...rule,
                      condition: value as HideElementCondition,
                    })
                  }
                />
                <TextField
                  label="Selector"
                  autoComplete="off"
                  placeholder=".buy-button"
                  value={rule.selector}
                  onChange={(value) =>
                    handleRuleChange(index, { ...rule, selector: value })
                  }
                  error={!rule.selector}
                />
                <DeleteBtnWrapper>
                  <Button
                    icon={CancelMajor}
                    onClick={() => handleRuleDelete(index)}
                  />
                </DeleteBtnWrapper>
              </Rule>
            ))}
          </List>
          <Button variant="primary" onClick={handleAddRule}>
            Add rule
          </Button>
        </BlockStack>
      )}
    </FormLayout>
  );
};
