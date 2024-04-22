import enums
SUPPLIER_CAP = 12

class SupplierBreakdown:
    def __init__(self):
        self._attributes = {
            'supplier_pages': [],
        }

    def set_suppliers(self, suppliers):
        for supplier in suppliers:
            supplier['emission'] = "{:,.2f}".format(float(supplier['emission']))
            supplier['percentage'] = "{:,.2f}".format(float(supplier['percentage']))

        sorted_suppliers = sorted(
            suppliers, key=lambda x: float(x['percentage']), reverse=True
        )[:SUPPLIER_CAP]

        supplier_chunks = [sorted_suppliers[i:i + 6]
                        for i in range(0, len(sorted_suppliers), 6)]
        
        self._attributes['supplier_pages'] = supplier_chunks
        return self

    def get(self):
        return {'supplier_breakdown': self._attributes}
