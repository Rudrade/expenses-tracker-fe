import axios from "axios"

// ############ AXIOS ###########
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export const listExpenses = (data, callback, settings) => {
    console.log("%c #####", "color: red");
    console.log("Data received:", data);       // Log the `data` object
    console.log("Settings:", settings);       // Log the `settings` object for pagination info
    console.log("Start:", settings._iDisplayStart); // Check if `start` is passed
    console.log("Length:", settings._iDisplayLength); // Check if `length` is passed
    console.log("Draw:", settings.iDraw);
    console.log("%c #####", "color: red");

    axiosInstance.get("/expense", {
        params: {
            offset: settings._iDisplayStart, // current page offset
            limit: settings._iDisplayLength, // number of records per page
        }
    })
    .then((response) => {
        console.log(response);
        const arrExpenses = [];
        for (let i = 0; i < response.data.expenses.length; i++) {
            const expense = response.data.expenses[i];

            arrExpenses.push({
                id: expense.id,
                date: expense.dateOfCreation,
                description: expense.description,
                amount: expense.amount,
                category: expense.category,
                necessity: expense.necessity
            });
        }

        const obj = {
            draw: settings.iDraw,
            recordsTotal: response.data.count,
            recordsFiltered: response.data.count,
            data: arrExpenses
        };
        console.log(obj)
        callback(obj);
    })
    .catch((error) => {
        console.error(error); // TODO: Toast
    })
}