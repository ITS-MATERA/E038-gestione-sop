sap.ui.define(["./BaseAmministrazioneController"], function (BaseAmministrazioneController) {
  "use strict";

  return BaseAmministrazioneController.extend("gestionesop.controller.amm.SelectType", {
    onNavBack: function () {
      var self = this;
      self.getRouter().navTo("amm.Home");
    },

    onDocumentiCosto: function () {
      var self = this;
      self.getRouter().navTo("amm.create.InputSop", {
        Type: 1,
      });
    },

    onNoDocumentiCosto: function () {
      var self = this;
      self.getRouter().navTo("amm.create.InputSop", {
        Type: 2,
      });
    },
  });
});
