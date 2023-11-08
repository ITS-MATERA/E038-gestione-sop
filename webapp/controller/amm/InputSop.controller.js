sap.ui.define(
  ["./BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.InputSop", {
      onInit: function () {
        this.getRouter().getRoute("amm.inputSop").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        self.getRouter().navTo("amm.selectType");
      },

      _onObjectMatched: function () {
        var self = this;
        var oModel = self.getModel();

        var oModelFirstSop = new JSONModel({
          Gjahr: "",
          Zragdest: "",
          Zzamministr: "",
          Fipos: "",
          Fistl: "",
          Zgeber: "",
          ZufficioCont: "",
          DescUfficio: "",
          Zfunzdel: "",
          Zdescriz: "",
          Ztipoprov: "",
          Zautemit: "",
          Zdataprovv: "",
          Znprovv: "",
          Zcausale: "",
        });

        self.getView().setBusy(true);
        oModel.read("/UserParamSet('PRC')", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) return;
            oModelFirstSop.setProperty("/Zzamministr", data.Parva);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });

        oModel.read("/UserParamSet('/PRA/PN_DN_FUNC_AREA')", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) return;
            oModelFirstSop.setProperty("/ZufficioCont", data.Parva);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });

        self.setModel(oModelFirstSop, "FirstSop");
      },

      onValueHelpRagioneria: function () {
        var self = this;
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oFirstSop = self.getModel("FirstSop").getData();
        var oModel = self.getModel();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Ragioneria");

        var dCurrentDate = new Date();
        var sCurrentDate = dCurrentDate.getFullYear().toString() + (dCurrentDate.getMonth() + 1).toString() + dCurrentDate.getDate().toString();

        self.setFilterEQ(aFilters, "ANNO", oFirstSop.Gjahr);
        self.setFilterEQ(aFilters, "FASE", "GEST");
        self.setFilterEQ(aFilters, "LOEKZ", "");
        aFilters.push(new Filter("DATBIS", FilterOperator.GE, sCurrentDate));
        aFilters.push(new Filter("DATAB", FilterOperator.LE, sCurrentDate));
        self.setFilterEQ(aFilters, "MC", "X");
        self.setFilterEQ(aFilters, "REALE", "R");

        oModel.read("/UserParamSet('FIK')", {
          success: function (data) {
            self.setFilterEQ(aFilters, "FIKRS", data.Parva);
          },
          error: function () {},
        });

        self.getView().setBusy(true);

        oModelRagioneria.read("/ZES_RAGIONERIA_SET", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            var aData = data.results;
            var aRagioneria = [];
            aData.map((oData) =>
              aRagioneria.push({
                Zragdest: oData.CODICE_RAGIONERIA,
                // Description: oData.DESCR_ESTESA,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aRagioneria);
            var oSelectDialog = sap.ui.getCore().byId("sdRagioneria");
            oSelectDialog?.setModel(oModelJson, "Ragioneria");
            oDialog.open();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpRagioneriaClose: function (oEvent) {
        var self = this;
        var FirstSop = self.getModel("FirstSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        FirstSop.setProperty("/Zragdest", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },
    });
  }
);
