module.exports = {
  tenantType: ["admin"],
  attributes: {
    MerchantName: {
      type: "string",
      defaultsTo: "",
    },
    MerchantCode: {
      type: "string",
      required: true,
      unique: true,
    },
    Status: {
      type: "string",
      defaultsTo: "NOT_APPROVED",
      isIn: ["NOT_APPROVED", "APPROVED", "REJECTED"],
    },
    Timestamp: {
      type: "number",
      defaultsTo: 0,
      rules: {
        minimum: 0,
      },
    },
  },
};
