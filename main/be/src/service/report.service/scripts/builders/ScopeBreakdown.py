import enums


class ScopeBreakdown:
    def __init__(self):
        self._attributes = {
            'total': None,
            'scope1': None,
            'scope2': None,
            'scope3': None,
            'scope1_percentage': None,
            'scope2_percentage': None,
            'scope3_percentage': None,
        }

    def set_emissions(self, emissions):
        self._attributes['total'] = "{:,.2f}".format(float(
            emissions['total'])) if 'total' in emissions and emissions['total'] is not None else None

        for scope in ['scope1', 'scope2', 'scope3']:
            if scope in emissions and emissions[scope] is not None:
                self._attributes[scope] = "{:,.2f}".format(
                    float(emissions[scope]))
                self._attributes[f'{scope}_percentage'] = round(
                    (float(emissions[scope]) / float(emissions['total'])) * 100)
            else:
                self._attributes[scope] = None
                self._attributes[f'{scope}_percentage'] = None

        return self

    def get(self):
        return {'scope_breakdown': self._attributes}
