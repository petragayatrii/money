<template>
    <button type="button" :class="buttonType == 'add' ? 'btn-btn primary' : 'btn btn-danger'" v-on="$listeners"><slot/></button>

</template>

<script>
export default {
    props: {
        buttonType: {
            type: String,
            default: "add"
        }
    }
}
</script>