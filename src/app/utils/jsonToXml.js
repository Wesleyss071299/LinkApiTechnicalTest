module.exports = {
    jsonToXmlPedido(seller, clientName, clientEmail, idProduct, description, quantity, value) {
        return `<?xml version="1.0" encoding="ISO-8859-1"?>
                    <request>
                    <seller>${seller}</seller>
                    <client>
                        <nome>${clientName}</nome>
                        <email>${clientEmail}</email>
                    </client>
                    <transporte>
                        <volume>
                        <servico>DIgital</servico>
                        </volume>
                    </transporte>
                    <itens>
                        <item>
                            <codigo>${idProduct}</codigo>  
                            <description>${description}</description>
                            <qtde>${quantity}</qtde>
                            <vlr_unit>${value}</vlr_unit>
                        </item>
                    </itens>
                    </request>
                    `;
    }
}