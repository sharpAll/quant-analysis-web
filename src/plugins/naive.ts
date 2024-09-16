import type { App } from "vue";
import {
  create,
  NMessageProvider,
  NDialogProvider,
  NGrid,
  NGridItem,
  NSpace,
  NButton,
  NIcon,
  NDropdown,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch,
  NCheckboxGroup,
  NCheckbox,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NMenu,
  NScrollbar,
  NTabs,
  NTabPane,
  NTree,
  NCard,
} from "naive-ui";
import "vfonts/Lato.css";

const naive = create({
  components: [
    NMessageProvider,
    NDialogProvider,
    NGrid,
    NGridItem,
    NSpace,
    NButton,
    NIcon,
    NDropdown,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NSelect,
    NSwitch,
    NCheckboxGroup,
    NCheckbox,
    NDataTable,
    NDrawer,
    NDrawerContent,
    NMenu,
    NScrollbar,
    NTabs,
    NTabPane,
    NTree,
    NCard,
  ],
});

export function installNaiveUI(app: App<Element>) {
  app.use(naive);
}
