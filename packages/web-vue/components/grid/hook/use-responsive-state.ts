import { ref, computed, Ref, watchEffect } from 'vue';
import { isObject } from '../../_utils/is';
import ResponsiveObserve, {
  responsiveArray,
  ScreenMap,
} from '../../_utils/responsive-observe';
import { ResponsiveValue } from '../interface';

function isResponsiveValue(
  val: number | ResponsiveValue
): val is ResponsiveValue {
  return isObject(val);
}

export function useResponsiveState(
  val: Ref<number | ResponsiveValue>,
  defaultVal: number
) {
  const screens = ref<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });
  const result = computed(() => {
    let res = defaultVal;
    if (isResponsiveValue(val.value)) {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i];
        if (screens.value[breakpoint] && val.value[breakpoint] !== undefined) {
          res = val.value[breakpoint] as number;
          break;
        }
      }
    } else {
      res = val.value;
    }
    return res;
  });

  watchEffect((onCleanup) => {
    if (isResponsiveValue(val.value)) {
      const subscribeToken = ResponsiveObserve.subscribe((screensVal) => {
        screens.value = screensVal;
      });
      onCleanup(() => {
        ResponsiveObserve.unsubscribe(subscribeToken);
      });
    }
  });

  return result;
}
