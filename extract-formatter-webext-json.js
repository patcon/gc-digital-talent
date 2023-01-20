// This formatter processes ICU format into WebExtension JSON during FormatJS CLI's extract command.
// See: https://formatjs.io/docs/getting-started/message-extraction#translation-management-system-tms-integration

// The output format matches WebExtension JSON format, which the Weblate TMS supports descriptions for.
// See: https://docs.weblate.org/en/latest/formats.html#webextension-json
exports.format = function (msgs) {
  const results = {}
  for (const [id, msg] of Object.entries(msgs)) {
    results[id] = {
      message: msg.defaultMessage,
      description: msg.description,
    }
  }
  return results
}
