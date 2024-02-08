import { FastifyReply, FastifyRequest } from "fastify";
import { eta } from "../app";
import requestHelper from "../helper/request.helper";
import { ViewEtaHelper } from "../helper/eta.helper";
const routeOpts = {
  method: "GET",
  handler: async function (req: FastifyRequest, res: FastifyReply) {
    try {

      // testing requestHelper
      const url = 'http://10.168.0.118:10059/vendor/url_checker/link/list.api'
      const urlGet = 'https://jsonplaceholder.typicode.com/posts'
      const apiLogin = 'http://localhost:8080/api/auth/login'
      const dataApi = {
        "UrlName": 'AMEBA_GS',
        "StampUser": "SYSTEM"
      }

      const dataLogin = {
        "email": "auda@gmail.com",
        "password": "foruser997"
      }

      const fetch = await requestHelper(urlGet, "GET")
      console.log(fetch);
      

      // ================================

      const users = [
        { nama: "auda" },
        { nama: "jupri" }
      ]

      const kelas = [
        { kelas: 2 },
        { kelas: 3 }
      ]


      let data = {
        users,
        kelas
      }

      let testing = ViewEtaHelper.compile("./home.html", data)
      res.code(200).type('text/html').send(testing)

    } catch (error: any) {
      res.code(401).send({ message: error.message })
    }
  },
};

export default routeOpts;
