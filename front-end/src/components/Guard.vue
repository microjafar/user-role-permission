<template>
    <slot v-if="isAccess"></slot>
</template>
  
<script setup>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    permissions: {
        type: Array,
        default: () => []
    }
});
const { permissions } = toRefs(props);
const store = useStore();
const auth = computed(() => store.getters['user/auth']);
const isAccess = computed(() => {
    /* if user role is admin route will not check the permissions  */
    const is_admin = auth.value.user.roles.find(
        (role) => role.name.toLowerCase() === "admin"
    );
    if (is_admin) return true;
    return permissions.value.filter(p => auth.value.user.permissions.includes(p)).length > 0
});
</script>