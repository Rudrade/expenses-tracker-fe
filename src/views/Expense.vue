<template>
    <Toast position="top-right" />
    <div style="width: 40%">
        
        <h2 v-if="id === null">Edit expense</h2>
        <h2 v-else>New expense</h2>
        <br/>

        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
            <div class="flex flex-col gap-1">
                <label for="description">Description *</label>
                <InputText id="description" name="description" type="text" fluid placeholder="Insert the expense's description" autocomplete="off"/>
                <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ $form.description.error?.message }}</Message>
            </div>
            <br/>
            <div class="flex flex-col gap-1">
                <label for="date">Date *</label>
                <br/>
                <DatePicker id="date" name="date" placeholder="Pick date" :manualInput="false" dateFormat="dd/mm/yy" />
                <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{ $form.date.error?.message }}</Message>
            </div>
            <br/>
            <div class="flex flex-col gap-1">
                <label for="amount">Amount *</label>
                <InputText id="amount" name="amount" type="text" fluid placeholder="Insert the expense's amount" autocomplete="off"/>
                <Message v-if="$form.amount?.invalid" severity="error" size="small" variant="simple">{{ $form.amount.error?.message }}</Message>
            </div>
            <br/>
            <div class="flex flex-col gap-1">
                <label for="category">Category</label>
                <InputText id="category" name="category" type="text" fluid placeholder="Insert the expense's category" autocomplete="off" />
            </div>
            <br/>
            <div class="flex flex-col gap-1">
                <label for="necessity">Necessity</label>
                <InputText id="necessity" name="necessity" type="text" fluid placeholder="Insert the expense's necessity" autocomplete="off" />
            </div>
            <br/>
            <Button type="submit" severity="secondary" label="Submit" id="submit"/>
        </Form>
    </div>
</template>

<script setup>
import { Form } from "@primevue/forms";
import Button from 'primevue/button';
import { ref } from "vue";
import { InputText, Message } from "primevue";
import DatePicker from 'primevue/datepicker';
import { createExpense } from "@/services/ExpensesService";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const initialValues = ref({
    date: null,
    description: null,
    amount: null,
    category: null,
    necessity: null
});

const props = defineProps(["id"]);

const toast = useToast();

const resolver = ({ values }) => {
    const errors = {};

    if (!values.description) {
        errors.description = [{ message: 'Description is required.' }];
    }

    if (!values.date) {
        errors.date = [{ message: 'Date is required.' }];
    }

    if (!values.amount) {
        errors.amount = [{ message: 'Amount is required.' }];
    } else if (isNaN(values.amount)) {
        errors.amount = [{ message: 'Amount must be a number.' }];
    }

    return {
        errors
    };
};

const onFormSubmit = ({valid, states}) => {
    if (valid) {
        document.getElementById("submit").setAttribute("disabled", "true");

        createExpense(
            states.description?.value,
            states.date?.value,
            states.amount?.value,
            states.category?.value,
            states.necessity?.value
        ).then(response => {
            document.getElementById("submit").removeAttribute("disabled");
            if (response.status === 200) {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Expense created successfully!',
                    life: 3000
                });
            } else {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to create expense.',
                    life: 3000
                });
            }
        })
        .catch(error => {
            document.getElementById("submit").removeAttribute("disabled");
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create expense: ' + error.message,
                life: 3000
            });
        });
    }
}

</script>