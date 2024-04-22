from enum import Enum


class calculation_method_summary(Enum):
    CENTRALIZED = "We use the 'Centralized' method for GHG emissions data. An individual body collects and processes data, ensuring accuracy and consistency for comprehensive environmental assessments."
    DECENTRALIZED = "We use the 'Decentralized' method for GHG emissions data. Each unit manages data independently, offering a granular view but requiring consolidation for comprehensive reporting."
