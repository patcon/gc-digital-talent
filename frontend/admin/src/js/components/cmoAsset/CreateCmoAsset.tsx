import * as React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "@common/components/Toast";
import { Input, Submit, TextArea } from "@common/components/form";
import { errorMessages } from "@common/messages";
import { keyStringRegex } from "@common/constants/regularExpressions";
import Heading from "@common/components/Heading/Heading";

import { useAdminRoutes } from "../../adminRoutes";
import {
  CreateCmoAssetInput,
  useCreateCmoAssetMutation,
} from "../../api/generated";
import DashboardContentContainer from "../DashboardContentContainer";

type FormValues = CreateCmoAssetInput;
interface CreateCmoAssetFormProps {
  handleCreateCmoAsset: (data: FormValues) => Promise<FormValues>;
}

export const CreateCmoAssetForm: React.FunctionComponent<
  CreateCmoAssetFormProps
> = ({ handleCreateCmoAsset }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const paths = useAdminRoutes();
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    return handleCreateCmoAsset(data)
      .then(() => {
        navigate(paths.cmoAssetTable());
        toast.success(
          intl.formatMessage({
            defaultMessage: "CMO Asset created successfully!",
            id: "Nhto6b",
            description:
              "Message displayed to user after cmo asset is created successfully.",
          }),
        );
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({
            defaultMessage: "Error: creating cmo asset failed",
            id: "NhQGh5",
            description:
              "Message displayed to user after cmo asset fails to get created.",
          }),
        );
      });
  };
  return (
    <section data-h2-container="base(left, s)">
      <Heading level="h1" size="h2">
        {intl.formatMessage({
          defaultMessage: "Create CMO Asset",
          id: "MpB5zS",
          description: "Title displayed on the create a cmo asset form.",
        })}
      </Heading>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="key"
              name="key"
              label={intl.formatMessage({
                defaultMessage: "Key",
                id: "BfXsHe",
                description:
                  "Label displayed on the create a cmo asset form key field.",
              })}
              context={intl.formatMessage({
                defaultMessage:
                  "The 'key' is a string that uniquely identifies a CMO Asset. It should be based on the CMO Asset's English name, and it should be concise. A good example would be \"information_management\". It may be used in the code to refer to this particular CMO Asset, so it cannot be changed later.",
                id: "vg3F7X",
                description:
                  "Additional context describing the purpose of the CMO Asset's 'key' field.",
              })}
              type="text"
              rules={{
                required: intl.formatMessage(errorMessages.required),
                pattern: {
                  value: keyStringRegex,
                  message: intl.formatMessage({
                    defaultMessage:
                      "Please use only lowercase letters and underscores.",
                    id: "aPqZsz",
                  }),
                },
              }}
            />
            <Input
              id="name_en"
              name="name.en"
              label={intl.formatMessage({
                defaultMessage: "Name (English)",
                id: "U6V+uR",
                description:
                  "Label displayed on the create a cmo asset form name (English) field.",
              })}
              type="text"
              rules={{
                required: intl.formatMessage(errorMessages.required),
              }}
            />
            <Input
              id="name_fr"
              name="name.fr"
              label={intl.formatMessage({
                defaultMessage: "Name (French)",
                id: "pHVKt/",
                description:
                  "Label displayed on the create a cmo asset form name (French) field.",
              })}
              type="text"
              rules={{
                required: intl.formatMessage(errorMessages.required),
              }}
            />
            <TextArea
              id="description_en"
              name="description.en"
              label={intl.formatMessage({
                defaultMessage: "Description (English)",
                id: "zgaPwN",
                description:
                  "Label displayed on the create a cmo asset form description (English) field.",
              })}
              rules={{
                required: intl.formatMessage(errorMessages.required),
              }}
            />
            <TextArea
              id="description_fr"
              name="description.fr"
              label={intl.formatMessage({
                defaultMessage: "Description (French)",
                id: "oVWttp",
                description:
                  "Label displayed on the create a cmo asset form description (French) field.",
              })}
              rules={{
                required: intl.formatMessage(errorMessages.required),
              }}
            />
            <Submit />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

const CreateCmoAsset: React.FunctionComponent = () => {
  const [, executeMutation] = useCreateCmoAssetMutation();
  const handleCreateCmoAsset = (data: CreateCmoAssetInput) =>
    executeMutation({ cmoAsset: data }).then((result) => {
      if (result.data?.createCmoAsset) {
        return result.data?.createCmoAsset;
      }
      return Promise.reject(result.error);
    });

  return (
    <DashboardContentContainer>
      <CreateCmoAssetForm handleCreateCmoAsset={handleCreateCmoAsset} />
    </DashboardContentContainer>
  );
};

export default CreateCmoAsset;
