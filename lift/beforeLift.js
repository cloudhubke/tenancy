const adapter = "@cloudhub-js/sails-arangojs";
const dbHost = process.env.DB_HOST || "localhost:8529";
const dbUser = process.env.DB_USER || "root";
const dbPasswd = process.env.DB_PASSWD || "";

const onMerchantDbConnect = require("../api/services/onMerchantDbConnect");

module.exports = async () => {
  try {
    const { Database, aql } = require("arangojs");
    const db = new Database({
      url: `tcp://${dbHost}`,
    });
    db.useDatabase("schoolinf-admin");
    db.useBasicAuth(dbUser, dbPasswd);

    const result = await db.executeTransaction(
      {
        // read: ['party'],
      },
      String(function (params) {
        // This code will be executed inside ArangoDB!
        const db = require("@arangodb").db;

        const merchants = db.merchant
          .byExample({ Status: "APPROVED" })
          .toArray();

        return merchants.map((merchant) => ({
          MerchantCode: merchant.MerchantCode,
        }));
      }),
      {}
    );
    let adapters = {};
    for (let merchant of result) {
      adapters[`schoolinf-${merchant.MerchantCode}`.toLowerCase()] = {
        adapter,
        url: `arangodb://${dbUser}:${dbPasswd}@${dbHost}/schoolinf-${`${merchant.MerchantCode}`.toLowerCase()}`,
        graph: true,
        // dbServices: require('../api/dbServices'),
        tenantType: "secschool",
        // sanitize: true,
        onDbConnect: onMerchantDbConnect,
      };
    }
    global.databaseAdapters = adapters;
    return adapters;
  } catch (error) {
    global.databaseAdapters = {};
    return {};
  }
};
