import React from "react";
import { useIntl } from "react-intl";
import { useWatch } from "react-hook-form";
import Input from "@common/components/form/Input";
import Checkbox from "@common/components/form/Checkbox";
import { errorMessages } from "@common/messages";

import { SubExperienceFormProps } from "../experienceForm/types";

export const CommunityExperienceForm = ({ labels }: SubExperienceFormProps) => {
  const intl = useIntl();
  const todayDate = Date();

  // to toggle whether endDate is required, the state of the current-role checkbox must be monitored and have to adjust the form accordingly
  const isCurrent = useWatch({ name: "currentRole" });
  // ensuring endDate isn't before startDate, using this as a minimum value
  const startDate = useWatch({ name: "startDate" });

  return (
    <div>
      <h2 data-h2-font-size="base(h3, 1)" data-h2-margin="base(x2, 0, x1, 0)">
        {intl.formatMessage({
          defaultMessage: "1. Community Experience Details",
          id: "OUKOBH",
          description: "Title for Community Experience form",
        })}
      </h2>
      <p>
        {intl.formatMessage({
          defaultMessage:
            "Gained experience by being part of or giving back to a community? People learn skills from a wide range of experiences like volunteering or being part of non-profit organizations, indigenous communities, or virtual collaborations.",
          id: "gDQZIQ",
          description: "Description blurb for Community Experience form",
        })}
      </p>
      <div data-h2-margin="base(x.5, 0, 0, 0)" data-h2-max-width="base(50rem)">
        <div data-h2-flex-grid="base(flex-start, x2, 0)">
          <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
            <Input
              id="role"
              label={labels.role}
              placeholder={intl.formatMessage({
                defaultMessage: "Write title here...",
                id: "5ikciS",
                description:
                  "Placeholder displayed on the Community Experience form for role input",
              })}
              name="role"
              type="text"
              rules={{ required: intl.formatMessage(errorMessages.required) }}
            />
          </div>
          <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
            <div data-h2-margin="base(x1, 0, x.875, 0)">
              <Checkbox
                boundingBox
                boundingBoxLabel={labels.currentRole}
                id="currentRole"
                label={intl.formatMessage({
                  defaultMessage: "I am currently active in this role",
                  id: "wASF5V",
                  description:
                    "Label displayed on Community Experience form for current role input",
                })}
                name="currentRole"
              />
            </div>
          </div>
          <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
            <Input
              id="organization"
              label={labels.organization}
              placeholder={intl.formatMessage({
                defaultMessage: "Write group name here...",
                id: "EfR7Rv",
                description:
                  "Placeholder displayed on the Community Experience form for organization input",
              })}
              name="organization"
              type="text"
              rules={{ required: intl.formatMessage(errorMessages.required) }}
            />
          </div>
          <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
            <div data-h2-flex-grid="base(flex-start, x2, 0)">
              <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
                <Input
                  id="startDate"
                  label={labels.startDate}
                  name="startDate"
                  type="date"
                  rules={{
                    required: intl.formatMessage(errorMessages.required),
                    max: {
                      value: todayDate,
                      message: intl.formatMessage(
                        errorMessages.mustNotBeFuture,
                      ),
                    },
                  }}
                />
              </div>
              <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
                {/* conditionally render the endDate based off the state attached to the checkbox input */}
                {!isCurrent && (
                  <Input
                    id="endDate"
                    label={labels.endDate}
                    name="endDate"
                    type="date"
                    rules={
                      isCurrent
                        ? {}
                        : {
                            required: intl.formatMessage(
                              errorMessages.required,
                            ),
                            min: {
                              value: startDate,
                              message: intl.formatMessage(
                                errorMessages.mustBeGreater,
                                {
                                  value: startDate,
                                },
                              ),
                            },
                          }
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div data-h2-flex-item="base(1of1) p-tablet(1of2)">
            <Input
              id="project"
              label={labels.project}
              placeholder={intl.formatMessage({
                defaultMessage: "Write project name here...",
                id: "81ITk+",
                description:
                  "Placeholder displayed on the Community Experience form for project input",
              })}
              name="project"
              type="text"
              rules={{ required: intl.formatMessage(errorMessages.required) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityExperienceForm;
