import enums


class TableOfContents:
    def __init__(self):
        self._attributes = {
            'analysis_list': None,
        }

    def set_analysis_list(self, includes):
        ordered_keys = ["Scope Breakdown",
                        "Supplier Breakdown", "Scope 3", "Scope 2", "Scope 1"]
        sorted_list = sorted(includes, key=lambda x: ordered_keys.index(x))
        self._attributes['analysis_list'] = sorted_list
        return self

    def get(self):
        return {'table_of_contents': self._attributes}
