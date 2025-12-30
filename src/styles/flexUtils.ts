const responsiveConfig = {
  justifyReponsiveFlexStart: {
    justifyContent: { xs: "center", sm: "flex-start" },
  },
  directionRowToCol: { flexDirection: { xs: "column", md: "row" } },
  justifyReponsiveFlexEnd: { justifyContent: { xs: "center", md: "end" } },
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function createFlexStyle(
  justifyContent: string | object = "center",
  alignItems: string | object = "center",
  flexDirection: string | object = "row",
  flexWrap: string | object = "nowrap",
  responsive = {}
): Record<string, any> {
  return {
    display: "flex",
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    ...responsive,
  };
}

export const flexUtils = {
  flexCenter: createFlexStyle("center", "center"),
  flexEnd: createFlexStyle("flex-end", "center"),
  flexColCenter: createFlexStyle("center", "center", "column"),
  flexSpaceBetween: createFlexStyle("space-between", "center"),
  flexColAlignStart: createFlexStyle("flex-start", "flex-start", "column"),
  flexWrap: { display: "flex", flexWrap: "wrap" },
  flex: { display: "flex" },
  flexJustifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
  flexJustifyEnd: {
    display: "flex",
    justifyContent: "end",
  },
  flexAlignCenter: {
    display: "flex",
    alignItems: "center",
  },
  flexJustifyBetween: { display: "flex", justifyContent: "space-between" },
  flexAlignCenterCol: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  flexJustifyBetweenColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxFlexWrapCenter: createFlexStyle("center", "center", "row", "wrap"),
  boxFlexWrapCenterResponsive: createFlexStyle(
    "center",
    "center",
    "row",
    {
      xs: "wrap",
      md: "nowrap",
    },
    {
      ...responsiveConfig.justifyReponsiveFlexStart,
    }
  ),
  flexResponsive: createFlexStyle("center", "center", "row", "nowrap", {
    ...responsiveConfig.directionRowToCol,
    ...responsiveConfig.justifyReponsiveFlexEnd,
  }),
  flexUploadCustom: createFlexStyle("center", "center", "row", "nowrap", {
    ...responsiveConfig.directionRowToCol,
  }),
  flexListBoxCustom: createFlexStyle("space-between", "center", "row", "wrap", {
    ...responsiveConfig.directionRowToCol,
  }),
  flexSpaceBetweenReponsive: createFlexStyle(
    "space-between",
    "center",
    "row",
    "nowrap",
    {
      ...responsiveConfig.directionRowToCol,
    }
  ),
};
