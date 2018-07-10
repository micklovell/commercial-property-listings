(function () {
    var myConnector = tableau.makeConnector();

	// call table schema from Domain Group API for commercial listings
    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "url",
        alias: "url",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "latitude",
        alias: "latitude",
        dataType: tableau.dataTypeEnum.geometry
    }, {
		id: "longitude",
        alias: "longitude",
        dataType: tableau.dataTypeEnum.geometry
	 }, {	
        id: "propertyArea",
		alias: "propertySize",
        dataType: tableau.dataTypeEnum.string
	 }, {	
        id: "propertyType",
		alias: "propertyType",
        dataType: tableau.dataTypeEnum.string
	}, {	
        id: "address",
		alias: "address",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "listingsFeed",
        alias: "Commercial Property Listings",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://api.domain.com.au/v1/listings/commercial/_search", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "url": feat[i].properties.url,
                "latitude": feat[i].properties.latitude,
				"longitude": feat[i].properties.longitude,
				"propertyArea": feat[i].properties.propertyArea,
				"propertyType": feat[i].properties.propertyType,
                "address": feat[i].address
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
})();
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Domain Group Commercial Listing Feed";
        tableau.submit();
    });
});