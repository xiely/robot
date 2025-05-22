<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip v-if="search" class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip v-if="download" content="下载" placement="top">
              <el-button  circle  icon="Download" @click="handleDownload"></el-button>
            </el-tooltip>
      <el-tooltip v-if="size" class="item" effect="dark" content="行高设置" placement="top">
        <el-dropdown placement="bottom" @command="handleSetSize" style="margin: 0 10px ">
            <el-button circle > <svg-icon icon-class="column-height" /> </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">
                 {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip v-if="columns" class="item" effect="dark" content="显示/隐藏列" placement="top">
        <div class="show-btn">
          <el-popover placement="bottom" trigger="click">
            <div class="tree-header">显示/隐藏列</div>
            <el-tree
              ref="columnRef"
              :data="columns"
              show-checkbox
              node-key="key"
              :props="{ label: 'label', children: 'children' } as any"
              @check="columnChange"
            >
              <template #default="{ node, data }"> <span>{{ node.label }}</span></template>
            </el-tree>
            <template #reference>
              <el-button circle icon="Menu" />
            </template>
          </el-popover>
        </div>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { propTypes } from '@/utils/propTypes';


const props = defineProps({
  showSearch: propTypes.bool.def(true),
  download: propTypes.bool.def(false),
  columns: propTypes.fieldOption,
  search: propTypes.bool.def(true),
  gutter: propTypes.number.def(10),
  size: propTypes.string.def('default')
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const columnRef = ref<ElTreeInstance>();
const emits = defineEmits(['update:showSearch', 'queryTable', 'update:size', 'download']);

const style = computed(() => {
  const ret: any = {};
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`;
  }
  return ret;
});

// 搜索
function toggleSearch() {
  emits('update:showSearch', !props.showSearch);
}

// 刷新
function refresh() {
  emits('queryTable');
}

// 更改数据列的显示和隐藏
function columnChange(...args: any[]) {
  props.columns?.forEach((item) => {
    item.visible = args[1].checkedKeys.includes(item.key);
  });
}

const sizeOptions = ref([
  { label: '默认', value: 'medium' },
  { label: '中等', value: 'small' },
  { label: '紧凑', value: 'mini' }
]);

const handleSetSize = (sizeStr: 'medium' | 'small' | 'mini') => {
  console.log(sizeStr, "SSSSSSSSSS")
  emits('update:size', sizeStr);
};

const handleDownload = () => {
  emits('download')
};

// 显隐列初始默认隐藏列
onMounted(() => {
  props.columns?.forEach((item) => {
    if (item.visible) {
      columnRef.value?.setChecked(item.key, true, false);
      // value.value.push(item.key);
    }
  });
});
</script>

<style lang="scss" scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}

:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}

.tree-header {
  width: 100%;
  line-height: 24px;
  text-align: center;
}

.show-btn {
  margin-left: 12px;
}
</style>
