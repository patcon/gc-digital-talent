// This formatter processes WebExtension JSON into ICU format during FormatJS CLI's compile command.
// See: https://formatjs.io/docs/getting-started/message-distribution#translation-management-system-tms-integration

// The input format matches WebExtension JSON format, which the Weblate TMS supports descriptions for.
// See: https://docs.weblate.org/en/latest/formats.html#webextension-json
exports.compile = function (msgs) {
  const results = {}
  for (const [id, msg] of Object.entries(msgs)) {
    results[id] = msg.message
  }
  return results
}
