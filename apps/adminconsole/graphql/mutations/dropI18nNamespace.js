const path = require('path');
const fs = require('fs');


module.exports = async function dropI18nNamespace (root, { namespace }, { req }) {
  const translationsRootDir = req.i18n.options.backend.translationsRootDir;
  const ns_path = path.join(translationsRootDir, namespace);
  if (!fs.existsSync(ns_path)) {
    return {
      dropped: false,
      namespace,
      error: "namespace not found."
    };
  }
  fs.rmdirSync(ns_path, {
    recursive: true
  });
  req.i18n.options.ns = req.i18n.options.ns.filter((o) => o !== namespace);
  await req.i18n.removeNamespace(namespace);
  return {
    dropped: true,
    namespace
  }
}
