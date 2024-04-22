from enum import Enum


class consolidation_approach_summary(Enum):
    EQUITY_SHARE = 'Our GHG boundaries align with GHG Protocol, primarily using equity share. We account for emissions from entities in which we have significant ownership, crucial for firms with substantial subsidiary or joint venture investments.'
    FINANCIAL_CONTROL = 'Using financial control, we assess emissions from entities with financial control, including subsidiaries. This approach ensures a comprehensive evaluation of our environmental impact.'
    OPERATIONAL_CONTROL = 'Operational control defines boundaries based on activities we directly manage, allowing a comprehensive assessment of our emissions.'
