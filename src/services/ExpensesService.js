import axios from "axios"

// ############ AXIOS ###########
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export const listExpenses = () => (
    axiosInstance.get("/expense")
    .then((response) => {
        const expenses = [];

        for (let i = 0; i < response.data.length; i++) {
            const expense = response.data[i];

            expenses.push({
                date: new Date(expense.dateOfCreation),
                description: expense.description,
                amount: expense.amount,
                category: expense.category,
                necessity: expense.necessity
            });
        }

        console.log("expenses >> ", expenses);

        return expenses;
    })
    .catch((error) => {
        // TODO: HANDLE ERROR
    })
)