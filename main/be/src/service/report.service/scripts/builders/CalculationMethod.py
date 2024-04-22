import enums


class CalculationMethod:
    def __init__(self):
        self._attributes = {
            'heading': None,
            'body': None,
        }

    def set_calculation_method(self, calculation_method):
        if calculation_method == 'centralized':
            self._attributes['heading'] = enums.calculation_method_heading.CENTRALIZED.value
            self._attributes['body'] = enums.calculation_method_body.CENTRALIZED.value
        elif calculation_method == 'decentralized':
            self._attributes['heading'] = enums.calculation_method_heading.DECENTRALIZED.value
            self._attributes['body'] = enums.calculation_method_body.DECENTRALIZED.value
        return self

    def get(self):
        return {'calculation_method': self._attributes}
