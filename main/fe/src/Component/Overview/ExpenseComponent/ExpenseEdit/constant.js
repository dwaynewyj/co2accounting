const COLUMNS = [
  { id: "date", label: "DATE" },
  { id: "payee", label: "PAYEE" },
  {
    id: "gl",
    label: "MEMO/DESCRIPTION",
    align: "left",
  },
  {
    id: "confidence",
    label: "CONFIDENCE",
    align: "left",
  },
  {
    id: "scope",
    label: "SCOPE",
    align: "left",
  },
  {
    id: "amount",
    label: "AMOUNT $",
    align: "left",
  },
  {
    id: "CO2e_kg",
    label: "kg co2e",
    align: "left",
  },
];

const DECISION_TREE = {
  Decision1: {
    question: "What type of expense was this?",
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision2: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision3: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision4: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision5: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision6: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision7: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision8: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision9: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
  Decision10: {
    question: null,
    options: [],
    answer: null,
    value: null,
    unit: null,
    type: null,
  },
};

const CURRENCY = ["USD", "CAD", "EUR", "GBP"];

export { COLUMNS, DECISION_TREE, CURRENCY };
