const COLUMNS = [
  { id: "name", label: "ACCOUNT NAME", type: "text", input: true },
  { id: "id", label: "INVOICE #", type: "text", input: true },
  // { id: "date", label: "DATE", type: "date", input: true },
  { id: "payee", label: "PAYEE", type: "text", input: true },
  {
    id: "gl",
    label: "MEMO/DESCRIPTION",
    align: "left",
    type: "text",
    input: true,
  },
  // {
  //   id: "confidence",
  //   label: "CONFIDENCE",
  //   align: "left",
  //   type: "text",
  //   input: false,
  // },
  {
    id: "amount",
    label: "AMOUNT $",
    align: "left",
    type: "number",
    input: true,
  },
  {
    id: "scope",
    label: "SCOPE",
    align: "left",
    type: "text",
    input: false,
  },

  {
    id: "CO2e_kg",
    label: "kg co2e",
    align: "left",
    type: "number",
    input: false,
  },
];
export { COLUMNS };
