const express = require("express");
require('express-group-routes');

const bling = require("./app/controllers/bling.controller");
const pipe = require("./app/controllers/pipedrive.controller");
const opportunity = require("./app/controllers/opportunity.controller");

const routes = express.Router();

routes.group("/pipe", (router) => {
    router.get("/deals", pipe.listDeals);
    router.get("/deals/summary", pipe.listDealsSumary);
});

routes.group("/bling", (router) => {
    router.get("/products", bling.getProducts);
    router.get("/requests", bling.getRequests);
    router.post("/requests", bling.saveRequest);
});


routes.group("/opportunity", (router) => {
    router.get("", opportunity.getAll);
    router.get("/detail/:idRequest", opportunity.getById);
    router.get("/summary", opportunity.getSummary);
});

module.exports = routes;