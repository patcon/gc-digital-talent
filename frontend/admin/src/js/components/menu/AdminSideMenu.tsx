import React from "react";
import { useIntl } from "react-intl";

import SideMenu, { SideMenuItem } from "@common/components/SideMenu";

import {
  AcademicCapIcon,
  HomeIcon,
  BuildingOfficeIcon,
  PaperClipIcon,
  TagIcon,
  TicketIcon,
  UserGroupIcon,
  UserIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { AuthorizationContext } from "@common/components/Auth";
import LoginOrLogout from "./LoginOrLogout";

import { useAdminRoutes } from "../../adminRoutes";
import { Role } from "../../api/generated";

export interface AdminSideMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onDismiss: () => void;
}

/**
 * Check to see if user contains one or more roles
 *
 * @param checkRoles    Roles to check for
 * @param userRoles     Users current roles
 * @returns boolean
 */
const checkRole = (
  checkRoles: Role[] | null,
  userRoles: (Role | null | undefined)[] | null | undefined,
): boolean => {
  if (!checkRoles) {
    return true;
  }
  const visible = checkRoles.reduce((prev, curr) => {
    if (userRoles?.includes(curr)) {
      return true;
    }

    return prev;
  }, false);

  return visible;
};

const AdminSideMenu: React.FC<AdminSideMenuProps> = ({
  isOpen,
  onToggle,
  onDismiss,
}) => {
  const intl = useIntl();
  const paths = useAdminRoutes();

  const { loggedInUserRoles } = React.useContext(AuthorizationContext);

  const menuItems = [
    {
      key: "dashboard",
      href: paths.dashboard(),
      icon: HomeIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Dashboard",
        id: "ZDmkKD",
        description: "Label displayed on the dashboard menu item.",
      }),
    },
    {
      key: "pools",
      href: paths.poolTable(),
      icon: Squares2X2Icon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Pools",
        id: "wCBE9S",
        description: "Label displayed on the Pools menu item.",
      }),
    },
    {
      key: "users",
      href: paths.userTable(),
      icon: UserIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Users",
        id: "154pGu",
        description: "Label displayed on the Users menu item.",
      }),
    },
    {
      key: "requests",
      href: paths.searchRequestTable(),
      icon: TicketIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Requests",
        id: "QftM3f",
        description: "Label displayed on the requests menu item.",
      }),
    },
    {
      key: "classifications",
      href: paths.classificationTable(),
      icon: TagIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Classifications",
        id: "gk7uJQ",
        description: "Label displayed on the classifications menu item.",
      }),
    },
    {
      key: "cmo-assets",
      href: paths.cmoAssetTable(),
      icon: PaperClipIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "CMO Assets",
        id: "MMP0XC",
        description: "Label displayed on the CMO Assets menu item.",
      }),
    },
    {
      key: "departments",
      href: paths.departmentTable(),
      icon: BuildingOfficeIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Departments",
        id: "HQOsq2",
        description: "Label displayed on the departments menu item.",
      }),
    },
    {
      key: "skill-families",
      href: paths.skillFamilyTable(),
      icon: UserGroupIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Skill Families",
        id: "4fOu5j",
        description: "Label displayed on the skill families menu item.",
      }),
    },
    {
      key: "skills",
      href: paths.skillTable(),
      icon: AcademicCapIcon,
      roles: [Role.Admin],
      text: intl.formatMessage({
        defaultMessage: "Skills",
        id: "UC+4MX",
        description: "Label displayed on the skills menu item.",
      }),
    },
  ];

  return (
    <SideMenu
      label={intl.formatMessage({
        defaultMessage: "Main Menu",
        id: "QjF2CL",
        description:
          "Label for the main menu on the pool manager admin portal.",
      })}
      onToggle={onToggle}
      isOpen={isOpen}
      onDismiss={onDismiss}
      footer={<LoginOrLogout />}
    >
      {menuItems.map((item) => (
        <React.Fragment key={item.key}>
          {checkRole(item.roles, loggedInUserRoles) ? (
            <SideMenuItem href={item.href} icon={item.icon} end>
              {item.text}
            </SideMenuItem>
          ) : null}
        </React.Fragment>
      ))}
    </SideMenu>
  );
};

export default AdminSideMenu;
