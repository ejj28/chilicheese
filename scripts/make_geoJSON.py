# make_geoJSON.py - Generates a JSON file in geoJSON format from our dataset of Taco Bell locations
# Usage: python make_geoJSON.py infile.json outfile.json

import sys
import json

infilePath = sys.argv[1]
outfilePath = sys.argv[2]

outputJSON = {
    "type": "FeatureCollection",
    "features": []
}

infile = open(infilePath, 'r')
try:
    infileJSON = json.load(infile)
    for store in infileJSON:
        outputJSON["features"].append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [infileJSON[store]["longitude"],infileJSON[store]["latitude"]]
            },
            "properties": {
                "store": store,
                "address": infileJSON[store]["address"]
            }
        })
    
    with open(outfilePath, 'w') as outfile:
        json.dump(outputJSON, outfile)
finally:
    infile.close()
