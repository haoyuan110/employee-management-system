<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item)">
      <el-menu-item :index="resolvePath(onlyChild.path)" @click="handleClick">
        <el-icon v-if="onlyChild.meta.icon">
          <component :is="onlyChild.meta.icon" />
        </el-icon>
        <template #title>{{ onlyChild.meta.title }}</template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal } from '@/utils/validate'
import path from 'path-browserify'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyChild = computed(() => {
  if (props.item.children && props.item.children.length === 1) {
    return props.item.children[0]
  }
  return null
})

const hasOneShowingChild = (item) => {
  if (item.children && item.children.length === 1) {
    return true
  }
  return false
}

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

const handleClick = () => {
  // Handle click event if needed
}
</script>
