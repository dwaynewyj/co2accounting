const calculateEmissions = (expenses) => {
  let total_CO2e_kg = 0;
  const scopes = {};

  expenses.forEach((expense) => {
    const { CO2e_kg, N2O_kg, CH4_kg, CO2_kg, scope } = expense.ghg_data;

    total_CO2e_kg += CO2e_kg ?? 0;
    const scopeKey = `scope${scope}`;

    if (!scopes[scopeKey]) {
      scopes[scopeKey] = { CO2e_kg: 0, CO2_kg: 0, CH4_kg: 0, N2O_kg: 0 };
    }

    scopes[scopeKey].CO2e_kg += CO2e_kg ?? 0;
    scopes[scopeKey].N2O_kg += N2O_kg ?? 0;
    scopes[scopeKey].CH4_kg += CH4_kg ?? 0;
    scopes[scopeKey].CO2_kg += CO2_kg ?? 0;
  });

  return {
    total_CO2e_kg,
    ...scopes,
  };
};

const getTopEmittingSuppliers = (expenses, topCount) => {
  const emissionsPerSupplier = new Map();

  expenses.forEach((expense) => {
    const payee = expense.expense_data.payee;
    const emission = expense.ghg_data.CO2e_kg;

    if (emissionsPerSupplier.has(payee)) {
      emissionsPerSupplier.set(
        payee,
        emissionsPerSupplier.get(payee) + emission,
      );
    } else {
      emissionsPerSupplier.set(payee, emission);
    }
  });

  const totalEmissions = Array.from(emissionsPerSupplier.values()).reduce(
    (a, b) => a + b,
    0,
  );

  const topSuppliers = Array.from(emissionsPerSupplier, ([name, emission]) => ({
    name,
    emission,
    percentage: (emission / totalEmissions) * 100,
  }))
    .sort((a, b) => b.emission - a.emission)
    .slice(0, topCount);

  return topSuppliers;
};

const calculateEmissionsByScopeAndSector = (expenses) => {
  let scopeEmissions = {
    scope1: new Map(),
    scope2: new Map(),
    scope3: new Map(),
  };

  expenses.forEach((expense) => {
    const sector = expense.ghg_data.category;
    const scopeKey = `scope${expense.ghg_data.scope}`;
    if (!scopeEmissions[scopeKey].has(sector)) {
      scopeEmissions[scopeKey].set(sector, {
        CO2_kg: 0,
        CH4_kg: 0,
        N2O_kg: 0,
        CO2e_kg: 0,
      });
    }
    let emissions = scopeEmissions[scopeKey].get(sector);
    emissions.CO2_kg += expense.ghg_data.CO2_kg || 0;
    emissions.CH4_kg += expense.ghg_data.CH4_kg || 0;
    emissions.N2O_kg += expense.ghg_data.N2O_kg || 0;
    emissions.CO2e_kg += expense.ghg_data.CO2e_kg || 0;
  });

  // Process the results for each scope
  let result = {};
  Object.keys(scopeEmissions).forEach((scope) => {
    const totalCO2e = Array.from(scopeEmissions[scope].values()).reduce(
      (total, sector) => total + sector.CO2e_kg,
      0,
    );

    result[scope] = Array.from(scopeEmissions[scope], ([sector, data]) => ({
      sector,
      CO2_kg: data.CO2_kg,
      CH4_kg: data.CH4_kg,
      N2O_kg: data.N2O_kg,
      CO2e_kg: data.CO2e_kg,
      percentage: totalCO2e
        ? ((data.CO2e_kg / totalCO2e) * 100).toFixed(2)
        : "0.00", // Handle zero totalCO2e
    })).sort((a, b) => b.CO2e_kg - a.CO2e_kg);
  });

  return result;
};

module.exports = {
  calculateEmissions,
  calculateEmissionsByScopeAndSector,
  getTopEmittingSuppliers,
};
