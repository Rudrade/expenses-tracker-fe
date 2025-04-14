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

            arrExpenses.push(formatData(expense));
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

export const createExpense = (id, description, date, amount, category, necessity) => {
    console.log("createExpense", description, date, amount, category, necessity);
    return axiosInstance.post("/expense", {
        id,
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

export const getExpense = (id) => {
    return axiosInstance.get("/expense/" + id)
    .then(response => {
        return formatData(response.data);
    })
}

export const deleteExpense = (id) => {
    return axiosInstance.delete("/expense/" + id)
        .then(response => {
            console.log(response);
            return response.status;
        });
}

export const getRecentExpenses = () => {
    return axiosInstance.get("/expense/recent")
        .then(response => {
            const lst = response.data.expenses;
            
            const arrExpenses = [];
            for (let i = 0; i < response.data.VITE_BACKEND_URLcount; i++) {
                arrExpenses.push(formatData(lst[i]));
            }

            console.log("arrExpenses", arrExpenses)
            return arrExpenses;
        });
}

const formatData = (data) => ({
    id: data.id,
    date: data.dateOfCreation,
    description: data.description,
    amount: data.amount,
    category: data.category,
    necessity: data.necessity
})