import enums


class ExecutiveSummary:
    def __init__(self):
        self._attributes = {
            'business_goals': None,
            'consolidation_approach': None,
            'calculation_method': None,
            'total_emissions': None,
            'reporting_year': None,
            'base_year': None,
            'includes': None,
        }

    def set_business_goals(self, business_goals):
        if business_goals == 'ghg_risk_management':
            self._attributes['business_goals'] = enums.business_goals_summary.GHG_RISK_MANAGEMENT.value
        elif business_goals == 'voluntary_participation':
            self._attributes['business_goals'] = enums.business_goals_summary.VOLUNTARY_PARTICIPATION.value
        elif business_goals == 'mandatory_compliance':
            self._attributes['business_goals'] = enums.business_goals_summary.MANDATORY_COMPLIANCE.value
        elif business_goals == 'ghg_market_participation':
            self._attributes['business_goals'] = enums.business_goals_summary.GHG_MARKET_PARTICIPATION.value
        return self

    def set_consolidation_approach(self, consolidation_approach):
        if consolidation_approach == 'equity_share':
            self._attributes['consolidation_approach'] = enums.consolidation_approach_summary.EQUITY_SHARE.value
        elif consolidation_approach == 'financial_control':
            self._attributes['consolidation_approach'] = enums.consolidation_approach_summary.FINANCIAL_CONTROL.value
        elif consolidation_approach == 'operational_control':
            self._attributes['consolidation_approach'] = enums.consolidation_approach_summary.OPERATIONAL_CONTROL.value
        return self

    def set_calculation_method(self, calculation_method):
        if calculation_method == 'centralized':
            self._attributes['calculation_method'] = enums.calculation_method_summary.CENTRALIZED.value
        elif calculation_method == 'decentralized':
            self._attributes['calculation_method'] = enums.calculation_method_summary.DECENTRALIZED.value
        return self

    def set_total_emissions(self, total_emissions):
        formatted_total_emissions = "{:,.2f}".format(float(total_emissions))
        self._attributes['total_emissions'] = formatted_total_emissions
        return self

    def set_includes(self, includes):
        scopes = [s for s in includes if s in [
            'Scope 1', 'Scope 2', 'Scope 3']]
        others = [o for o in includes if o not in scopes]

        if len(scopes) > 1:
            scope_str = f"{', '.join(scopes[:-1])} and {scopes[-1]}"
        elif len(scopes) == 1:
            scope_str = scopes[0]
        else:
            scope_str = ""

        if scope_str:
            others.append(scope_str)

        if len(others) > 1:
            self._attributes['includes'] = f"{', '.join(others[:-1])} and {others[-1]}"
        else:
            self._attributes['includes'] = ', '.join(others)

        return self

    def set_reporting_year(self, reporting_year):
        self._attributes['reporting_year'] = reporting_year
        return self

    def set_base_year(self, base_year):
        self._attributes['base_year'] = base_year
        return self
    
    def set_base_range(self, base_range):
        start_date_str, end_date_str = base_range
        self._attributes['base_year'] = f"{start_date_str} to {end_date_str}"
        return self

    def set_reporting_range(self, reporting_range):
        start_date_str, end_date_str = reporting_range
        self._attributes['reporting_year'] = f"{start_date_str} to {end_date_str}"
        return self

    def get(self):
        return {'executive_summary': self._attributes}
