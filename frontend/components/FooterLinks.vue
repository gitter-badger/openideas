<template lang="pug">
ul.links
  li(v-for='link in links')
    a(v-if='isExternal(link.to)' :href='link.to') {{ link.name }}
    router-link(v-else :to='link.to') {{ link.name }}

</template>

<script>
export default {
  props: {
    links: Array,
  },
  methods: {
    isExternal(to) {
      return to.startsWith('https://') || to.startsWith('http://');
    },
  },
};
</script>

<style lang="scss" scoped>
.links {
  padding: 0;
}

.links li {
  display: inline-block;
  font-size: small;
  font-weight: 300;
  &:not(:last-child) {
    padding-right: 1.3rem;
  }
}
a {
  color: white;
  &.active {
    text-decoration: none;
  }
}

ul {
  margin-left: 0;
}
</style>
