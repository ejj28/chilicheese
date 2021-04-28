# make_geoJSON.py - Generates a JSON file in geoJSON format from our dataset of Taco Bell locations
# Usage: python make_geoJSON.py infile.json outfile.json

import sys
import json

infilePath = sys.argv[1]
outfilePath = sys.argv[2]