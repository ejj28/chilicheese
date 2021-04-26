# Takes a csv of coordinates and uses the Mapbox Geocoding API to get the addresses
# Usage: python coords2address.py input.csv output.csv

import sys

inputPath = sys.argv[1]
outputPath = sys.argv[2]
