sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.create.Scenary1", {
      formatter: formatter,

      onInit: function () {
        var self = this;
        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.create.Scenary1",
        });

        self.setModel(oModelUtility, "Utility");

        this.getRouter().getRoute("amm.create.scenary1").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        self.getRouter().navTo("amm.inputSop", {
          type: this._sTypeSop,
        });
      },

      _onObjectMatched: function (oEvent) {
        var self = this;
        var oArguments = oEvent.getParameter("arguments");

        this._sTypeSop = oArguments.TypeSop;

        self.createModelSop("1");
        self.setFirstSopData(oArguments);
        self.createModelFiltersWizard1();
      },
    });
  }
);
