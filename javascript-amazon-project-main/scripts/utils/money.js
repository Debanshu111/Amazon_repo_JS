export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export default formatCurrency; //Each file can have one default export...used for trial here
