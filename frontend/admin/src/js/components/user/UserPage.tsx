import React from "react";
import { useIntl } from "react-intl";
import { UserIcon } from "@heroicons/react/24/outline";
import PageHeader from "@common/components/PageHeader";

import UserTable from "./UserTable";
import DashboardContentContainer from "../DashboardContentContainer";

export const UserPage: React.FC = () => {
  const intl = useIntl();
  return (
    <DashboardContentContainer>
      <PageHeader icon={UserIcon}>
        {intl.formatMessage({
          defaultMessage: "Users",
          id: "8c/kP1",
          description: "Title for users page on the admin portal.",
        })}
      </PageHeader>
      <p>
        {intl.formatMessage({
          defaultMessage:
            "The following is a list of active users along with some of their details.",
          id: "UvKDXK",
          description:
            "Descriptive text about the list of users in the admin portal.",
        })}
      </p>
      <UserTable />
    </DashboardContentContainer>
  );
};

export default UserPage;
