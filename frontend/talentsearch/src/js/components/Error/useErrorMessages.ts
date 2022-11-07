import { useIntl } from "react-intl";
import { useRouteError } from "react-router-dom";

interface ErrorResponse {
  status: number;
  statusText: string;
}

interface ErrorMessage {
  title: React.ReactNode;
  body: React.ReactNode;
}

const useErrorMessages = (): ErrorMessage => {
  const error = useRouteError() as ErrorResponse;
  const intl = useIntl();
  const messages: Record<number, ErrorMessage> = {
    401: {
      title: intl.formatMessage({
        description:
          "Heading for the message saying the page to view is not authorized.",
        defaultMessage: "Sorry, you are not authorized to view this page.",
        id: "jPLaDk",
      }),
      body: intl.formatMessage({
        description:
          "Detailed message saying the page to view is not authorized.",
        defaultMessage:
          "Oops, it looks like you've landed on a page that you are not authorized to view.",
        id: "gKyog2",
      }),
    },
    404: {
      title: intl.formatMessage({
        defaultMessage:
          "Sorry, eh! We can't find the page you were looking for.",
        id: "yExs/j",
        description: "Title for the 404 page not found page.",
      }),
      body: intl.formatMessage({
        defaultMessage:
          "It looks like you've landed on a page that either doesn't exist or has moved.",
        id: "Q6ws0E",
        description: "Body text for the 404 page not found page.",
      }),
    },
  };

  if ("status" in error) {
    if (error.status in messages) return messages[error.status];
  }

  return {
    title: intl.formatMessage({
      defaultMessage: "Sorry, eh! We encountered an error.",
      id: "JTXUit",
      description: "Title for the 404 page not found page.",
    }),
    body: intl.formatMessage({
      defaultMessage:
        "It looks like we encountered an unknown error while processing your request.",
      id: "HkUdtI",
      description: "Body text for the unknown error page page.",
    }),
  };
};

export default useErrorMessages;