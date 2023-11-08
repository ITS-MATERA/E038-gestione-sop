sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("gestionesop.controller.Home", {
    onInit: function () {
      this.getRouter().getRoute("home").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      var self = this;

      self.getPermissionSop();
    },
  });
});
