import enums


class Scope1:
    def __init__(self):
        self._attributes = {
            'total': {
                'CO2e_kg': None,
                'CO2_kg': None,
                'CH4_kg': None,
                'N2O_kg': None,
            },
            'list': [],
        }

    def set_total(self, total):
        if total is not None:
            self._attributes['total']['CO2e_kg'] = "{:,.2f}".format(
                float(total.get('CO2e_kg', 0)))
            self._attributes['total']['CO2_kg'] = "{:,.2f}".format(
                float(total.get('CO2_kg', 0)))
            self._attributes['total']['CH4_kg'] = "{:,.2f}".format(
                float(total.get('CH4_kg', 0)))
            self._attributes['total']['N2O_kg'] = "{:,.2f}".format(
                float(total.get('N2O_kg', 0)))
        else:
            self._attributes['total']['CO2e_kg'] = None
            self._attributes['total']['CO2_kg'] = None
            self._attributes['total']['CH4_kg'] = None
            self._attributes['total']['N2O_kg'] = None
        return self

    def set_sectors(self, sectors):
        formatted_sectors = []
        for sector in sectors:
            formatted_sector = {}
            for key, value in sector.items():
                if isinstance(value, (int, float)):
                    formatted_sector[key] = "{:,.2f}".format(float(value))
                else:
                    formatted_sector[key] = value
            formatted_sectors.append(formatted_sector)
        self._attributes['list'] = formatted_sectors
        return self

    def get(self):
        return {'scope1': self._attributes}
