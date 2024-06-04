export const parsingCurrencyRupiah = (value: any) => {
  const vals = value ? value?.replace(/[^0-9/]+/g, "") : "";
  return vals
    ? (Math.round(vals * 100) / 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "";
};
