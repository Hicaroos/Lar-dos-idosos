<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const navRef = ref<HTMLElement | null>(null);
const sliderStyle = ref<any>({
    left: '0px',
    width: '0px',
    opacity: 0,
});
const isInitialized = ref(false);

const updateSlider = () => {
    if (!navRef.value) return;
    const activeTab = navRef.value.querySelector('[data-active="true"]') as HTMLElement;
    
    if (activeTab) {
        sliderStyle.value = {
            left: `${activeTab.offsetLeft}px`,
            width: `${activeTab.offsetWidth}px`,
            opacity: 1,
        };
        
        if (!isInitialized.value) {
            setTimeout(() => {
                isInitialized.value = true;
            }, 50);
        }
    } else {
        sliderStyle.value.opacity = 0;
    }
};

let observer: MutationObserver;

onMounted(() => {
    nextTick(() => {
        setTimeout(updateSlider, 50);
    });
    
    if (navRef.value) {
        observer = new MutationObserver(updateSlider);
        observer.observe(navRef.value, { attributes: true, attributeFilter: ['data-active'], subtree: true, childList: true });
    }
    window.addEventListener('resize', updateSlider);
});

onUnmounted(() => {
    if (observer) observer.disconnect();
    window.removeEventListener('resize', updateSlider);
});
</script>

<template>
    <nav ref="navRef" class="relative flex items-center gap-1 bg-green-1 p-1.5 rounded-full border border-slate-200/50 w-fit max-w-full overflow-x-auto hide-scrollbar isolate">
        <div 
            class="absolute top-1.5 bottom-1.5 rounded-full bg-emerald-50 shadow-sm ring-1 ring-slate-900/5 ease-[cubic-bezier(0.4,0,0.2,1)] -z-10"
            :class="isInitialized ? 'transition-all duration-300' : ''"
            :style="sliderStyle"
        ></div>
        <slot />
    </nav>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
