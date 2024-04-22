function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function descendingComparator(a, b, orderBy) {
  let sortByKey = "expense_data";
  if (
    orderBy === "CO2e_kg" ||
    orderBy === "confidence" ||
    orderBy === "scope"
  ) {
    sortByKey = "ghg_data";
  }

  let valueA = a[sortByKey][orderBy];
  let valueB = b[sortByKey][orderBy];
  if (
    orderBy === "CO2e_kg" ||
    orderBy === "amount" ||
    orderBy === "confidence" ||
    orderBy === "scope"
  ) {
    valueA = parseFloat(
      typeof valueA === "string"
        ? valueA.replace(/[^0-9.-]+/g, "")
        : valueA
        ? valueA
        : -Number.MAX_VALUE
    );
    valueB = parseFloat(
      typeof valueB === "string"
        ? valueB.replace(/[^0-9.-]+/g, "")
        : valueB
        ? valueB
        : -Number.MAX_VALUE
    );
  }

  if (orderBy === "date") {
    // valueA = moment(valueA);
    // valueB = moment(valueB);
  }
  if (valueB <= valueA) {
    return -1;
  }
  if (valueB > valueA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, orderBy) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function checkConfidenceRange(number) {
  if (number > 0.75) {
    return { text: "High", color: "#42C776" };
  } else if (number >= 0.5 && number <= 0.75) {
    return { text: "Medium", color: "#D9BC25" };
  } else {
    return { text: "Low", color: "#E94E4E" };
  }
}
export {
  isEmptyObject,
  descendingComparator,
  getComparator,
  stableSort,
  checkConfidenceRange,
};
