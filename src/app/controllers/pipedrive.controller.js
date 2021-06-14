const axios = require('axios');
const url = process.env.URL_PIPEDRIVE;
const api_token =  process.env.KEY_PIPEDRIVE;

module.exports = {
    async listDeals(req, res, next){
        try {
            const response = await axios.get(`${url}/deals`, { params : { api_token, status: "won", start: 0 } });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    },
    async listDealsSumary(req, res, next){
        try {
            const response = await axios.get(`${url}/deals/summary`, { params : { api_token, status: "won"} });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    }
}