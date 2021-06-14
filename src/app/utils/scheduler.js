const axios = require('axios');
const utils = require("./jsonToXml");
const Schema = require("../models/schema");

const urlBling = process.env.URL_BLING;
const apikey = process.env.KEY_BLING;

const urlPipedrive = process.env.URL_PIPEDRIVE;
const api_token = process.env.KEY_PIPEDRIVE;

async function saveOrderBlind(data) {
    try {
        console.log("Saving order on bling")
        const { value, title, products_count } = data;
        const { cc_email, name, owner_id } = data.org_id;

        const xml = utils.jsonToXmlPedido(data.person_id.name, name, cc_email, owner_id, title, products_count, value);
        const response = await axios.post(`${urlBling}/pedido/json/?apikey=${apikey}&xml=${xml}`);

        if (!response.data.retorno.erros) {
            console.log("Order saved in Bling")
            saveOrderDB(data)
        } else {
            console.log("Order already exists on Bling")
        }
    } catch (error) {
        console.log("Error saving order in Bling:", error)
    }
}

async function saveOrderDB(data) {
    console.log("Saving order in MongoDB")
    const { id, value, title, products_count } = data;
    const { cc_email, name, owner_id } = data.org_id;

    const request = {
        idRequest: id,
        seller: data.person_id.name,
        clientName: name,
        clientEmail: cc_email,
        description: title,
        idProduct: owner_id,
        quantity: products_count,
        value: value,
    };

    try {
        const isExists =  await  Schema.findOne({idRequest: request.idRequest});
        if(isExists){
            console.log("Order already exists in MongoDB");
            return;
        }
        const rs = await Schema.create(request);
        console.log("Order successfully saved in MongoDB")
    } catch {
        console.log("Error saving order in MongoDB")
    }
}

module.exports = {

    async searchOrdersPipedrive() {
        try {
            console.log("PIPEDRIVE data synchronization")
            console.log("Searching for business on pipedrive")
            const response = await axios.get(`${urlPipedrive}/deals`, { params: { api_token, status: "won", start: 0 } });
            const data = response.data;
            console.log("Browsing the businesses found")
            for (let item of data.data) {
                saveOrderBlind(item);
            }
        } catch (error) {
            console.log("Error in searching pipedrive business", error)
        }
    },

}