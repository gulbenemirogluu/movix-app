export function currencyFormatter(currency) {
    return (currency)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+'$';
}
