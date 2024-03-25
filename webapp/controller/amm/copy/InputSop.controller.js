sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/json/JSONModel", "../../../model/formatter"],
  function (BaseAmministrazioneController, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.copy.InputSop", {
      formatter: formatter,

      onInit: function () {
        var self = this;
        this.getRouter().getRoute("amm.copy.inputSop").attachPatternMatched(this._onObjectMatched, this);

        self.acceptOnlyTotChar("cbxGjahr", 4);
      },

      onNavBack: function () {
        var self = this;
        self.getRouter().navTo("amm.home");
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;
        var oParameters = oEvent.getParameter("arguments");
        var oRadioButton = self.getView().byId("rbSceltaOperativa");
        var oModelParameters = new JSONModel(oParameters)

        self.setModel(oModelParameters, "Parameters")
        self.checkPermissions("A", "Copia");
        self.setModelSop(oParameters);

        if (oParameters.Ztipopag === '1' || oParameters.Ztipopag === '3') {
          oRadioButton.setSelectedIndex(0)
        } else {
          oRadioButton.setSelectedIndex(1)
        }
      },

      onNavForward: async function () {
        var self = this;
        var oSop = self.getModel("Sop").getData()
        var oParameters = self.getModel("Parameters").getData()

        var oParameters = {
          Gjahr: oParameters.Gjahr,
          Zchiavesop: oParameters.Zchiavesop,
          Bukrs: oParameters.Bukrs,
          Zstep: oParameters.Zstep,
          Ztipososp: oParameters.Ztipososp,
          NewGjahr: oSop.Gjahr
        }

        self.getRouter().navTo("amm.copy.scenary" + oSop.Ztipopag, oParameters);
      },

    });
  }
);
