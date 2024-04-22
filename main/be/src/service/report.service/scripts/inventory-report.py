import jinja2
import pdfkit
import enums
import builders
from pprint import pprint
import os
import sys
import json

PATH_WKHTMLTOPDF = r'/usr/local/bin/wkhtmltopdf'
PATH_ASSETS = r'https://scop3-inventory-report.s3.amazonaws.com'

input_data = json.loads(sys.argv[1])

cover = builders.Cover()
cover.set_location_name(input_data['client_loc_name']) \
    .set_address(input_data['client_loc_address']) \
    .set_city(input_data['client_loc_city']) \
    .set_province(input_data['client_loc_state']) \
    .set_postal_code(input_data['client_loc_zip']) \
    .set_country(input_data['client_loc_country'])

exec_summary = builders.ExecutiveSummary()
exec_summary.set_business_goals(input_data['business_goals']) \
    .set_consolidation_approach(input_data['consolidation_approach']) \
    .set_calculation_method(input_data['calculation_method']) \
    .set_total_emissions(input_data['total_emissions']['total_CO2e_kg']) \
    .set_includes(input_data['includes']) \
    
if input_data['custom_range']:
    exec_summary.set_base_range(input_data['base_range']) \
    .set_reporting_range(input_data['reporting_range'])
else:
    exec_summary.set_reporting_year(input_data['reporting_year']) \
    .set_base_year(input_data['base_year'])

toc = builders.TableOfContents()
toc.set_analysis_list(input_data['includes'])

business_goals = builders.BusinessGoals()
business_goals.set_business_goals(input_data['business_goals']) \

consolidation_approach = builders.ConsolidationApproach()
consolidation_approach.set_consolidation_approach(input_data['consolidation_approach']) \

calculation_method = builders.CalculationMethod()
calculation_method.set_calculation_method(input_data['calculation_method']) \

scope_breakdown = builders.ScopeBreakdown()

scopes = ['Scope 1', 'Scope 2', 'Scope 3']
for scope in scopes:
    # converts 'Scope 1' to 'scope1' etc.
    scope_key = scope.lower().replace(' ', '')
    if scope_key not in input_data["total_emissions"]:
        try:
            input_data["includes"].remove(scope)
        except ValueError:
            pass  # If the scope is not in the list, do nothing

scope_breakdown.set_emissions({
    'total': input_data['total_emissions']['total_CO2e_kg'],
    'scope1': input_data['total_emissions']['scope1']['CO2e_kg'] if 'Scope 1' in input_data['includes'] else None,
    'scope2': input_data['total_emissions']['scope2']['CO2e_kg'] if 'Scope 2' in input_data['includes'] else None,
    'scope3': input_data['total_emissions']['scope3']['CO2e_kg'] if 'Scope 3' in input_data['includes'] else None,
})

supplier_breakdown = builders.SupplierBreakdown()
supplier_breakdown.set_suppliers(input_data['suppliers'])

scope3 = builders.Scope3()
scope3.set_total(input_data['total_emissions'].get('scope3') if 'Scope 3' in input_data['includes'] else None) \
    .set_sectors(input_data['breakdown']['scope3'])

scope2 = builders.Scope2()
scope2.set_total(input_data['total_emissions'].get('scope2') if 'Scope 2' in input_data['includes'] else None) \
    .set_sectors(input_data['breakdown']['scope2'])

scope1 = builders.Scope1()
scope1.set_total(input_data['total_emissions'].get('scope1') if 'Scope 1' in input_data['includes'] else None) \
    .set_sectors(input_data['breakdown']['scope1'])

data = {
    'client_name': input_data['client_name'],
    'assets_path': PATH_ASSETS,
    **cover.get(),
    **exec_summary.get(),
    **toc.get(),
    **business_goals.get(),
    **consolidation_approach.get(),
    **calculation_method.get(),
    **scope_breakdown.get(),
    **supplier_breakdown.get(),
    **scope3.get(),
    **scope2.get(),
    **scope1.get(),
}

# Setup the Jinja2 environment
dir_path = os.path.dirname(os.path.abspath(__file__))
template_loader = jinja2.FileSystemLoader(searchpath=dir_path)
env = jinja2.Environment(loader=template_loader)

templates = [env.get_template('templates/cover.html'),
             env.get_template('templates/executive-summary.html'),
             env.get_template('templates/table-of-contents.html'),
             env.get_template('templates/business-goals.html'),
             env.get_template('templates/consolidation-approach.html'),
             env.get_template('templates/calculation-method.html'),
             env.get_template('templates/scope-breakdown.html'),
             env.get_template('templates/supplier-breakdown.html'),
             env.get_template('templates/scope3.html'),
             env.get_template('templates/scope2.html'),
             env.get_template('templates/scope1.html'),
             env.get_template('templates/legal-disclaimer.html'),
             env.get_template('templates/sources.html'),]

exclusion_mapping = {
    'Scope Breakdown': env.get_template('templates/scope-breakdown.html'),
    'Supplier Breakdown': env.get_template('templates/supplier-breakdown.html'),
    'Scope 1': env.get_template('templates/scope1.html'),
    'Scope 2': env.get_template('templates/scope2.html'),
    'Scope 3': env.get_template('templates/scope3.html'),
}
to_exclude = [exclusion_mapping[item]
              for item in exclusion_mapping.keys() if item not in input_data['includes']]

templates = [template for template in templates if template not in to_exclude]

rendered_pages = []
for template in templates:
    rendered_pages.append(template.render(data))
combined_html = '<div style="page-break-before: always;"></div>'.join(
    rendered_pages)

options = {
    'enable-local-file-access': '',
    'page-size': 'A4',
    'zoom': '0.5',
    'margin-top': '0mm',
    'margin-right': '0mm',
    'margin-bottom': '0mm',
    'margin-left': '0mm',
    # 'enable-javascript': '',
    # 'no-stop-slow-scripts': '',
}

# Generate PDF from rendered HTML
config = pdfkit.configuration(wkhtmltopdf=PATH_WKHTMLTOPDF)
pdf = pdfkit.from_string(combined_html, False, configuration=config, options=options)

# Send PDF to stdout
sys.stdout.buffer.write(pdf)
