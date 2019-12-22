export const normalizeCurrency = currency => {
  if (currency === "NULL") {
    return "";
  } else {
    return currency;
  }
};

export var compare = (a, b) => {
  let comparison = 0;
  if (a.project > b.project) {
    comparison = 1;
  } else if (a.project < b.project) {
    comparison = -1;
  }
  return comparison;
};

export var normaliseDate = date => {
  const old_date = new Date(date);
  const new_date = old_date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return new_date.replace(/[/]/g, ".");
};
