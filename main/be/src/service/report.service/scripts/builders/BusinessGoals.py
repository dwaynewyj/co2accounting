import enums


class BusinessGoals:
    def __init__(self):
        self._attributes = {
            'heading': None,
            'body': None,
        }

    def set_business_goals(self, business_goals):
        if business_goals == 'ghg_risk_management':
            self._attributes['heading'] = enums.business_goals_heading.GHG_RISK_MANAGEMENT.value
            self._attributes['body'] = enums.business_goals_body.GHG_RISK_MANAGEMENT.value
        elif business_goals == 'voluntary_participation':
            self._attributes['heading'] = enums.business_goals_heading.VOLUNTARY_PARTICIPATION.value
            self._attributes['body'] = enums.business_goals_body.VOLUNTARY_PARTICIPATION.value
        elif business_goals == 'mandatory_compliance':
            self._attributes['heading'] = enums.business_goals_heading.MANDATORY_COMPLIANCE.value
            self._attributes['body'] = enums.business_goals_body.MANDATORY_COMPLIANCE.value
        elif business_goals == 'ghg_market_participation':
            self._attributes['heading'] = enums.business_goals_heading.GHG_MARKET_PARTICIPATION.value
            self._attributes['body'] = enums.business_goals_body.GHG_MARKET_PARTICIPATION.value
        return self

    def get(self):
        return {'business_goals': self._attributes}
