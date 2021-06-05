

module.exports = function i18nNamespaces (root, args, {
  req
}) {
  return req.i18n.options.ns
}
