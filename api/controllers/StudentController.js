/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  savestudent: async (req, res) => {
    try {
      const params = req.body || {};
      const { merchantcode, ...headers } = req.headers || {};

      console.log(params);

      const student = await _Student(merchantcode).create(params).fetch();

      return res.ok(student);
    } catch (error) {
      console.log(error.toString());
      return res.serverError(error);
    }
  },
};
