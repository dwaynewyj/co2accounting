class Cover:
    def __init__(self):
        self._attributes = {
            'location_name': None,
            'address': None,
            'city': None,
            'province': None,
            'postal_code': None,
            'country': None,
        }

    def set_location_name(self, location_name):
        self._attributes['location_name'] = location_name
        return self

    def set_address(self, address):
        self._attributes['address'] = address
        return self

    def set_city(self, city):
        self._attributes['city'] = city
        return self

    def set_province(self, province):
        self._attributes['province'] = province
        return self

    def set_postal_code(self, postal_code):
        self._attributes['postal_code'] = postal_code
        return self

    def set_country(self, country):
        self._attributes['country'] = country
        return self

    def get(self):
        return {'cover': self._attributes}
