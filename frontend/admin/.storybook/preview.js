import "../resources/css/hydrogen.css"
import "../resources/css/app.css"
import "../resources/js/components/IntlContainer";
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const messages = {en: null, fr: null};
setIntlConfig({
    locales: ["en", "fr"],
    defaultLocale: "en",
    getMessages: (locale) => messages[locale],
})

export const decorators = [
    withIntl,
    (Story) => (
      <div data-h2-font-family="b(sans)">
        <Story />
      </div>
    ),
  ];