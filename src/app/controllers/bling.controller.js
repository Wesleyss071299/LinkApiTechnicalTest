const axios = require('axios');
const url = process.env.URL_BLING;
const apikey =  process.env.KEY_BLING;
const utils = require("../utils/jsonToXml");

module.exports = {
    async getProducts(req, res, next){
        try {
            const response = await axios.get(`${url}/produtos/json/`, { params : { apikey} });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    },
    async getRequests(req, res, next){
        try {
            const response = await axios.get(`${url}/pedidos/json/`, { params : { apikey} });
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg: error});
          }
    },
    async saveRequest(req, res, next){
        try {
            const errors  = [];
            const { seller, clientName, clientEmail, idProduct, description, quantity, value} = req.body;

            if(!seller) errors.push("Seller field is required");
            if(!clientName) errors.push("clientName field is required");
            if(!clientEmail) errors.push("clientEmail field is required");
            if(!idProduct) errors.push("idProduct field is required");
            if(!description) errors.push("description field is required");
            if(!quantity) errors.push("quantity field is required");
            if(!value) errors.push("value field is required");

            if(errors.length > 0) return res.status(400).json(errors);

            const xml  = utils.jsonToXmlPedido(seller, clientName, clientEmail, idProduct, description, quantity, value);
            
            const response = await axios.post(`${url}/pedido/json/?apikey=${apikey}&xml=${xml}`);
            res.json(response.data)
          } catch (error) {
            res.status(500).json({error: true, msg:error});
          }
    }
}