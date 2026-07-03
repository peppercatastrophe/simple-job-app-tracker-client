<template>
  <span class="status-badge" :class="statusClass">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'applied' },
})

const statusClass = computed(() => `status-${props.status}`)

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

<style scoped>
.status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  transition: background 0.2s, color 0.2s;
}

.status-applied {
  background: #ebf4ff;
  color: #2b6cb0;
}

.status-screening {
  background: #fefcbf;
  color: #975a16;
}

.status-interview {
  background: #e9d8fd;
  color: #6b46c1;
}

.status-offer {
  background: #c6f6d5;
  color: #276749;
}

.status-rejected {
  background: #fed7d7;
  color: #9b2c2c;
}

.status-accepted {
  background: #c6f6d5;
  color: #276749;
}

.status-withdrawn {
  background: #e2e8f0;
  color: #4a5568;
}

[data-theme='dark'] .status-applied {
  background: #1a365d;
  color: #90cdf4;
}

[data-theme='dark'] .status-screening {
  background: #5a3e00;
  color: #f6e05e;
}

[data-theme='dark'] .status-interview {
  background: #3c2a6e;
  color: #d6bcfa;
}

[data-theme='dark'] .status-offer {
  background: #0d3b1e;
  color: #9ae6b4;
}

[data-theme='dark'] .status-rejected {
  background: #4a1a1a;
  color: #feb2b2;
}

[data-theme='dark'] .status-accepted {
  background: #0d3b1e;
  color: #9ae6b4;
}

[data-theme='dark'] .status-withdrawn {
  background: #2d3748;
  color: #a0aec0;
}
</style>
