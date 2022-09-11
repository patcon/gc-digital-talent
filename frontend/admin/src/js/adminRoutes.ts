import { getLocale } from "@common/helpers/localize";
import path from "path-browserify";
import { useIntl } from "react-intl";
import { ADMIN_APP_DIR } from "./adminConstants";

export type AdminRoutes = ReturnType<typeof adminRoutes>;

const adminRoutes = (lang: string) => {
  const home = (): string => path.join("/", lang, ADMIN_APP_DIR); // leading slash in case empty base url
  return {
    home,

    dashboard: () => `${home()}/dashboard`,

    cmoAssetTable: () => `${home()}/cmo-assets`,
    cmoAssetCreate: () => `${home()}/cmo-assets/create`,
    cmoAssetUpdate: (id = ":id") => `${home()}/cmo-assets/${id}/edit`,

    poolTable: () => `${home()}/pools`,
    poolCreate: () => `${home()}/pools/create`,
    poolEdit: (id = ":id") => `${home()}/pools/${id}/edit`,
    poolView: (id = ":id") => `${home()}/pools/${id}`,

    poolCandidateTable: (id = ":id") => `${home()}/pools/${id}/pool-candidates`,
    candidateProfile: () => `${home()}/candidate-profile`,

    userTable: () => `${home()}/users`,
    userCreate: () => `${home()}/users/create`,
    userUpdate: (id = ":id") => `${home()}/users/${id}/edit`,
    userView: (id = ":id") => `${home()}/users/${id}`,

    searchRequestTable: () => `${home()}/talent-requests`,
    searchRequestView: (id = ":id") => `${home()}/talent-requests/${id}`,

    classificationTable: () => `${home()}/settings/classifications`,
    classificationCreate: () => `${home()}/settings/classifications/create`,
    classificationUpdate: (id = ":id") =>
      `${home()}/settings/classifications/${id}/edit`,

    skillTable: () => `${home()}/settings/skills`,
    skillCreate: () => path.join(home(), "settings", "skills", "create"),
    skillUpdate: (id = ":id") => `${home()}/settings/skills/${id}/edit`,
    skillFamilyTable: () => `${home()}/settings/skills/families`,
    skillFamilyCreate: () => `${home()}/settings/skills/families/create"`,
    skillFamilyUpdate: (id = ":id") =>
      `${home()}/settings/skills/families/${id}/edit`,

    departmentTable: () => `${home()}/settings/departments`,
    departmentCreate: () => `${home()}/settings/departments/create`,
    departmentUpdate: (id = ":id") =>
      `${home()}/settings/departments/${id}/edit`,
  };
};

export default adminRoutes;

/**
 * A hook version of adminRoutes which gets the locale from the intl context.
 * @returns AdminRoutes
 */
export const useAdminRoutes = (): AdminRoutes => {
  const intl = useIntl();
  const locale = getLocale(intl);
  return adminRoutes(locale);
};
