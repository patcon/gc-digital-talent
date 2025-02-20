import * as React from "react";
import TableOfContents from "@common/components/TableOfContents";
import { useIntl } from "react-intl";
import { Input, Submit } from "@common/components/form";
import { FormProvider, useForm } from "react-hook-form";
import { useDeepCompareEffect } from "@common/hooks/useDeepCompareEffect";
import {
  convertDateTimeToDate,
  convertDateTimeZone,
} from "@common/helpers/dateUtils";
import {
  AdvertisementStatus,
  PoolAdvertisement,
  UpdatePoolAdvertisementInput,
} from "../../../api/generated";
import { SectionMetadata, Spacer } from "./EditPool";
import { useEditPoolContext } from "./EditPoolContext";

type FormValues = {
  endDate?: PoolAdvertisement["expiryDate"];
};

export type ClosingDateSubmitData = Pick<
  UpdatePoolAdvertisementInput,
  "expiryDate"
>;
interface ClosingDateSectionProps {
  poolAdvertisement: PoolAdvertisement;
  sectionMetadata: SectionMetadata;
  onSave: (submitData: ClosingDateSubmitData) => void;
}

export const ClosingDateSection = ({
  poolAdvertisement,
  sectionMetadata,
  onSave,
}: ClosingDateSectionProps): JSX.Element => {
  const intl = useIntl();
  const { isSubmitting } = useEditPoolContext();

  const dataToFormValues = (initialData: PoolAdvertisement): FormValues => {
    const expiryDateInPacific = initialData.expiryDate
      ? convertDateTimeToDate(
          convertDateTimeZone(initialData.expiryDate, "UTC", "Canada/Pacific"),
        )
      : null;

    return {
      endDate: expiryDateInPacific,
    };
  };

  const suppliedValues = dataToFormValues(poolAdvertisement);
  const methods = useForm<FormValues>({
    defaultValues: suppliedValues,
  });
  const { handleSubmit, reset } = methods;

  useDeepCompareEffect(() => {
    reset(suppliedValues);
  }, [suppliedValues, reset]);

  const handleSave = (formValues: FormValues) => {
    const expiryDateInUtc = formValues.endDate
      ? convertDateTimeZone(
          `${formValues.endDate} 23:59:59`,
          "Canada/Pacific",
          "UTC",
        )
      : null;

    onSave({
      expiryDate: expiryDateInUtc,
    });
    methods.reset(formValues, {
      keepDirty: false,
    });
  };

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
            "The closing time will be automatically set to 11:59 PM in the Pacific time zone.",
          id: "Aaas0w",
          description: "Helper message for changing the pool closing date",
        })}
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)}>
          <div data-h2-display="base(flex)">
            <Spacer style={{ flex: 1 }}>
              <Input
                id="endDate"
                label={intl.formatMessage({
                  defaultMessage: "End Date",
                  id: "80DOGy",
                  description:
                    "Label displayed on the pool candidate form end date field.",
                })}
                type="date"
                name="endDate"
                disabled={formDisabled}
              />
            </Spacer>
            <Spacer style={{ flex: 1 }} />
          </div>

          {!formDisabled && (
            <Submit
              text={intl.formatMessage({
                defaultMessage: "Save closing date",
                id: "jttjmJ",
                description: "Text on a button to save the pool closing date",
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

export default ClosingDateSection;
