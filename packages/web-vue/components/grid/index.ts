import type { App } from 'vue';
import type { ArcoOptions } from '../_utils/types';
import { setGlobalConfig, getComponentPrefix } from '../_utils/global-config';
import _GridRow from './grid-row.vue';
import _GridCol from './grid-col.vue';
import _Grid from './grid.vue';
import _GridItem from './grid-item.vue';

const Grid = Object.assign(_Grid, {
  Row: _GridRow,
  Col: _GridCol,
  Item: _GridItem,
  install: (app: App, options?: ArcoOptions) => {
    setGlobalConfig(app, options);
    const componentPrefix = getComponentPrefix(options);

    app.component(componentPrefix + _GridRow.name, _GridRow);
    app.component(componentPrefix + _GridCol.name, _GridCol);
    app.component(componentPrefix + _Grid.name, _Grid);
    app.component(componentPrefix + _GridItem.name, _GridItem);
  },
});

export { _GridRow as Row, _GridCol as Col, _GridItem as GridItem };

export default Grid;
