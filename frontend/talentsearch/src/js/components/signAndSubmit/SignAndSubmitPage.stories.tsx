import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FAR_FUTURE_DATE } from "@common/helpers/dateUtils";
import { SignAndSubmitForm } from "./SignAndSubmitPage";

export default {
  component: SignAndSubmitForm,
  title: "Sign and Submit page",
  args: {
    applicationId: "1",
    poolAdvertisementId: "1",
    userId: "1",
    closingDate: FAR_FUTURE_DATE,
    jobTitle: "Application Developer - React (IT-01)",
    isApplicationComplete: true,
    handleSubmitApplication: async (id, signature) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      action("Submit Application")({ id, signature });
      return null;
    },
  },
} as ComponentMeta<typeof SignAndSubmitForm>;

const Template: ComponentStory<typeof SignAndSubmitForm> = (args) => {
  return <SignAndSubmitForm {...args} />;
};

export const ApplicationIsComplete = Template.bind({});
export const ApplicationIsIncomplete = Template.bind({});

ApplicationIsIncomplete.args = {
  isApplicationComplete: false,
};
