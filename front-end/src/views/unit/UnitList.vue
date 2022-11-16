<template>
    <h2>Unit List</h2>
    <form @submit.prevent="submit()">
        <div>
            <label>Name: </label>
            <input type="text" v-model="form_data.name">
            <span class="input-feedback">{{ error.name }}</span>
        </div>
        <input type="submit">
        <input v-if="form_data.id" type="button" value="Clear" @click="clearFormData()">
        <span>{{ error_message }}</span>
    </form>
    <guard :permissions="['User Create']">
        <h2>Unit List</h2>
    </guard>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(unit, index) in units" :key="unit.id">
                <td>{{ index + 1 }}.</td>
                <td>{{ unit.name }}</td>
                <td>
                    <input type="button" value="Edit" @click="editUnit(unit.id)">
                    <input type="button" value="Delete" @click="deleteUnit(unit.id)">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const form_data = ref({
    id: null,
    name: '',
});
const error = ref({});
const error_message = ref('');

const units = computed(() => store.getters['unit/getUnits']);
const unit = computed(() => store.getters['unit/getUnit']);

async function submit() {
    if (validateFormData()) {
        console.log('submit');
        if (form_data.value.id) {
            await store.dispatch('unit/updateUnit', form_data.value);
        } else {
            await store.dispatch('unit/createUnit', form_data.value);
        }
        if (unit.value.id) {
            clearFormData();
            fetchUnits();
        }
    }
}

function clearFormData() {
    form_data.value.id = null;
    form_data.value.name = '';
}

function fetchUnits(){
    store.dispatch('unit/fetchUnits');
}

fetchUnits();


function editUnit(id) {
    const current_unit = units.value.find(unit => unit.id === id)
    if (current_unit) {
        form_data.value.id = current_unit.id;
        form_data.value.name = current_unit.name;
    }
}

async function deleteUnit(id) {
    await store.dispatch('unit/deleteUnit', id);
}


function validateFormData() {

    clearErrors();

    if (!form_data.value.name) {
        error.value.name = 'Name is required';
    }

    // get error values only in array 
    const error_values = Object.values(error.value);

    // check zero error value 
    if (error_values.length === 0) {
        return true;
    }
    return false;

}

function clearErrors() {
    error.value = {};
    error_message.value = '';
}
</script>

