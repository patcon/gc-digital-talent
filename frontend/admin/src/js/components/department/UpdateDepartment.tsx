import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import pick from "lodash/pick";

import { toast } from "@common/components/Toast";
import { Input, Submit } from "@common/components/form";
import { errorMessages, commonMessages } from "@common/messages";
import Pending from "@common/components/Pending";
import NotFound from "@common/components/NotFound";
import Heading from "@common/components/Heading/Heading";

import { useAdminRoutes } from "../../adminRoutes";
import {
  Department,
  Scalars,
  UpdateDepartmentInput,
  UpdateDepartmentMutation,
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../api/generated";
import DashboardContentContainer from "../DashboardContentContainer";

type FormValues = UpdateDepartmentInput;

interface UpdateDepartmentProps {
  initialDepartment: Department;
  handleUpdateDepartment: (
    id: string,
    data: FormValues,
  ) => Promise<UpdateDepartmentMutation["updateDepartment"]>;
}

export const UpdateDepartmentForm: React.FunctionComponent<
  UpdateDepartmentProps
> = ({ initialDepartment, handleUpdateDepartment }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const paths = useAdminRoutes();
  const methods = useForm<FormValues>({
    defaultValues: {
      departmentNumber: initialDepartment.departmentNumber,
      name: initialDepartment.name,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    return handleUpdateDepartment(initialDepartment.id, {
      departmentNumber: Number(data.departmentNumber),
      name: data.name,
    })
      .then(() => {
        navigate(paths.departmentTable());
        toast.success(
          intl.formatMessage({
            defaultMessage: "Department updated successfully!",
            id: "GTR9Pt",
            description:
              "Message displayed to user after department is updated successfully.",
          }),
        );
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({
            defaultMessage: "Error: updating department failed",
            id: "nXRLAX",
            description:
              "Message displayed to user after department fails to get updated.",
          }),
        );
      });
  };

  return (
    <section data-h2-container="base(left, s)">
      <Heading level="h1" size="h2">
        {intl.formatMessage({
          defaultMessage: "Update Department",
          id: "KSNNgE",
          description: "Title displayed on the update a department form.",
        })}
      </Heading>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="departmentNumber"
              name="departmentNumber"
              label={intl.formatMessage({
                defaultMessage: "Department #",
                id: "/YiBdv",
                description:
                  "Label displayed on the create a department form department number field.",
              })}
              type="number"
              rules={{
                required: intl.formatMessage(errorMessages.required),
              }}
            />
            <Input
              id="name_en"
              name="name.en"
              label={intl.formatMessage({
                defaultMessage: "Name (English)",
                id: "4boO/6",
                description:
                  "Label displayed on the create a department form name (English) field.",
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
                id: "c0n+2j",
                description:
                  "Label displayed on the create a department form name (French) field.",
              })}
              type="text"
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

type RouteParams = {
  departmentId: Scalars["ID"];
};

const UpdateDepartment = () => {
  const intl = useIntl();
  const { departmentId } = useParams<RouteParams>();
  const [{ data: departmentData, fetching, error }] = useDepartmentQuery({
    variables: { id: departmentId || "" },
  });
  const [, executeMutation] = useUpdateDepartmentMutation();
  const handleUpdateDepartment = (id: string, data: UpdateDepartmentInput) =>
    executeMutation({
      id,
      department: pick(data, ["departmentName", "name.en", "name.fr"]),
    }).then((result) => {
      if (result.data?.updateDepartment) {
        return result.data?.updateDepartment;
      }
      return Promise.reject(result.error);
    });

  return (
    <Pending fetching={fetching} error={error}>
      <DashboardContentContainer>
        {departmentData?.department ? (
          <UpdateDepartmentForm
            initialDepartment={departmentData.department}
            handleUpdateDepartment={handleUpdateDepartment}
          />
        ) : (
          <NotFound
            headingMessage={intl.formatMessage(commonMessages.notFound)}
          >
            <p>
              {intl.formatMessage(
                {
                  defaultMessage: "Department {departmentId} not found.",
                  id: "8Otaw9",
                  description: "Message displayed for department not found.",
                },
                { departmentId },
              )}
            </p>
          </NotFound>
        )}
      </DashboardContentContainer>
    </Pending>
  );
};

export default UpdateDepartment;
