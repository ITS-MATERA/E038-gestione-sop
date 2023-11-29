sap.ui.define(
  ["../BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"],
  function (BaseController, Filter, FilterOperator, JSONModel, formatter, Spreadsheet, exportLibrary) {
    "use strict";

    return BaseController.extend("gestionesop.controller.rag.Detail", {
      formatter: formatter,

      onInit: async function () {
        this.getRouter().getRoute("rag.detail").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: async function (oEvent) {
      },
    });
  })
