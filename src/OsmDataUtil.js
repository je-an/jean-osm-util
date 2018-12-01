define([
    "List",
    "OsmDataSet",
    "Building",
    "Landuse",
    "LanduseType"
], function (
    List,
    OsmDataSet,
    Building,
    Landuse,
    LanduseType
) {
        return {
            /**
             * 
             * @param {Object[]} dataSetArray - the untyped dataset objects
             */
            createDataSets: function (dataSetArray) {
                var dataSets = new List({ idProperty: "id" }), i,
                    length = dataSetArray.length, o;
                for (i = 0; i < length; i++) {
                    o = dataSetArray[i].dataSet;
                    dataSets.addElement(new OsmDataSet({
                        id: dataSetArray[i].id,
                        buildings: this.createBuildings(o.buildings),
                        landuses: this.createLanduses(o.landuses)
                    }));
                }
                return dataSets;
            },
            /** */
            createBuildings: function (buildingsObjs) {
                var i = 0, length = buildingsObjs.length, o, j,
                    buildings = new List({ idProperty: "id" }), coordinates = [];
                for (i = 0; i < length; i++) {
                    o = buildingsObjs[i];
                    coordinates = [];
                    for (j = 0; j < o.coordinates.length; j++) {
                        coordinates.push(parseFloat(o.coordinates[j].longitude), parseFloat(o.coordinates[j].latitude));
                    }
                    buildings.addElement(new Building({
                        id: o.id.toString(),
                        name: o.name,
                        coordinates: coordinates,
                        levels: o.levels
                    }));
                }
                return buildings;
            },
            /** */
            createLanduses: function (landuseObjs) {
                var i = 0, length = landuseObjs.length, o, j,
                    landUses = new List({ idProperty: "id" }), coordinates = [];
                for (i = 0; i < length; i++) {
                    o = landuseObjs[i];
                    coordinates = [];
                    if (o.type === LanduseType.MILITARY) {
                        for (j = 0; j < o.coordinates.length; j++) {
                            coordinates.push(parseFloat(o.coordinates[j].longitude), parseFloat(o.coordinates[j].latitude));
                        }
                        landUses.addElement(new Landuse({
                            id: o.id.toString(),
                            name: o.name,
                            coordinates: coordinates,
                            type: o.type
                        }));
                    }
                }
                return landUses;
            }
        };
    });