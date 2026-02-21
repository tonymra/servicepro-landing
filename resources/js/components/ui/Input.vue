<script setup lang="ts">
interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    type?: string;
    error?: string;
    required?: boolean;
    id?: string;
}

withDefaults(defineProps<Props>(), {
    type: 'text',
    required: false,
});

defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <label v-if="label" :for="id" class="text-sm font-medium text-neutral-700">
            {{ label }}
            <span v-if="required" class="text-error ml-0.5">*</span>
        </label>
        <input
            :id="id"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :class="[
                'w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 transition-colors duration-150 focus:outline-none focus:ring-2',
                error
                    ? 'border-error bg-red-50 focus:border-error focus:ring-red-200'
                    : 'border-neutral-200 bg-white focus:border-brand-500 focus:ring-brand-100',
            ]"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <p v-if="error" class="text-error text-xs">{{ error }}</p>
    </div>
</template>
