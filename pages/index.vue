<template>
    <div>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCookie, navigateTo } from 'nuxt/app'

onMounted(() => {
    const Cookie: any = useCookie('account')
    if (Cookie.value == undefined) {
        navigateTo('/login')
    }
})
</script>