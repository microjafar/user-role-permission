<template>
    <div class="card" v-for="unit in units" :key="unit.id">
        <h3>{{ unit.name }}</h3>
        <guard :permissions="[unit.name + ' - ' + unit.id]">
            <div>
                <label>Number of Patient</label>
            </div>
            <input type="text">
        </guard>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const auth = computed(() => store.getters['user/auth']);
const units = computed(() => store.getters['unit/getUnits']);

function fetchUnits() {
    store.dispatch('unit/fetchUnits');
}

fetchUnits();
</script>
