import * as React from "react";
import TableOfContents from "@common/components/TableOfContents";
import { useIntl } from "react-intl";
import { notEmpty } from "@common/helpers/util";
import { getLocalizedName } from "@common/helpers/localize";
import { Input, Select, Submit } from "@common/components/form";
import { Option } from "@common/components/form/Select";
import { FormProvider, useForm } from "react-hook-form";
import { enumToOptions } from "@common/helpers/formUtils";
import { getPoolStream } from "@common/constants/localizedConstants";
import {
  AdvertisementStatus,
  Classification,
  LocalizedString,
  Maybe,
  PoolAdvertisement,
  PoolStream,
  Scalars,
  UpdatePoolAdvertisementInput,
} from "../../../api/generated";
import { SectionMetadata, Spacer } from "./EditPool";
import { useEditPoolContext } from "./EditPoolContext";

type FormValues = {
  classification?: Classification["id"];
  stream?: PoolStream;
  specificTitleEn?: LocalizedString["en"];
  specificTitleFr?: LocalizedString["fr"];
  processNumber?: string;
};

export type PoolNameSubmitData = Pick<
  UpdatePoolAdvertisementInput,
  "classifications" | "name"
>;

interface PoolNameSectionProps {
  poolAdvertisement: PoolAdvertisement;
  classifications: Array<Maybe<Classification>>;
  sectionMetadata: SectionMetadata;
  onSave: (submitData: PoolNameSubmitData) => void;
}

const firstId = (
  collection: Maybe<Maybe<Classification>[]>,
): Scalars["ID"] | undefined => {
  if (!collection) return undefined;

  if (collection.length < 1) return undefined;

  return collection[0]?.id;
};

export const PoolNameSection = ({
  poolAdvertisement,
  classifications,
  sectionMetadata,
  onSave,
}: PoolNameSectionProps): JSX.Element => {
  const intl = useIntl();
  const { isSubmitting } = useEditPoolContext();

  const dataToFormValues = (initialData: PoolAdvertisement): FormValues => ({
    classification: firstId(initialData.classifications), // behavior is undefined when there is more than one
    stream: initialData.stream ?? undefined,
    specificTitleEn: initialData.name?.en ?? "",
    specificTitleFr: initialData.name?.fr ?? "",
    processNumber: initialData.processNumber ?? "",
  });

  const methods = useForm<FormValues>({
    defaultValues: dataToFormValues(poolAdvertisement),
  });
  const { handleSubmit } = methods;

  const handleSave = (formValues: FormValues) => {
    const data = {
      classifications: {
        sync: formValues.classification ? [formValues.classification] : [],
      },
      stream: formValues.stream ? formValues.stream : undefined,
      name: {
        en: formValues.specificTitleEn,
        fr: formValues.specificTitleFr,
      },
      processNumber: formValues.processNumber ? formValues.processNumber : null,
    };

    onSave(data);
    methods.reset(formValues, {
      keepDirty: false,
    });
  };

  const classificationOptions: Option[] = classifications
    .filter(notEmpty)
    .map(({ id, group, level, name }) => ({
      value: id,
      label: `${group}-0${level} (${getLocalizedName(name, intl)})`,
    }))
    .sort((a, b) => (a.label >= b.label ? 1 : -1));

  const streamOptions: Option[] = enumToOptions(PoolStream).map(
    ({ value }) => ({
      value,
      label: intl.formatMessage(getPoolStream(value)),
    }),
  );

  // disabled unless status is draft
  const formDisabled =
    poolAdvertisement.advertisementStatus !== AdvertisementStatus.Draft;

  return (
    <TableOfContents.Section id={sectionMetadata.id}>
      <TableOfContents.Heading data-h2-margin="base(x3, 0, x1, 0)">
        {sectionMetadata.title}
      </TableOfContents.Heading>
      <p>
        {intl.formatMessage({
          defaultMessage:
            "Select the classification intended for this recruitment process.",
          id: "5PIt8V",
          description:
            "Helper message for selecting a classification for the pool",
        })}
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)}>
          <div data-h2-display="base(flex)">
            <Spacer style={{ flex: 1 }}>
              <Select
                id="classification"
                label={intl.formatMessage({
                  defaultMessage: "Classification",
                  id: "w/qZsH",
                  description:
                    "Label displayed on the pool form classification field.",
                })}
                name="classification"
                options={classificationOptions}
                disabled={formDisabled}
              />
            </Spacer>
            <Spacer style={{ flex: 1 }}>
              <Select
                id="stream"
                label={intl.formatMessage({
                  defaultMessage: "Streams/Job Titles",
                  id: "PzijvH",
                  description:
                    "Label displayed on the pool form stream/job title field.",
                })}
                name="stream"
                nullSelection={intl.formatMessage({
                  defaultMessage: "Select a stream/job title...",
                  id: "vgOfaa",
                  description:
                    "Placeholder displayed on the pool form classification field.",
                })}
                options={streamOptions}
                disabled={formDisabled}
              />
            </Spacer>
          </div>
          <div data-h2-display="base(flex)">
            <Spacer style={{ flex: 1 }}>
              <Input
                id="specificTitleEn"
                name="specificTitleEn"
                type="text"
                label={intl.formatMessage({
                  defaultMessage: "Specific Title (English)",
                  id: "fTwl6k",
                  description:
                    "Label for a pool advertisements specific English title",
                })}
                disabled={formDisabled}
              />
            </Spacer>

            <Spacer style={{ flex: 1 }}>
              <Input
                id="specificTitleFr"
                name="specificTitleFr"
                type="text"
                label={intl.formatMessage({
                  defaultMessage: "Specific Title (French)",
                  id: "MDjwSO",
                  description:
                    "Label for a pool advertisements specific French title",
                })}
                disabled={formDisabled}
              />
            </Spacer>
          </div>
          <div data-h2-display="base(flex)">
            <Spacer style={{ flex: 1 }}>
              <Input
                id="processNumber"
                name="processNumber"
                type="text"
                label={intl.formatMessage({
                  defaultMessage: "Process Number",
                  id: "1E0RiD",
                  description: "Label for a pools process number",
                })}
                context={intl.formatMessage({
                  defaultMessage:
                    "This process number is obtained from your HR shop",
                  id: "Ao/+Ba",
                  description:
                    "Additional context describing the pools process number.",
                })}
                disabled={formDisabled}
              />
            </Spacer>
            <Spacer style={{ flex: 1 }} />
          </div>

          {!formDisabled && (
            <Submit
              text={intl.formatMessage({
                defaultMessage: "Save pool name",
                id: "bbIDc9",
                description: "Text on a button to save the pool name",
              })}
              color="cta"
              mode="solid"
              isSubmitting={isSubmitting}
            />
          )}
        </form>
      </FormProvider>
    </TableOfContents.Section>
  );
};

export default PoolNameSection;
