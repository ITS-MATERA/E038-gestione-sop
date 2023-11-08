sap.ui.define(["./BaseAmministrazioneController"], function (BaseAmministrazioneController) {
  "use strict";

  return BaseAmministrazioneController.extend("gestionesop.controller.amm.SelectType", {
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
