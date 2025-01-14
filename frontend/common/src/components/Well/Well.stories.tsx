import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Well from "./Well";

type ComponentType = typeof Well;
type Meta = ComponentMeta<ComponentType>;
type Story = ComponentStory<ComponentType>;

export default {
  component: Well,
  title: "Components/Well",
  args: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget condimentum nunc.",
  },
} as Meta;

const Template: Story = (args) => {
  const { content } = args;
  return (
    <Well>
      <p>{content}</p>
    </Well>
  );
};

export const Default = Template.bind({});
