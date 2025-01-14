import React from "react";
import { useIntl } from "react-intl";

import { Link } from "@common/components";

export interface TableViewItemButtonProps {
  /** The destination url. */
  viewUrl: string;
  /** Name of the type of object */
  name: string;
  /** Label for link text  */
  hiddenLabel?: string;
}

function TableViewItemButton({
  viewUrl,
  name,
  hiddenLabel,
}: TableViewItemButtonProps): React.ReactElement {
  const intl = useIntl();
  return (
    <Link href={viewUrl} type="button" mode="inline" data-h2-padding="base(0)">
      {intl.formatMessage(
        {
          defaultMessage: "View {name} <hidden>{hiddenLabel}</hidden>",
          id: "+wG2Ap",
          description: "Title displayed for the View Item column.",
        },
        { name, hiddenLabel },
      )}
    </Link>
  );
}

export default TableViewItemButton;

export function tableViewItemButtonAccessor(
  viewUrl: string,
  name: string,
  hiddenLabel?: string,
) {
  return (
    <TableViewItemButton
      viewUrl={viewUrl}
      name={name}
      hiddenLabel={hiddenLabel}
    />
  );
}
