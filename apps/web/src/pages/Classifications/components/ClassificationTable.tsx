import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { OperationContext } from "urql";

import { notEmpty } from "@common/helpers/util";
import { FromArray } from "@common/types/utilityTypes";
import { getLocale } from "@common/helpers/localize";
import Pending from "@common/components/Pending";

import {
  GetClassificationsQuery,
  useGetClassificationsQuery,
} from "~/api/generated";
import useRoutes from "~/hooks/useRoutes";
import Table, {
  ColumnsOf,
  tableEditButtonAccessor,
} from "~/components/Table/ClientManagedTable";

type Data = NonNullable<FromArray<GetClassificationsQuery["classifications"]>>;

interface ClassificationTableProps {
  classifications: GetClassificationsQuery["classifications"];
}

export const ClassificationTable = ({
  classifications,
}: ClassificationTableProps) => {
  const intl = useIntl();
  const locale = getLocale(intl);
  const paths = useRoutes();
  const columns = useMemo<ColumnsOf<Data>>(
    () => [
      {
        Header: intl.formatMessage({
          defaultMessage: "ID",
          id: "VqyL+/",
          description: "Title displayed on the Classification table ID column.",
        }),
        accessor: "id",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Name",
          id: "HUCIzc",
          description:
            "Title displayed for the Classification table Name column.",
        }),
        accessor: (d) => d.name?.[locale],
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Group",
          id: "aS4Lty",
          description:
            "Title displayed for the Classification table Group column.",
        }),
        accessor: "group",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Level",
          id: "yZqUAU",
          description:
            "Title displayed for the Classification table Level column.",
        }),
        accessor: "level",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Minimum Salary",
          id: "9c/MAZ",
          description:
            "Title displayed for the Classification table Minimum Salary column.",
        }),
        accessor: "minSalary",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Maximum Salary",
          id: "Ke0TPJ",
          description:
            "Title displayed for the Classification table Maximum Salary column.",
        }),
        accessor: "maxSalary",
      },
      {
        Header: intl.formatMessage({
          defaultMessage: "Edit",
          id: "D753gS",
          description:
            "Title displayed for the Classification table Edit column.",
        }),
        accessor: (d) =>
          tableEditButtonAccessor(
            d.id,
            paths.classificationTable(),
            `${d.name?.[locale]} ${d.group}-0${d.level}`,
          ), // callback extracted to separate function to stabilize memoized component
      },
    ],
    [intl, locale, paths],
  );

  const memoizedData = useMemo(
    () => classifications.filter(notEmpty),
    [classifications],
  );

  return (
    <Table
      data={memoizedData}
      columns={columns}
      hiddenCols={["minSalary", "maxSalary"]}
      addBtn={{
        path: paths.classificationCreate(),
        label: intl.formatMessage({
          defaultMessage: "Create Classification",
          id: "DexZJJ",
          description:
            "Heading displayed above the Create Classification form.",
        }),
      }}
    />
  );
};

const context: Partial<OperationContext> = {
  additionalTypenames: ["Classification"], // This lets urql know when to invalidate cache if request returns empty list. https://formidable.com/open-source/urql/docs/basics/document-caching/#document-cache-gotchas
  requestPolicy: "cache-first", // The list of classifications will rarely change, so we override default request policy to avoid unnecessary cache updates.
};

const ClassificationTableApi: React.FunctionComponent = () => {
  const [result] = useGetClassificationsQuery({
    context,
  });
  const { data, fetching, error } = result;

  return (
    <Pending fetching={fetching} error={error}>
      <ClassificationTable classifications={data?.classifications ?? []} />
    </Pending>
  );
};

export default ClassificationTableApi;