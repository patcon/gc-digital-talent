import * as React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

import Breadcrumbs from "@common/components/Breadcrumbs";
import type { BreadcrumbsProps } from "@common/components/Breadcrumbs";
import PageHeader from "@common/components/PageHeader";
import { Link } from "@common/components";
import Tabs from "@common/components/Tabs";
import { commonMessages } from "@common/messages";
import Pending from "@common/components/Pending";
import NotFound from "@common/components/NotFound";
import { getFullPoolAdvertisementTitle } from "@common/helpers/poolUtils";

import { useAdminRoutes } from "../../../adminRoutes";
import { Scalars, useGetPoolQuery } from "../../../api/generated";
import type { Pool } from "../../../api/generated";

interface ViewPoolPageProps {
  pool: Pool;
}

export const ViewPoolPage: React.FC<ViewPoolPageProps> = ({ pool }) => {
  const intl = useIntl();
  const adminPaths = useAdminRoutes();

  const pageTitle = intl.formatMessage({
    defaultMessage: "Pool Details",
    id: "yBmBnd",
    description: "Title for the page when viewing an individual pool.",
  });

  const poolName = getFullPoolAdvertisementTitle(intl, pool, {
    defaultTitle: pageTitle,
  });

  const links = [
    {
      title: intl.formatMessage({
        defaultMessage: "Home",
        id: "DUK/pz",
        description: "Breadcrumb title for the home page link.",
      }),
      href: adminPaths.home(),
    },
    {
      title: intl.formatMessage({
        defaultMessage: "Pools",
        id: "3fAkvM",
        description: "Breadcrumb title for the pools page link.",
      }),
      href: adminPaths.poolTable(),
    },
    {
      title: poolName,
    },
  ] as BreadcrumbsProps["links"];

  const tabs = [
    intl.formatMessage({
      defaultMessage: "Pool details",
      id: "gZwKs8",
      description: "Tabs title for the individual pool details.",
    }),
    intl.formatMessage({
      defaultMessage: "Pool candidates",
      id: "GhGkBV",
      description: "Tabs title for the individual pool candidates.",
    }),
  ];

  return (
    <div data-h2-container="base(center, full, x1) p-tablet(center, full, x2)">
      <PageHeader icon={Squares2X2Icon}>{pageTitle}</PageHeader>
      <Breadcrumbs links={links} />
      <div
        data-h2-align-items="base(center)"
        data-h2-display="base(flex)"
        data-h2-flex-direction="base(column) l-tablet(row)"
        data-h2-margin="base(x2, 0)"
      >
        <h2
          data-h2-margin="base(x.5, 0) p-tablet(0)"
          data-h2-font-weight="base(700)"
        >
          {getFullPoolAdvertisementTitle(intl, pool)}
        </h2>
        <div data-h2-margin="l-tablet(0, 0, 0, auto)">
          <Link
            mode="outline"
            color="primary"
            type="button"
            href={adminPaths.poolEdit(pool.id)}
          >
            {intl.formatMessage({
              defaultMessage: "Edit pool",
              id: "SH/wd3",
              description: "Link text for button to edit a specific pool",
            })}
          </Link>
        </div>
      </div>
      <Tabs.Root defaultValue="0">
        <Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Trigger key={tab} value={`${index}`}>
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Content key={tab} value={`${index}`}>
            {tab}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

type RouteParams = {
  poolId: Scalars["ID"];
};

const ViewPool = () => {
  const intl = useIntl();
  const { poolId } = useParams<RouteParams>();
  const [{ data, fetching, error }] = useGetPoolQuery({
    variables: { id: poolId || "" },
  });

  return (
    <Pending fetching={fetching} error={error}>
      {data?.pool ? (
        <ViewPoolPage pool={data.pool} />
      ) : (
        <NotFound headingMessage={intl.formatMessage(commonMessages.notFound)}>
          <p>
            {intl.formatMessage(
              {
                defaultMessage: "Pool {poolId} not found.",
                id: "Sb2fEr",
                description: "Message displayed for pool not found.",
              },
              { poolId },
            )}
          </p>
        </NotFound>
      )}
    </Pending>
  );
};

export default ViewPool;
