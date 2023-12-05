sap.ui.define(["./BaseAmministrazioneController"], function (BaseAmministrazioneController) {
  "use strict";

  return BaseAmministrazioneController.extend("gestionesop.controller.amm.SelectType", {
    onInit: function () {
      this.getRouter().getRoute("amm.selectType").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function () {
      var self = this;
      self.checkPermissions("A", "Registra")
    },

    onNavBack: function () {
      var self = this;
      self.getRouter().navTo("amm.home");
    },

    onDocumentiCosto: function () {
      var self = this;
      self.getRouter().navTo("amm.inputSop", {
        type: 1,
      });
    },

    onNoDocumentiCosto: function () {
      var self = this;
      self.getRouter().navTo("amm.inputSop", {
        type: 2,
      });
    },
  });
});
