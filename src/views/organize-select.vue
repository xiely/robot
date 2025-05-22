<template>
  <div class="top-organize">
      <div class="item">
        <div v-if="!userStore.filterOrganize" class="img" @click="handleFilter(true)"></div>
        <div v-else class="img-fill" @click="handleFilter(false)"></div>
      </div>
      <div class="item">
        <el-tree-select
          v-model="userStore.organize"
          lazy
          :load="load"
          :props="props"
          :cache-data="cacheData"
          :check-strictly=true
          style="width: 240px"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="item">
        <el-checkbox v-model="userStore.containTreeOrganize" label="含子组织" size="large" @change="getList()"/>
      </div>
     </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const cacheData = [{ value: 5, label: '节点5' }]
const props = {
  label: 'label',
  children: 'children',
  isLeaf: 'isLeaf',
}
let id = 0;

const load = (node, resolve) => {
  if (node.isLeaf) return resolve([])
  setTimeout(() => {
    resolve([
      {
        value: ++id,
        label: `节点${id}`,
      },
      {
        value: ++id,
        label: `节点${id}`,
        isLeaf: true,
      },
    ])
  }, 400)
}

const handleNodeClick = (node, data) => {
  setTimeout(() => {
    userStore.setOrganize(node.label)
  }, 300);
};

// 获取组织树
const getList = () => {

}

const handleFilter = (flag: boolean) => {
  userStore.setFilterOrganize(flag)
  getList()
}


</script>
<style lang="scss">
.top-organize {

  .item {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;

    .img {
      width: 30px;
      height: 30px;
      background: url(@/assets/images/filter.png);
      background-size: contain;
      cursor: pointer;
    }

    .img-fill {
      width: 30px;
      height: 30px;
      background: url(@/assets/images/filter-fill.png);
      background-size: contain;
      cursor: pointer;
    }
  }
}
</style>
