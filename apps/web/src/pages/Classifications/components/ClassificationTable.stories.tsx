import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import fakeClassifications from "@common/fakeData/fakeClassifications";

import { ClassificationTable } from "./ClassificationTable";

const mockClassifications = fakeClassifications();

export default {
  component: ClassificationTable,
  title: "Tables/Classification Table",
} as ComponentMeta<typeof ClassificationTable>;

const Template: ComponentStory<typeof ClassificationTable> = (args) => {
  const { classifications } = args;
  return <ClassificationTable classifications={classifications} />;
};

export const Default = Template.bind({});
Default.args = {
  classifications: mockClassifications,
};