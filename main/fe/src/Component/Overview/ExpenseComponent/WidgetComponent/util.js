function calculateSumByKey(expenses, key) {
  return expenses
    .map((item) => {
      return (!item.archive && item.ghg_data && item.ghg_data[key]) ?? 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

function calculateRankByKey(expenses, key) {
  return Object.entries(
    expenses.reduce((acc, item) => {
      let dashboardKey = item.expense_data[key];
      if (key === "scope" || key === "category") {
        dashboardKey = item.ghg_data[key];
      }

      const co2e = (item.ghg_data && item.ghg_data.CO2e_kg) ?? 0;

      if (acc[dashboardKey]) {
        acc[dashboardKey] += co2e;
      } else {
        acc[dashboardKey] = co2e;
      }

      return acc;
    }, {})
  )
    .map(([dashboardKey, sum]) => ({ [key]: dashboardKey, sum }))
    .filter((item) => item.sum !== 0)
    .sort((a, b) => b.sum - a.sum);
}

export { calculateSumByKey, calculateRankByKey };
