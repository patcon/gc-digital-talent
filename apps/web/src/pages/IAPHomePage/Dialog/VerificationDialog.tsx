import React from "react";
import { useIntl } from "react-intl";

import Button from "@common/components/Button";
import Dialog from "@common/components/Dialog";

import CloseButton from "./CloseButton";

import type { BasicDialogProps } from "./types";

const VerificationDialog = ({ children, btnProps }: BasicDialogProps) => {
  const intl = useIntl();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="ia-primary" mode="inline" {...btnProps}>
          {children}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header color="ia-primary">
          {intl.formatMessage({
            defaultMessage: "How will this be verified?",
            id: "h4E9+K",
            description: "Heading for the self-declaration verification dialog",
          })}
        </Dialog.Header>
        <p data-h2-margin="base(x1, 0)">
          {intl.formatMessage({
            defaultMessage:
              "At a later step of the application process, you may be asked to provide proof that you are Indigenous. Some of the ways to do this were included in the definition statement at the beginning of this application, including a Certificate of Indian Status card, an Inuit beneficiary card, a Métis citizenship card, a letter from an authorized representative of a recognized Indigenous community, in addition to an attestation form. For the purpose of inclusion, these measures are to ensure that this program remains available to Indigenous Peoples in Canada.",
            id: "luj0xr",
            description: "Content for the self-declaration verification dialog",
          })}
        </p>
        <Dialog.Footer>
          <CloseButton />
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default VerificationDialog;