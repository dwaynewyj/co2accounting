import pdfkit
import jinja2
import sys
from pymongo import MongoClient
import os
from datetime import datetime
from bson import ObjectId

# Arguments passed from API
db_url = sys.argv[1]
client_loc_id = sys.argv[2]
ledger_year = sys.argv[3]
PATH_WKHTMLTOPDF = r'/usr/local/bin/wkhtmltopdf'

# Constants
dec_places = 2
date = datetime.today().strftime("%m/%d/%y")

# MongoDB Setup
client = MongoClient(db_url)
db_app = client['sc_app']
db_ledger = client['sc_app_ledgers']

collection_name = client_loc_id + "_" + ledger_year

#in MongoDB find the client_loc_name from the client_loc_data.client_loc_name parameter in the client_locs collection
record = db_app['client_locs'].find_one({'client_loc_id': client_loc_id})
if (record is None):
	record = db_app['client_locs'].find_one({'_id': ObjectId(client_loc_id)})
client_loc_name = record['client_loc_data']['client_loc_name']


#===========================================================================
# Setup Scope Data
#SCOPE 1
#===========================================================================
stationary_combustion_co2e_kg = 0
stationary_combustion_co2e_kg_percent = 0
mobile_combustion_co2e_kg = 0
mobile_combustion_co2e_kg_percent = 0
refrigerants_co2e_kg = 0
refrigerants_co2e_kg_percent = 0
scope1_co2e_kg = 0
scope1_co2e_kg_percent = 0

stationary_combustion_n2o_kg = 0
stationary_combustion_n2o_kg_percent = 0
mobile_combustion_n2o_kg = 0
mobile_combustion_n2o_kg_percent = 0
refrigerants_n2o_kg = 0
refrigerants_n2o_kg_percent = 0
scope1_n2o_kg = 0
scope1_n2o_kg_percent = 0

stationary_combustion_ch4_kg = 0
stationary_combustion_ch4_kg_percent = 0
mobile_combustion_ch4_kg = 0
mobile_combustion_ch4_kg_percent = 0
refrigerants_ch4_kg = 0
refrigerants_ch4_kg_percent = 0
scope1_ch4_kg = 0
scope1_ch4_kg_percent = 0

stationary_combustion_co2_kg = 0
stationary_combustion_co2_kg_percent = 0
mobile_combustion_co2_kg = 0
mobile_combustion_co2_kg_percent = 0
refrigerants_co2_kg = 0
refrigerants_co2_kg_percent = 0
scope1_co2_kg = 0
scope1_co2_kg_percent = 0

#===========================================================================
#SCOPE2
#===========================================================================
purchased_electrcity_co2e_kg = 0
purchased_electrcity_co2e_kg_percent = 0
purchased_heat_co2e_kg = 0
purchased_heat_co2e_kg_percent = 0
purchased_cooling_co2e_kg = 0
purchased_cooling_co2e_kg_percent = 0
scope2_co2e_kg = 0
scope2_co2e_kg_percent = 0

purchased_electrcity_n2o_kg = 0
purchased_electrcity_n2o_kg_percent = 0
purchased_heat_n2o_kg = 0
purchased_heat_n2o_kg_percent = 0
purchased_cooling_n2o_kg = 0
purchased_cooling_n2o_kg_percent = 0
scope2_n2o_kg = 0
scope2_n2o_kg_percent = 0

purchased_electrcity_ch4_kg = 0
purchased_electrcity_ch4_kg_percent = 0
purchased_heat_ch4_kg = 0
purchased_heat_ch4_kg_percent = 0
purchased_cooling_ch4_kg = 0
purchased_cooling_ch4_kg_percent = 0
scope2_ch4_kg = 0
scope2_ch4_kg_percent = 0

purchased_electrcity_co2_kg = 0
purchased_electrcity_co2_kg_percent = 0
purchased_heat_co2_kg = 0
purchased_heat_co2_kg_percent = 0
purchased_cooling_co2_kg = 0
purchased_cooling_co2_kg_percent = 0
scope2_co2_kg = 0
scope2_co2_kg_percent = 0

#===========================================================================
#SCOPE 3
#===========================================================================
purchased_goods_services_co2e_kg = 0
purchased_goods_services_co2e_kg_percent = 0
capital_goods_co2e_kg = 0
capital_goods_co2e_kg_percent = 0
fuel_and_energy_activities_co2e_kg = 0
fuel_and_energy_activities_co2e_kg_percent = 0
upstream_t_and_d_co2e_kg = 0
upstream_t_and_d_co2e_kg_percent = 0
waste_generated_co2e_kg = 0
waste_generated_co2e_kg_percent = 0
business_travel_co2e_kg = 0
business_travel_co2e_kg_percent = 0
employee_commuting_co2e_kg = 0
employee_commuting_co2e_kg_percent = 0
upstream_leased_assets_co2e_kg = 0
upstream_leased_assets_co2e_kg_percent = 0
downstream_t_and_d_co2e_kg = 0
downstream_t_and_d_co2e_kg_percent = 0
processing_of_sold_products_co2e_kg = 0
processing_of_sold_products_co2e_kg_percent = 0
use_of_sold_products_co2e_kg = 0
use_of_sold_products_co2e_kg_percent = 0
eol_treatment_of_sold_products_co2e_kg = 0
eol_treatment_of_sold_products_co2e_kg_percent = 0
downstream_leased_assets_co2e_kg = 0
downstream_leased_assets_co2e_kg_percent = 0
franchises_co2e_kg = 0
franchises_co2e_kg_percent = 0
investments_co2e_kg = 0
investments_co2e_kg_percent = 0
scope3_co2e_kg = 0
scope3_co2e_kg_percent = 0


purchased_goods_services_n2o_kg = 0
purchased_goods_services_n2o_kg_percent = 0
capital_goods_n2o_kg = 0
capital_goods_n2o_kg_percent = 0
fuel_and_energy_activities_n2o_kg = 0
fuel_and_energy_activities_n2o_kg_percent = 0
upstream_t_and_d_n2o_kg = 0
upstream_t_and_d_n2o_kg_percent = 0
waste_generated_n2o_kg = 0
waste_generated_n2o_kg_percent = 0
business_travel_n2o_kg = 0
business_travel_n2o_kg_percent = 0
employee_commuting_n2o_kg = 0
employee_commuting_n2o_kg_percent = 0
upstream_leased_assets_n2o_kg = 0
upstream_leased_assets_n2o_kg_percent = 0
downstream_t_and_d_n2o_kg = 0
downstream_t_and_d_n2o_kg_percent = 0
processing_of_sold_products_n2o_kg = 0
processing_of_sold_products_n2o_kg_percent = 0
use_of_sold_products_n2o_kg = 0
use_of_sold_products_n2o_kg_percent = 0
eol_treatment_of_sold_products_n2o_kg = 0
eol_treatment_of_sold_products_n2o_kg_percent = 0
downstream_leased_assets_n2o_kg = 0
downstream_leased_assets_n2o_kg_percent = 0
franchises_n2o_kg = 0
franchises_n2o_kg_percent = 0
investments_n2o_kg = 0
investments_n2o_kg_percent = 0
scope3_n2o_kg = 0
scope3_n2o_kg_percent = 0


purchased_goods_services_ch4_kg = 0
purchased_goods_services_ch4_kg_percent = 0
capital_goods_ch4_kg = 0
capital_goods_ch4_kg_percent = 0
fuel_and_energy_activities_ch4_kg = 0
fuel_and_energy_activities_ch4_kg_percent = 0
upstream_t_and_d_ch4_kg = 0
upstream_t_and_d_ch4_kg_percent = 0
waste_generated_ch4_kg = 0
waste_generated_ch4_kg_percent = 0
business_travel_ch4_kg = 0
business_travel_ch4_kg_percent = 0
employee_commuting_ch4_kg = 0
employee_commuting_ch4_kg_percent = 0
upstream_leased_assets_ch4_kg = 0
upstream_leased_assets_ch4_kg_percent = 0
downstream_t_and_d_ch4_kg = 0
downstream_t_and_d_ch4_kg_percent = 0
processing_of_sold_products_ch4_kg = 0
processing_of_sold_products_ch4_kg_percent = 0
use_of_sold_products_ch4_kg = 0
use_of_sold_products_ch4_kg_percent = 0
eol_treatment_of_sold_products_ch4_kg = 0
eol_treatment_of_sold_products_ch4_kg_percent = 0
downstream_leased_assets_ch4_kg = 0
downstream_leased_assets_ch4_kg_percent = 0
franchises_ch4_kg = 0
franchises_ch4_kg_percent = 0
investments_ch4_kg = 0
investments_ch4_kg_percent = 0
scope3_ch4_kg = 0
scope3_ch4_kg_percent = 0


purchased_goods_services_co2_kg = 0
purchased_goods_services_co2_kg_percent = 0
capital_goods_co2_kg = 0
capital_goods_co2_kg_percent = 0
fuel_and_energy_activities_co2_kg = 0
fuel_and_energy_activities_co2_kg_percent = 0
upstream_t_and_d_co2_kg = 0
upstream_t_and_d_co2_kg_percent = 0
waste_generated_co2_kg = 0
waste_generated_co2_kg_percent = 0
business_travel_co2_kg = 0
business_travel_co2_kg_percent = 0
employee_commuting_co2_kg = 0
employee_commuting_co2_kg_percent = 0
upstream_leased_assets_co2_kg = 0
upstream_leased_assets_co2_kg_percent = 0
downstream_t_and_d_co2_kg = 0
downstream_t_and_d_co2_kg_percent = 0
processing_of_sold_products_co2_kg = 0
processing_of_sold_products_co2_kg_percent = 0
use_of_sold_products_co2_kg = 0
use_of_sold_products_co2_kg_percent = 0
eol_treatment_of_sold_products_co2_kg = 0
eol_treatment_of_sold_products_co2_kg_percent = 0
downstream_leased_assets_co2_kg = 0
downstream_leased_assets_co2_kg_percent = 0
franchises_co2_kg = 0
franchises_co2_kg_percent = 0
investments_co2_kg = 0
investments_co2_kg_percent = 0
scope3_co2_kg = 0
scope3_co2_kg_percent = 0

# Perform Mongo Queries

#begin aggregating the collection and resorting data
collection = db_ledger.get_collection(collection_name)

client_loc_record = client['sc_app'].client_locs.find_one({"client_loc_id": client_loc_id})
if (client_loc_record is None):
	client_loc_record = client['sc_app'].client_locs.find_one({"_id": ObjectId(client_loc_id)})

client_org_id = client_loc_record["client_org_id"]

client_org_record = client['sc_app'].client_orgs.find_one({"client_org_id": client_org_id})
if (client_org_record is None):
	client_org_record = client['sc_app'].client_orgs.find_one({"_id": ObjectId(client_org_id)})
client_org_data = client_org_record["client_org_data"]

client_org_name = client_org_data["client_org_name"]
client_loc_name = client_loc_record["client_loc_data"]["client_loc_name"]
client_org_name = client_org_name + " - " + client_loc_name


stage_match_category = {
	"$match": {
		"ghg_data.category": {
			"$exists": "true",
		}
	}
}

stage_group_category = {
	"$group": {
		"_id": "$ghg_data.category",
		"CO2e_kg": {
			"$sum": "$ghg_data.CO2e_kg",
		},
		"N2O_kg": {
			"$sum": "$ghg_data.CO2e_kg",
		},
		"CH4_kg": {
			"$sum": "$ghg_data.CO2e_kg",
		},
		"CO2_kg": {
			"$sum": "$ghg_data.CO2e_kg",
		}
	}
}

pipeline = [
	stage_match_category,
	stage_group_category,
]

presort = []

results = collection.aggregate(pipeline)
print("results:"+str(results))
for doc in results:
	#SCOPE 1
	if doc['_id'] == 'Stationary Combustion':
		stationary_combustion_co2e_kg = stationary_combustion_co2e_kg + round(doc['CO2e_kg'], dec_places)
		stationary_combustion_n2o_kg = stationary_combustion_n2o_kg + round(doc['N2O_kg'], dec_places)
		stationary_combustion_ch4_kg = stationary_combustion_ch4_kg + round(doc['CH4_kg'], dec_places)
		stationary_combustion_co2_kg = stationary_combustion_co2_kg + round(doc['CO2_kg'], dec_places)
	if doc['_id'] == 'Mobile Combustion':
		mobile_combustion_co2e_kg = mobile_combustion_co2e_kg + round(doc['CO2e_kg'], dec_places)
		mobile_combustion_n2o_kg = mobile_combustion_n2o_kg + round(doc['N2O_kg'], dec_places)
		mobile_combustion_ch4_kg = mobile_combustion_ch4_kg + round(doc['CH4_kg'], dec_places)
		mobile_combustion_co2_kg = mobile_combustion_co2_kg + round(doc['CO2_kg'], dec_places)
	if doc['_id'] == 'Refrigerants':
		refrigerants_co2e_kg = refrigerants_co2e_kg + round(doc['CO2e_kg'], dec_places)
		refrigerants_n2o_kg = refrigerants_n2o_kg + round(doc['N2O_kg'], dec_places)
		refrigerants_ch4_kg = refrigerants_ch4_kg + round(doc['CH4_kg'], dec_places)
		refrigerants_co2_kg = refrigerants_co2_kg + round(doc['CO2_kg'], dec_places)

	#SCOPE 2
	if doc['_id'] == 'Purchased Electricity':
		purchased_electrcity_co2e_kg = purchased_electrcity_co2e_kg + round(doc['CO2e_kg'], dec_places)
		purchased_electrcity_n2o_kg = purchased_electrcity_n2o_kg + round(doc['N2O_kg'], dec_places)
		purchased_electrcity_ch4_kg = purchased_electrcity_ch4_kg + round(doc['CH4_kg'], dec_places)
		purchased_electrcity_co2_kg = purchased_electrcity_co2_kg + round(doc['CO2_kg'], dec_places)
	if doc['_id'] == 'Purchased Heat':
		purchased_heat_co2e_kg = purchased_heat_co2e_kg + round(doc['CO2e_kg'], dec_places)
		purchased_heat_n2o_kg = purchased_heat_n2o_kg + round(doc['N2O_kg'], dec_places)
		purchased_heat_ch4_kg = purchased_heat_ch4_kg + round(doc['CH4_kg'], dec_places)
		purchased_heat_co2_kg = purchased_heat_co2_kg + round(doc['CO2_kg'], dec_places)
	if doc['_id'] == 'Purchased Cooling':
		purchased_cooling_co2e_kg = purchased_cooling_co2e_kg + round(doc['CO2e_kg'], dec_places)
		purchased_cooling_n2o_kg = purchased_cooling_n2o_kg + round(doc['N2O_kg'], dec_places)
		purchased_cooling_ch4_kg = purchased_cooling_ch4_kg + round(doc['CH4_kg'], dec_places)
		purchased_cooling_co2_kg = purchased_cooling_co2_kg + round(doc['CO2_kg'], dec_places)

	#SCOPE 3
	if doc['_id'] == 'Purchased Goods and Services':
		purchased_goods_services_co2e_kg = purchased_goods_services_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Capital Goods':
		capital_goods_co2e_kg = capital_goods_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Fuel and Energy-related activities not included in Scope 1 or Scope 2':
		fuel_and_energy_activities_co2e_kg = fuel_and_energy_activities_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Upstream Transport and Distribution (T&D) of purchased electricity and steam':
		upstream_t_and_d_co2e_kg = upstream_t_and_d_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Waste Generated in Operations':
		waste_generated_co2e_kg = waste_generated_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Business Travel':
		business_travel_co2e_kg = business_travel_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Employee Commuting':
		employee_commuting_co2e_kg = employee_commuting_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Upstream Leased Assets':
		upstream_leased_assets_co2e_kg = upstream_leased_assets_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Downstream Transport and Distribution':
		downstream_t_and_d_co2e_kg = downstream_t_and_d_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Processing of Sold Products':
		processing_of_sold_products_co2e_kg = processing_of_sold_products_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Use of Sold Products':
		use_of_sold_products_co2e_kg = use_of_sold_products_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'EOL Treatment of Sold Products':
		eol_treatment_of_sold_products_co2e_kg = eol_treatment_of_sold_products_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Downstream Leased Assets':
		downstream_leased_assets_co2e_kg = downstream_leased_assets_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Franchises':
		franchises_co2e_kg = franchises_co2e_kg + round(doc['CO2e_kg'], dec_places)
	if doc['_id'] == 'Investments':
		investments_co2e_kg = investments_co2e_kg + round(doc['CO2e_kg'], dec_places)

#===========================================================================
# Scope 1
#===========================================================================
scope1_co2e_kg = round((stationary_combustion_co2e_kg + mobile_combustion_co2e_kg + refrigerants_co2e_kg), dec_places)
scope1_n2o_kg = round((stationary_combustion_n2o_kg + mobile_combustion_n2o_kg + refrigerants_n2o_kg), dec_places)
scope1_ch4_kg = round((stationary_combustion_ch4_kg + mobile_combustion_ch4_kg + refrigerants_ch4_kg), dec_places)
scope1_co2_kg = round((stationary_combustion_co2_kg + mobile_combustion_co2_kg + refrigerants_co2_kg), dec_places)

if scope1_co2e_kg > 0:
	stationary_combustion_co2e_kg_percentage = round(((stationary_combustion_co2e_kg / scope1_co2e_kg) * 100), dec_places)
	mobile_combustion_co2e_kg_percentage = round(((mobile_combustion_co2e_kg / scope1_co2e_kg) * 100), dec_places)
	refrigerants_co2e_kg_percentage = round(((refrigerants_co2e_kg / scope1_co2e_kg) * 100), dec_places)

if scope1_n2o_kg > 0:
	stationary_combustion_n2o_kg_percentage = round(((stationary_combustion_n2o_kg / scope1_n2o_kg) * 100), dec_places)
	mobile_combustion_n2o_kg_percentage = round(((mobile_combustion_n2o_kg / scope1_n2o_kg) * 100), dec_places)
	refrigerants_n2o_kg_percentage = round(((refrigerants_n2o_kg / scope1_n2o_kg) * 100), dec_places)

if scope1_ch4_kg > 0:
	stationary_combustion_ch4_kg_percentage = round(((stationary_combustion_ch4_kg / scope1_ch4_kg) * 100), dec_places)
	mobile_combustion_ch4_kg_percentage = round(((mobile_combustion_ch4_kg / scope1_ch4_kg) * 100), dec_places)
	refrigerants_ch4_kg_percentage = round(((refrigerants_ch4_kg / scope1_ch4_kg) * 100), dec_places)

if scope1_co2_kg > 0:
	stationary_combustion_co2_kg_percentage = round(((stationary_combustion_co2_kg / scope1_co2_kg) * 100), dec_places)
	mobile_combustion_co2_kg_percentage = round(((mobile_combustion_co2_kg / scope1_co2_kg) * 100), dec_places)
	refrigerants_co2_kg_percentage = round(((refrigerants_co2_kg / scope1_co2_kg) * 100), dec_places)

#===========================================================================
# Scope 2
#===========================================================================
scope2_co2e_kg = round((purchased_electrcity_co2e_kg + purchased_heat_co2e_kg + purchased_cooling_co2e_kg), dec_places)
scope2_n2o_kg = round((purchased_electrcity_n2o_kg + purchased_heat_n2o_kg + purchased_cooling_n2o_kg), dec_places)
scope2_ch4_kg = round((purchased_electrcity_ch4_kg + purchased_heat_ch4_kg + purchased_cooling_ch4_kg), dec_places)
scope2_co2_kg = round((purchased_electrcity_co2_kg + purchased_heat_co2_kg + purchased_cooling_co2_kg), dec_places)
if scope2_co2e_kg > 0:
	purchased_electrcity_co2e_kg_percentage = round(((purchased_electrcity_co2e_kg / scope2_co2e_kg) * 100), dec_places)
	purchased_heat_co2e_kg_percentage = round(((purchased_heat_co2e_kg / scope2_co2e_kg) * 100), dec_places)
	purchased_cooling_co2e_kg_percentage = round(((purchased_cooling_co2e_kg / scope2_co2e_kg) * 100), dec_places)

if scope2_n2o_kg > 0:
	purchased_electrcity_n2o_kg_percentage = round(((purchased_electrcity_n2o_kg / scope2_n2o_kg) * 100), dec_places)
	purchased_heat_n2o_kg_percentage = round(((purchased_heat_n2o_kg / scope2_n2o_kg) * 100), dec_places)
	purchased_cooling_n2o_kg_percentage = round(((purchased_cooling_n2o_kg / scope2_n2o_kg) * 100), dec_places)

if scope2_ch4_kg > 0:
	purchased_electrcity_ch4_kg_percentage = round(((purchased_electrcity_ch4_kg / scope2_ch4_kg) * 100), dec_places)
	purchased_heat_ch4_kg_percentage = round(((purchased_heat_ch4_kg / scope2_ch4_kg) * 100), dec_places)
	purchased_cooling_ch4_kg_percentage = round(((purchased_cooling_ch4_kg / scope2_ch4_kg) * 100), dec_places)

if scope2_co2_kg > 0:
	purchased_electrcity_co2_kg_percentage = round(((purchased_electrcity_co2_kg / scope2_co2_kg) * 100), dec_places)
	purchased_heat_co2_kg_percentage = round(((purchased_heat_co2_kg / scope2_co2_kg) * 100), dec_places)
	purchased_cooling_co2_kg_percentage = round(((purchased_cooling_co2_kg / scope2_co2_kg) * 100), dec_places)

#===========================================================================
# Scope 3
#===========================================================================
scope3_co2e_kg = round((purchased_goods_services_co2e_kg + \
						capital_goods_co2e_kg + \
						fuel_and_energy_activities_co2e_kg + \
						upstream_t_and_d_co2e_kg + \
						waste_generated_co2e_kg + \
						business_travel_co2e_kg + \
						employee_commuting_co2e_kg + \
						upstream_leased_assets_co2e_kg + \
						downstream_t_and_d_co2e_kg + \
						processing_of_sold_products_co2e_kg + \
						use_of_sold_products_co2e_kg + \
						eol_treatment_of_sold_products_co2e_kg + \
						downstream_leased_assets_co2e_kg + \
						franchises_co2e_kg + \
						investments_co2e_kg), dec_places)

scope3_n2o_kg = round((purchased_goods_services_n2o_kg + \
						capital_goods_n2o_kg + \
						fuel_and_energy_activities_n2o_kg + \
						upstream_t_and_d_n2o_kg + \
						waste_generated_n2o_kg + \
						business_travel_n2o_kg + \
						employee_commuting_n2o_kg + \
						upstream_leased_assets_n2o_kg + \
						downstream_t_and_d_n2o_kg + \
						processing_of_sold_products_n2o_kg + \
						use_of_sold_products_n2o_kg + \
						eol_treatment_of_sold_products_n2o_kg + \
						downstream_leased_assets_n2o_kg + \
						franchises_n2o_kg + \
						investments_n2o_kg), dec_places)


scope3_ch4_kg = round((purchased_goods_services_ch4_kg + \
						capital_goods_ch4_kg + \
						fuel_and_energy_activities_ch4_kg + \
						upstream_t_and_d_ch4_kg + \
						waste_generated_ch4_kg + \
						business_travel_ch4_kg + \
						employee_commuting_ch4_kg + \
						upstream_leased_assets_ch4_kg + \
						downstream_t_and_d_ch4_kg + \
						processing_of_sold_products_ch4_kg + \
						use_of_sold_products_ch4_kg + \
						eol_treatment_of_sold_products_ch4_kg + \
						downstream_leased_assets_ch4_kg + \
						franchises_ch4_kg + \
						investments_ch4_kg), dec_places)


scope3_co2_kg = round((purchased_goods_services_co2_kg + \
						capital_goods_co2_kg + \
						fuel_and_energy_activities_co2_kg + \
						upstream_t_and_d_co2_kg + \
						waste_generated_co2_kg + \
						business_travel_co2_kg + \
						employee_commuting_co2_kg + \
						upstream_leased_assets_co2_kg + \
						downstream_t_and_d_co2_kg + \
						processing_of_sold_products_co2_kg + \
						use_of_sold_products_co2_kg + \
						eol_treatment_of_sold_products_co2_kg + \
						downstream_leased_assets_co2_kg + \
						franchises_co2_kg + \
						investments_co2_kg), dec_places)

if scope3_co2e_kg > 0:
	purchased_goods_services_co2e_kg_percentage = round(((purchased_goods_services_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	capital_goods_co2e_kg_percentage = round(((capital_goods_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	fuel_and_energy_activities_co2e_kg_percentage = round(((fuel_and_energy_activities_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	upstream_t_and_d_co2e_kg_percentage = round(((upstream_t_and_d_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	waste_generated_co2e_kg_percentage = round(((waste_generated_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	business_travel_co2e_kg_percentage = round(((business_travel_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	employee_commuting_co2e_kg_percentage = round(((employee_commuting_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	upstream_leased_assets_co2e_kg_percentage = round(((upstream_leased_assets_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	downstream_t_and_d_co2e_kg_percentage = round(((downstream_t_and_d_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	processing_of_sold_products_co2e_kg_percentage = round(((processing_of_sold_products_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	use_of_sold_products_co2e_kg_percentage = round(((use_of_sold_products_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	eol_treatment_of_sold_products_co2e_kg_percentage = round(((eol_treatment_of_sold_products_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	downstream_leased_assets_co2e_kg_percentage = round(((downstream_leased_assets_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	franchises_co2e_kg_percentage = round(((franchises_co2e_kg / scope3_co2e_kg) * 100), dec_places)
	investments_co2e_kg_percentage = round(((investments_co2e_kg / scope3_co2e_kg) * 100), dec_places)

if scope3_n2o_kg > 0:
	purchased_goods_services_n2o_kg_percentage = round(((purchased_goods_services_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	capital_goods_n2o_kg_percentage = round(((capital_goods_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	fuel_and_energy_activities_n2o_kg_percentage = round(((fuel_and_energy_activities_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	upstream_t_and_d_n2o_kg_percentage = round(((upstream_t_and_d_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	waste_generated_n2o_kg_percentage = round(((waste_generated_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	business_travel_n2o_kg_percentage = round(((business_travel_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	employee_commuting_n2o_kg_percentage = round(((employee_commuting_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	upstream_leased_assets_n2o_kg_percentage = round(((upstream_leased_assets_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	downstream_t_and_d_n2o_kg_percentage = round(((downstream_t_and_d_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	processing_of_sold_products_n2o_kg_percentage = round(((processing_of_sold_products_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	use_of_sold_products_n2o_kg_percentage = round(((use_of_sold_products_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	eol_treatment_of_sold_products_n2o_kg_percentage = round(((eol_treatment_of_sold_products_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	downstream_leased_assets_n2o_kg_percentage = round(((downstream_leased_assets_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	franchises_n2o_kg_percentage = round(((franchises_n2o_kg / scope3_n2o_kg) * 100), dec_places)
	investments_n2o_kg_percentage = round(((investments_n2o_kg / scope3_n2o_kg) * 100), dec_places)

if scope3_ch4_kg > 0:
	purchased_goods_services_ch4_kg_percentage = round(((purchased_goods_services_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	capital_goods_ch4_kg_percentage = round(((capital_goods_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	fuel_and_energy_activities_ch4_kg_percentage = round(((fuel_and_energy_activities_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	upstream_t_and_d_ch4_kg_percentage = round(((upstream_t_and_d_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	waste_generated_ch4_kg_percentage = round(((waste_generated_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	business_travel_ch4_kg_percentage = round(((business_travel_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	employee_commuting_ch4_kg_percentage = round(((employee_commuting_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	upstream_leased_assets_ch4_kg_percentage = round(((upstream_leased_assets_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	downstream_t_and_d_ch4_kg_percentage = round(((downstream_t_and_d_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	processing_of_sold_products_ch4_kg_percentage = round(((processing_of_sold_products_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	use_of_sold_products_ch4_kg_percentage = round(((use_of_sold_products_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	eol_treatment_of_sold_products_ch4_kg_percentage = round(((eol_treatment_of_sold_products_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	downstream_leased_assets_ch4_kg_percentage = round(((downstream_leased_assets_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	franchises_ch4_kg_percentage = round(((franchises_ch4_kg / scope3_ch4_kg) * 100), dec_places)
	investments_ch4_kg_percentage = round(((investments_ch4_kg / scope3_ch4_kg) * 100), dec_places)

if scope3_co2_kg > 0:
	purchased_goods_services_co2_kg_percentage = round(((purchased_goods_services_co2_kg / scope3_co2_kg) * 100), dec_places)
	capital_goods_co2_kg_percentage = round(((capital_goods_co2_kg / scope3_co2_kg) * 100), dec_places)
	fuel_and_energy_activities_co2_kg_percentage = round(((fuel_and_energy_activities_co2_kg / scope3_co2_kg) * 100), dec_places)
	upstream_t_and_d_co2_kg_percentage = round(((upstream_t_and_d_co2_kg / scope3_co2_kg) * 100), dec_places)
	waste_generated_co2_kg_percentage = round(((waste_generated_co2_kg / scope3_co2_kg) * 100), dec_places)
	business_travel_co2_kg_percentage = round(((business_travel_co2_kg / scope3_co2_kg) * 100), dec_places)
	employee_commuting_co2_kg_percentage = round(((employee_commuting_co2_kg / scope3_co2_kg) * 100), dec_places)
	upstream_leased_assets_co2_kg_percentage = round(((upstream_leased_assets_co2_kg / scope3_co2_kg) * 100), dec_places)
	downstream_t_and_d_co2_kg_percentage = round(((downstream_t_and_d_co2_kg / scope3_co2_kg) * 100), dec_places)
	processing_of_sold_products_co2_kg_percentage = round(((processing_of_sold_products_co2_kg / scope3_co2_kg) * 100), dec_places)
	use_of_sold_products_co2_kg_percentage = round(((use_of_sold_products_co2_kg / scope3_co2_kg) * 100), dec_places)
	eol_treatment_of_sold_products_co2_kg_percentage = round(((eol_treatment_of_sold_products_co2_kg / scope3_co2_kg) * 100), dec_places)
	downstream_leased_assets_co2_kg_percentage = round(((downstream_leased_assets_co2_kg / scope3_co2_kg) * 100), dec_places)
	franchises_co2_kg_percentage = round(((franchises_co2_kg / scope3_co2_kg) * 100), dec_places)
	investments_co2_kg_percentage = round(((investments_co2_kg / scope3_co2_kg) * 100), dec_places)

#===========================================================================
# Total
#===========================================================================
total_CO2e_kg = round((scope1_co2e_kg + scope2_co2e_kg + scope3_co2e_kg), dec_places)
total_N2O_kg = round((scope1_n2o_kg + scope2_n2o_kg + scope3_n2o_kg), dec_places)
total_CH4_kg = round((scope1_ch4_kg + scope2_ch4_kg + scope3_ch4_kg), dec_places)
total_CO2_kg = round((scope1_co2_kg + scope2_co2_kg + scope3_co2_kg), dec_places)
if total_CO2e_kg > 0:
	scope1_co2e_kg_percent = round(((scope1_co2e_kg / total_CO2e_kg) * 100), dec_places)
	scope2_co2e_kg_percent = round(((scope2_co2e_kg / total_CO2e_kg) * 100), dec_places)
	scope3_co2e_kg_percent = round(((scope3_co2e_kg / total_CO2e_kg) * 100), dec_places)

if total_N2O_kg > 0:
	scope1_n2o_kg_percent = round(((scope1_n2o_kg / total_N2O_kg) * 100), dec_places)
	scope2_n2o_kg_percent = round(((scope2_n2o_kg / total_N2O_kg) * 100), dec_places)
	scope3_n2o_kg_percent = round(((scope3_n2o_kg / total_N2O_kg) * 100), dec_places)

if total_CH4_kg > 0:
	scope1_ch4_kg_percent = round(((scope1_ch4_kg / total_CH4_kg) * 100), dec_places)
	scope2_ch4_kg_percent = round(((scope2_ch4_kg / total_CH4_kg) * 100), dec_places)
	scope3_ch4_kg_percent = round(((scope3_ch4_kg / total_CH4_kg) * 100), dec_places)

if total_CO2_kg > 0:
	scope1_co2_kg_percent = round(((scope1_co2_kg / total_CH4_kg) * 100), dec_places)
	scope2_co2_kg_percent = round(((scope2_co2_kg / total_CH4_kg) * 100), dec_places)
	scope3_co2_kg_percent = round(((scope3_co2_kg / total_CH4_kg) * 100), dec_places)


# Begin preparing pdf file
context = {
	'client_org_name': client_org_name,
	'date': date,
	'stationary_combustion_co2e_kg' : stationary_combustion_co2e_kg,
	'stationary_combustion_co2e_kg_percent' : stationary_combustion_co2e_kg_percent,
	'mobile_combustion_co2e_kg' : mobile_combustion_co2e_kg,
	'mobile_combustion_co2e_kg_percent' : mobile_combustion_co2e_kg_percent,
	'refrigerants_co2e_kg' : refrigerants_co2e_kg,
	'refrigerants_co2e_kg_percent' : refrigerants_co2e_kg_percent,

	'stationary_combustion_n2o_kg' : stationary_combustion_n2o_kg,
	'stationary_combustion_n2o_kg_percent' : stationary_combustion_n2o_kg_percent,
	'mobile_combustion_n2o_kg' : mobile_combustion_n2o_kg,
	'mobile_combustion_n2o_kg_percent' : mobile_combustion_n2o_kg_percent,
	'refrigerants_n2o_kg' : refrigerants_n2o_kg,
	'refrigerants_n2o_kg_percent' : refrigerants_n2o_kg_percent,

	'stationary_combustion_ch4_kg' : stationary_combustion_ch4_kg,
	'stationary_combustion_ch4_kg_percent' : stationary_combustion_ch4_kg_percent,
	'mobile_combustion_ch4_kg' : mobile_combustion_ch4_kg,
	'mobile_combustion_ch4_kg_percent' : mobile_combustion_ch4_kg_percent,
	'refrigerants_ch4_kg' : refrigerants_ch4_kg,
	'refrigerants_ch4_kg_percent' : refrigerants_ch4_kg_percent,

	'stationary_combustion_co2_kg' : stationary_combustion_co2_kg,
	'stationary_combustion_co2_kg_percent' : stationary_combustion_co2_kg_percent,
	'mobile_combustion_co2_kg' : mobile_combustion_co2_kg,
	'mobile_combustion_co2_kg_percent' : mobile_combustion_co2_kg_percent,
	'refrigerants_co2_kg' : refrigerants_co2_kg,
	'refrigerants_co2_kg_percent' : refrigerants_co2_kg_percent,
	'scope1_co2e_kg' : scope1_co2e_kg,
	'scope1_co2e_kg_percent' : scope1_co2e_kg_percent,
	'scope1_n2o_kg' : scope1_n2o_kg,
	'scope1_n2o_kg_percent' : scope1_n2o_kg_percent,
	'scope1_ch4_kg' : scope1_ch4_kg,
	'scope1_ch4_kg_percent' : scope1_ch4_kg_percent,
	'scope1_co2_kg' : scope1_co2_kg,
	'scope1_co2_kg_percent' : scope1_co2_kg_percent,
	'purchased_electrcity_co2e_kg' : purchased_electrcity_co2e_kg,
	'purchased_electrcity_co2e_kg_percent' : purchased_electrcity_co2e_kg_percent,
	'purchased_heat_co2e_kg' : purchased_heat_co2e_kg,
	'purchased_heat_co2e_kg_percent' : purchased_heat_co2e_kg_percent,
	'purchased_cooling_co2e_kg' : purchased_cooling_co2e_kg,
	'purchased_cooling_co2e_kg_percent' : purchased_cooling_co2e_kg_percent,

	'purchased_electrcity_n2o_kg' : purchased_electrcity_n2o_kg,
	'purchased_electrcity_n2o_kg_percent' : purchased_electrcity_n2o_kg_percent,
	'purchased_heat_n2o_kg' : purchased_heat_n2o_kg,
	'purchased_heat_n2o_kg_percent' : purchased_heat_n2o_kg_percent,
	'purchased_cooling_n2o_kg' : purchased_cooling_n2o_kg,
	'purchased_cooling_n2o_kg_percent' : purchased_cooling_n2o_kg_percent,

	'purchased_electrcity_ch4_kg' : purchased_electrcity_ch4_kg,
	'purchased_electrcity_ch4_kg_percent' : purchased_electrcity_ch4_kg_percent,
	'purchased_heat_ch4_kg' : purchased_heat_ch4_kg,
	'purchased_heat_ch4_kg_percent' : purchased_heat_ch4_kg_percent,
	'purchased_cooling_ch4_kg' : purchased_cooling_ch4_kg,
	'purchased_cooling_ch4_kg_percent' : purchased_cooling_ch4_kg_percent,

	'purchased_electrcity_co2_kg' : purchased_electrcity_co2_kg,
	'purchased_electrcity_co2_kg_percent' : purchased_electrcity_co2_kg_percent,
	'purchased_heat_co2_kg' : purchased_heat_co2_kg,
	'purchased_heat_co2_kg_percent' : purchased_heat_co2_kg_percent,
	'purchased_cooling_co2_kg' : purchased_cooling_co2_kg,
	'purchased_cooling_co2_kg_percent' : purchased_cooling_co2_kg_percent,

	'scope2_co2e_kg' : scope2_co2e_kg,
	'scope2_co2e_kg_percent' : scope2_co2e_kg_percent,
	'scope2_n2o_kg' : scope2_n2o_kg,
	'scope2_n2o_kg_percent' : scope2_n2o_kg_percent,
	'scope2_ch4_kg' : scope2_ch4_kg,
	'scope2_ch4_kg_percent' : scope2_ch4_kg_percent,
	'scope2_co2_kg' : scope2_co2_kg,
	'scope2_co2_kg_percent' : scope2_co2_kg_percent,

	'purchased_goods_services_co2e_kg' : purchased_goods_services_co2e_kg,
	'purchased_goods_services_co2e_kg_percent' : purchased_goods_services_co2e_kg_percent,
	'capital_goods_co2e_kg' : capital_goods_co2e_kg,
	'capital_goods_co2e_kg_percent' : capital_goods_co2e_kg_percent,
	'fuel_and_energy_activities_co2e_kg' : fuel_and_energy_activities_co2e_kg,
	'fuel_and_energy_activities_co2e_kg_percent' : fuel_and_energy_activities_co2e_kg_percent,
	'upstream_t_and_d_co2e_kg' : upstream_t_and_d_co2e_kg,
	'upstream_t_and_d_co2e_kg_percent' : upstream_t_and_d_co2e_kg_percent,
	'waste_generated_co2e_kg' : waste_generated_co2e_kg,
	'waste_generated_co2e_kg_percent' : waste_generated_co2e_kg_percent,
	'business_travel_co2e_kg' : business_travel_co2e_kg,
	'business_travel_co2e_kg_percent' : business_travel_co2e_kg_percent,
	'employee_commuting_co2e_kg' : employee_commuting_co2e_kg,
	'employee_commuting_co2e_kg_percent' : employee_commuting_co2e_kg_percent,
	'upstream_leased_assets_co2e_kg' : upstream_leased_assets_co2e_kg,
	'upstream_leased_assets_co2e_kg_percent' : upstream_leased_assets_co2e_kg_percent,
	'downstream_t_and_d_co2e_kg' : downstream_t_and_d_co2e_kg,
	'downstream_t_and_d_co2e_kg_percent' : downstream_t_and_d_co2e_kg_percent,
	'processing_of_sold_products_co2e_kg' : processing_of_sold_products_co2e_kg,
	'processing_of_sold_products_co2e_kg_percent' : processing_of_sold_products_co2e_kg_percent,
	'use_of_sold_products_co2e_kg' : use_of_sold_products_co2e_kg,
	'use_of_sold_products_co2e_kg_percent' : use_of_sold_products_co2e_kg_percent,
	'eol_treatment_of_sold_products_co2e_kg' : eol_treatment_of_sold_products_co2e_kg,
	'eol_treatment_of_sold_products_co2e_kg_percent' : eol_treatment_of_sold_products_co2e_kg_percent,
	'downstream_leased_assets_co2e_kg' : downstream_leased_assets_co2e_kg,
	'downstream_leased_assets_co2e_kg_percent' : downstream_leased_assets_co2e_kg_percent,
	'franchises_co2e_kg' : franchises_co2e_kg,
	'franchises_co2e_kg_percent' : franchises_co2e_kg_percent,
	'investments_co2e_kg' : investments_co2e_kg,
	'investments_co2e_kg_percent' : investments_co2e_kg_percent,
	'purchased_goods_services_n2o_kg' : purchased_goods_services_n2o_kg,
	'purchased_goods_services_n2o_kg_percent' : purchased_goods_services_n2o_kg_percent,
	'capital_goods_n2o_kg' : capital_goods_n2o_kg,
	'capital_goods_n2o_kg_percent' : capital_goods_n2o_kg_percent,
	'fuel_and_energy_activities_n2o_kg' : fuel_and_energy_activities_n2o_kg,
	'fuel_and_energy_activities_n2o_kg_percent' : fuel_and_energy_activities_n2o_kg_percent,
	'upstream_t_and_d_n2o_kg' : upstream_t_and_d_n2o_kg,
	'upstream_t_and_d_n2o_kg_percent' : upstream_t_and_d_n2o_kg_percent,
	'waste_generated_n2o_kg' : waste_generated_n2o_kg,
	'waste_generated_n2o_kg_percent' : waste_generated_n2o_kg_percent,
	'business_travel_n2o_kg' : business_travel_n2o_kg,
	'business_travel_n2o_kg_percent' : business_travel_n2o_kg_percent,
	'employee_commuting_n2o_kg' : employee_commuting_n2o_kg,
	'employee_commuting_n2o_kg_percent' : employee_commuting_n2o_kg_percent,
	'upstream_leased_assets_n2o_kg' : upstream_leased_assets_n2o_kg,
	'upstream_leased_assets_n2o_kg_percent' : upstream_leased_assets_n2o_kg_percent,
	'downstream_t_and_d_n2o_kg' : downstream_t_and_d_n2o_kg,
	'downstream_t_and_d_n2o_kg_percent' : downstream_t_and_d_n2o_kg_percent,
	'processing_of_sold_products_n2o_kg' : processing_of_sold_products_n2o_kg,
	'processing_of_sold_products_n2o_kg_percent' : processing_of_sold_products_n2o_kg_percent,
	'use_of_sold_products_n2o_kg' : use_of_sold_products_n2o_kg,
	'use_of_sold_products_n2o_kg_percent' : use_of_sold_products_n2o_kg_percent,
	'eol_treatment_of_sold_products_n2o_kg' : eol_treatment_of_sold_products_n2o_kg,
	'eol_treatment_of_sold_products_n2o_kg_percent' : eol_treatment_of_sold_products_n2o_kg_percent,
	'downstream_leased_assets_n2o_kg' : downstream_leased_assets_n2o_kg,
	'downstream_leased_assets_n2o_kg_percent' : downstream_leased_assets_n2o_kg_percent,
	'franchises_n2o_kg' : franchises_n2o_kg,
	'franchises_n2o_kg_percent' : franchises_n2o_kg_percent,
	'investments_n2o_kg' : investments_n2o_kg,
	'investments_n2o_kg_percent' : investments_n2o_kg_percent,
	'purchased_goods_services_ch4_kg' : purchased_goods_services_ch4_kg,
	'purchased_goods_services_ch4_kg_percent' : purchased_goods_services_ch4_kg_percent,
	'capital_goods_ch4_kg' : capital_goods_ch4_kg,
	'capital_goods_ch4_kg_percent' : capital_goods_ch4_kg_percent,
	'fuel_and_energy_activities_ch4_kg' : fuel_and_energy_activities_ch4_kg,
	'fuel_and_energy_activities_ch4_kg_percent' : fuel_and_energy_activities_ch4_kg_percent,
	'upstream_t_and_d_ch4_kg' : upstream_t_and_d_ch4_kg,
	'upstream_t_and_d_ch4_kg_percent' : upstream_t_and_d_ch4_kg_percent,
	'waste_generated_ch4_kg' : waste_generated_ch4_kg,
	'waste_generated_ch4_kg_percent' : waste_generated_ch4_kg_percent,
	'business_travel_ch4_kg' : business_travel_ch4_kg,
	'business_travel_ch4_kg_percent' : business_travel_ch4_kg_percent,
	'employee_commuting_ch4_kg' : employee_commuting_ch4_kg,
	'employee_commuting_ch4_kg_percent' : employee_commuting_ch4_kg_percent,
	'upstream_leased_assets_ch4_kg' : upstream_leased_assets_ch4_kg,
	'upstream_leased_assets_ch4_kg_percent' : upstream_leased_assets_ch4_kg_percent,
	'downstream_t_and_d_ch4_kg' : downstream_t_and_d_ch4_kg,
	'downstream_t_and_d_ch4_kg_percent' : downstream_t_and_d_ch4_kg_percent,
	'processing_of_sold_products_ch4_kg' : processing_of_sold_products_ch4_kg,
	'processing_of_sold_products_ch4_kg_percent' : processing_of_sold_products_ch4_kg_percent,
	'use_of_sold_products_ch4_kg' : use_of_sold_products_ch4_kg,
	'use_of_sold_products_ch4_kg_percent' : use_of_sold_products_ch4_kg_percent,
	'eol_treatment_of_sold_products_ch4_kg' : eol_treatment_of_sold_products_ch4_kg,
	'eol_treatment_of_sold_products_ch4_kg_percent' : eol_treatment_of_sold_products_ch4_kg_percent,
	'downstream_leased_assets_ch4_kg' : downstream_leased_assets_ch4_kg,
	'downstream_leased_assets_ch4_kg_percent' : downstream_leased_assets_ch4_kg_percent,
	'franchises_ch4_kg' : franchises_ch4_kg,
	'franchises_ch4_kg_percent' : franchises_ch4_kg_percent,
	'investments_ch4_kg' : investments_ch4_kg,
	'investments_ch4_kg_percent' : investments_ch4_kg_percent,
	'purchased_goods_services_co2_kg' : purchased_goods_services_co2_kg,
	'purchased_goods_services_co2_kg_percent' : purchased_goods_services_co2_kg_percent,
	'capital_goods_co2_kg' : capital_goods_co2_kg,
	'capital_goods_co2_kg_percent' : capital_goods_co2_kg_percent,
	'fuel_and_energy_activities_co2_kg' : fuel_and_energy_activities_co2_kg,
	'fuel_and_energy_activities_co2_kg_percent' : fuel_and_energy_activities_co2_kg_percent,
	'upstream_t_and_d_co2_kg' : upstream_t_and_d_co2_kg,
	'upstream_t_and_d_co2_kg_percent' : upstream_t_and_d_co2_kg_percent,
	'waste_generated_co2_kg' : waste_generated_co2_kg,
	'waste_generated_co2_kg_percent' : waste_generated_co2_kg_percent,
	'business_travel_co2_kg' : business_travel_co2_kg,
	'business_travel_co2_kg_percent' : business_travel_co2_kg_percent,
	'employee_commuting_co2_kg' : employee_commuting_co2_kg,
	'employee_commuting_co2_kg_percent' : employee_commuting_co2_kg_percent,
	'upstream_leased_assets_co2_kg' : upstream_leased_assets_co2_kg,
	'upstream_leased_assets_co2_kg_percent' : upstream_leased_assets_co2_kg_percent,
	'downstream_t_and_d_co2_kg' : downstream_t_and_d_co2_kg,
	'downstream_t_and_d_co2_kg_percent' : downstream_t_and_d_co2_kg_percent,
	'processing_of_sold_products_co2_kg' : processing_of_sold_products_co2_kg,
	'processing_of_sold_products_co2_kg_percent' : processing_of_sold_products_co2_kg_percent,
	'use_of_sold_products_co2_kg' : use_of_sold_products_co2_kg,
	'use_of_sold_products_co2_kg_percent' : use_of_sold_products_co2_kg_percent,
	'eol_treatment_of_sold_products_co2_kg' : eol_treatment_of_sold_products_co2_kg,
	'eol_treatment_of_sold_products_co2_kg_percent' : eol_treatment_of_sold_products_co2_kg_percent,
	'downstream_leased_assets_co2_kg' : downstream_leased_assets_co2_kg,
	'downstream_leased_assets_co2_kg_percent' : downstream_leased_assets_co2_kg_percent,
	'franchises_co2_kg' : franchises_co2_kg,
	'franchises_co2_kg_percent' : franchises_co2_kg_percent,
	'investments_co2_kg' : investments_co2_kg,
	'investments_co2_kg_percent' : investments_co2_kg_percent,
	'scope3_co2e_kg' : scope3_co2e_kg,
	'scope3_co2e_kg_percent' : scope3_co2e_kg_percent,

	'scope3_n2o_kg' : scope3_n2o_kg,
	'scope3_n2o_kg_percent' : scope3_n2o_kg_percent,

	'scope3_ch4_kg' : scope3_ch4_kg,
	'scope3_ch4_kg_percent' : scope3_ch4_kg_percent,

	'scope3_co2_kg' : scope3_co2_kg,
	'scope3_co2_kg_percent' : scope3_co2_kg_percent,

	'total_co2_kg' : total_CO2_kg,
	'total_n2o_kg' : total_N2O_kg,
	'total_ch4_kg' : total_CH4_kg,
	'total_co2e_kg' : total_CO2e_kg,
}

# Setup the Jinja2 environment
dir_path = os.path.dirname(os.path.abspath(__file__))
template_loader = jinja2.FileSystemLoader(searchpath=dir_path)
template_env = jinja2.Environment(loader=template_loader)

# Render the template
template = template_env.get_template('templates/summary-report.html')
output_text = template.render(context)

pdf_date = datetime.today().strftime("%Y-%b-%d")

# Generate PDF from rendered HTML
config = pdfkit.configuration(wkhtmltopdf=PATH_WKHTMLTOPDF)
pdf = pdfkit.from_string(output_text, False, configuration=config)

# Send PDF to stdout
sys.stdout.buffer.write(pdf)