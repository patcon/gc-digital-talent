import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import commonMessages from "@common/messages/commonMessages";
import { useLocation } from "@common/helpers/router";
import { notEmpty } from "@common/helpers/util";
import { FromArray } from "@common/types/utilityTypes";
import { DepartmentsQuery, useDepartmentsQuery } from "../../api/generated";
import Table, { ColumnsOf } from "../Table";
import DashboardContentContainer from "../DashboardContentContainer";
import { tableEditButtonAccessor } from "../TableEditButton";

type Data = NonNullable<FromArray<DepartmentsQuery["departments"]>>;

export const DepartmentTable: React.FC<
  DepartmentsQuery & { editUrlRoot: string }
> = ({ departments, editUrlRoot }) => {
  const intl = useIntl();
  const columns = useMemo<ColumnsOf<Data>>(
    () => [
      {
        Header: intl.formatMessage({
          defaultMessage: "Department #",
          description:
            "Title displayed for the Department table Department # column.",
        }),
        accessor: "departmentNumber",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Name",
          description: "Title displayed for the Department table Name column.",
        }),
        accessor: (d) => d.name?.en,
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Edit",
          description: "Title displayed for the Department table Edit column.",
        }),
        accessor: (d) => tableEditButtonAccessor(d.id, editUrlRoot), // callback extracted to separate function to stabilize memoized component
      },
    ],
    [editUrlRoot, intl],
  );

  const data = useMemo(() => departments.filter(notEmpty), [departments]);

  return <Table data={data} columns={columns} />;
};

export const DepartmentTableApi: React.FunctionComponent = () => {
  const intl = useIntl();
  const [result] = useDepartmentsQuery();
  const { data, fetching, error } = result;
  const { pathname } = useLocation();

  if (fetching)
    return (
      <DashboardContentContainer>
        <p>{intl.formatMessage(commonMessages.loadingTitle)}</p>
      </DashboardContentContainer>
    );
  if (error)
    return (
      <DashboardContentContainer>
        <p>
          {intl.formatMessage(commonMessages.loadingError)}
          {error.message}
        </p>
      </DashboardContentContainer>
    );

  return (
    <DepartmentTable
      departments={data?.departments ?? []}
      editUrlRoot={pathname}
    />
  );
};