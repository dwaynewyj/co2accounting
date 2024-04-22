import { useState, useEffect } from "react";
import { SCOPE_COLORS } from "../util/constants";

const useScope = (inputScopeData) => {
  const initialActiveScopeValue = inputScopeData
    .reduce((acc, item) => acc + item.sum, 0)
    .toFixed(2);

  const [activeScopeValue, setActiveScopeValue] = useState(
    initialActiveScopeValue,
  );
  const [activeScopeColor, setActiveScopeColor] = useState(SCOPE_COLORS[0]);

  const onLegendClick = (event, legendItem) => {
    const index = legendItem.index;

    let meta = event.chart.getDatasetMeta(0);

    meta.data.forEach((segment) => {
      segment.hidden = true;
    });
    meta.data[index].hidden = false;

    const scopeSum = event.chart.data.datasets[0].data[index];
    setActiveScopeValue(scopeSum.toFixed(2));
    setActiveScopeColor(SCOPE_COLORS[index]);

    event.chart.update();
  };

  useEffect(() => {
    const newActiveScopeValue = inputScopeData
      .reduce((acc, item) => acc + item.sum, 0)
      .toFixed(2);
    setActiveScopeValue(newActiveScopeValue);
  }, [inputScopeData]);

  return {
    activeScopeValue,
    activeScopeColor,
    onLegendClick,
  };
};

export default useScope;
