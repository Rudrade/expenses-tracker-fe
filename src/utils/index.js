export const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR"
    }).format(value);
};

export const formatDate = (value) => {
    console.log("formatDate", value);
    if (!(value instanceof Date)) return null;

    return value.getFullYear() + "-" + 
        String(value.getMonth() + 1).padStart(2, "0") + "-" + 
        String(value.getDate()).padStart(2, "0");
}