<template>
    <div>
        Hello {{ hero.firstName }} {{ hero.lastName }}
    </div>
</template>

<script>
export default {
    name: 'HeroDetail',
    props: {
        hero:{
            type: Object,
            default: () => {},
            required: true,
        },
    },
};
</script>
