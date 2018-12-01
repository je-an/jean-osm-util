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
                    buildings = new List({ idProperty: "id" });
                for (i = 0; i < length; i++) {
                    o = buildingsObjs[i];
                    buildings.addElement(new Building({
                        id: o.id.toString(),
                        name: o.name,
                        coordinates: o.coordinates,
                        levels: o.levels
                    }));
                }
                return buildings;
            },
            /** */
            createLanduses: function (landuseObjs) {
                var i = 0, length = landuseObjs.length, o, j,
                    landUses = new List({ idProperty: "id" });
                for (i = 0; i < length; i++) {
                    o = landuseObjs[i];
                    if (o.type === LanduseType.MILITARY) {
                        landUses.addElement(new Landuse({
                            id: o.id.toString(),
                            name: o.name,
                            coordinates: o.coordinates,
                            type: o.type
                        }));
                    }
                }
                return landUses;
            }
        };
    });