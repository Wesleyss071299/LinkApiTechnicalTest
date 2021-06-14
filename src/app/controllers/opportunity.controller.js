const Schema = require("../models/schema");

module.exports = {
    async getAll(req, res, next) {
        const rs = await Schema.find();
        res.json({ data: rs });
    },
    async getById(req, res, next) {
        const { idRequest } = req.params;
        if (!idRequest) res.status(400).send("parametro idPedido é obrigatorio")
        const rs = await Schema.findOne({ idRequest });
        if (!rs) return res.status(404).json({ msg: "Not found" });
        res.json(rs);
    },
    async getSummary(req, res, next) {
        const result =  await Schema.aggregate(
            [
                
                {
                    $group: {
                        _id: { $dateToString: { format: "%d-%m-%Y", date: "$created_at" } },
                        quantity: { $sum: 1 },
                        total: { $sum: { $multiply: ["$value", "$quantity"] } },
                    }
                }
            ]).exec();
            res.send(result)
    }
}