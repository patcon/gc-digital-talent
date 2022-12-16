import {
  ArmedForcesStatus,
  CitizenshipStatus,
  ProvinceOrTerritory,
  WorkRegion,
} from "../../talentsearch/src/js/api/generated";
import { FAR_PAST_DATE } from "../../common/src/helpers/dateUtils";
import {
  JobLookingStatus,
  OperationalRequirement,
  PositionDuration,
  Role,
} from "../../common/src/api/generated";

export function createApplicant({
  email,
  sub,
  skill,
  genericJobTitle,
  userAlias,
}) {
  cy.createUser({
    email: email ?? `cypress.user.${Date.now().valueOf()}@example.org`,
    sub: sub ?? `cypress.sub.${Date.now().valueOf()}`,
    roles: [Role.Applicant],
    currentProvince: ProvinceOrTerritory.Ontario,
    currentCity: "Test City",
    telephone: "+10123456789",
    armedForcesStatus: ArmedForcesStatus.NonCaf,
    citizenship: CitizenshipStatus.Citizen,
    lookingForEnglish: true,
    isGovEmployee: false,
    isWoman: true,
    hasPriorityEntitlement: false,
    jobLookingStatus: JobLookingStatus.ActivelyLooking,
    hasDiploma: true,
    locationPreferences: WorkRegion.Ontario,
    acceptedOperationalRequirements: [
      OperationalRequirement.OvertimeOccasional,
    ],
    positionDuration: [PositionDuration.Permanent],
    expectedGenericJobTitles: {
      sync: [genericJobTitle.id],
    },
    personalExperiences: {
      create: [
        {
          description: "Test Experience Description",
          details: "A Cypress test personal experience",
          skills: {
            sync: [
              {
                details: `Test Skill ${skill.name.en}`,
                id: skill.id,
              },
            ],
          },
          startDate: FAR_PAST_DATE,
          title: "Test Experience",
        },
      ],
    },
  }).as(userAlias);
}