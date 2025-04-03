import axios from "axios"
import { formatDate } from "@/utils";

// ############ AXIOS ###########
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export const listExpenses = (offset, limit, description, category, necessity, startDate, endDate) => {
    console.log("listExpenses", offset, limit, description);
    return axiosInstance.get("/expense", {
        params: {
            offset,
            limit,
            description,
            category,
            necessity,
            startDate,
            endDate
        }
    })
    .then(response => {
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
        return {
            expenses: arrExpenses,
            count: response.data.count
        };
    })
    .catch(error => {
        console.error(error); // TODO: Toast
        throw error;
    })
}

export const createExpense = (description, date, amount, category, necessity) => {
    console.log("createExpense", description, date, amount, category, necessity);
    return axiosInstance.post("/expense", {
        description,
        dateOfCreation: formatDate(date),
        amount,
        category,
        necessity
    })
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        console.error(error); // TODO: Toast
        throw error;
    })
}