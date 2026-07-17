<template>
  <span class="badge rounded-pill" :class="statusClass">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'applied' },
})

const statusColors = {
  applied: 'text-bg-primary',
  screening: 'text-bg-warning',
  interview: 'text-bg-info',
  offer: 'text-bg-success',
  rejected: 'text-bg-danger',
  accepted: 'text-bg-success',
  withdrawn: 'text-bg-secondary',
}

const statusClass = computed(() => statusColors[props.status] || 'text-bg-secondary')

const label = computed(() => {
  const labels = {
    applied: 'Applied',
    screening: 'Screening',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
    accepted: 'Accepted',
    withdrawn: 'Withdrawn',
  }
  return labels[props.status] || props.status
})
</script>
