import enums


class ConsolidationApproach:
    def __init__(self):
        self._attributes = {
            'heading': None,
            'body': None,
        }

    def set_consolidation_approach(self, consolidation_approach):
        if consolidation_approach == 'equity_share':
            self._attributes['heading'] = enums.consolidation_approach_heading.EQUITY_SHARE.value
            self._attributes['body'] = enums.consolidation_approach_body.EQUITY_SHARE.value
        elif consolidation_approach == 'financial_control':
            self._attributes['heading'] = enums.consolidation_approach_heading.FINANCIAL_CONTROL.value
            self._attributes['body'] = enums.consolidation_approach_body.FINANCIAL_CONTROL.value
        elif consolidation_approach == 'operational_control':
            self._attributes['heading'] = enums.consolidation_approach_heading.OPERATIONAL_CONTROL.value
            self._attributes['body'] = enums.consolidation_approach_body.OPERATIONAL_CONTROL.value
        return self

    def get(self):
        return {'consolidation_approach': self._attributes}
