import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import Form from "@common/components/form/BasicForm";
import Submit from "@common/components/form/Submit";
import { useIntl } from "react-intl";
import CommunityExperienceForm from "./CommunityExperienceForm";
import getExperienceFormLabels from "../experienceForm/labels";

export default {
  component: CommunityExperienceForm,
  title: "CommunityExperienceForm",
} as Meta;

const TemplateCommunityExperienceForm: Story = () => {
  const intl = useIntl();
  const labels = getExperienceFormLabels(intl, "community");
  return (
    <Form onSubmit={action("submit")}>
      <CommunityExperienceForm labels={labels} />
      <Submit />
    </Form>
  );
};

export const IndividualCommunityExperience =
  TemplateCommunityExperienceForm.bind({});
