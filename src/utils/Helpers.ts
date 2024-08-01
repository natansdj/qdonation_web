export const parsingCurrencyRupiah = (value: any) => {
  const vals = value ? value?.replace(/[^0-9/]+/g, "") : "";
  return vals
    ? (Math.round(vals * 100) / 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "";
};

export const generateRandomTimestamp = () => {
  const timestamp = Date.now(); 
  const randomNum = Math.floor(Math.random() * 1000000); 
  return `${timestamp}${randomNum}`; 
};