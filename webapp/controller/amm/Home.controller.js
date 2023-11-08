sap.ui.define(
  ["./BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.Home", {
      onInit: function () {
        var self = this;

        var oModelFilters = new JSONModel({
          Gjahr: "",
          Zzamministr: "",
          Zragdest: "",
          ZuffCont: "",
          Capitolo: "",
          ZnumsopFrom: "",
          ZnumsopTo: "",
          ZcodStatosop: "",
          ZztipologiaSop: "",
          Ztipopag: "",
          ZspecieSop: "",
          Zricann: "",
          ZdatasopFrom: "",
          ZdatasopTo: "",
          Zdataprot: "",
          Znumprot: "",
          Lifrn: "",
          Witht: "",
          ZzCeberna: "",
        });

        this.getRouter().getRoute("amm.home").attachPatternMatched(this._onObjectMatched, this);
        self.setModel(oModelFilters, "FiltersSop");
      },

      _onObjectMatched: function (oEvent) {
        var self = this;
        var oModel = self.getModel();
        var oModelFilters = self.getModel("FiltersSop");

        this._getEnteBeneficiario();

        oModel.read("/UserParamSet('PRC')", {
          success: function (data) {
            oModelFilters.setProperty("/Zzamministr", data.Parva);
          },
          error: function () {},
        });
      },

      //#region --------------------------VALUE HELP----------------------------

      onValueHelpRagioneria: function () {
        var self = this;
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oFilters = self.getModel("FiltersSop").getData();
        var oModel = self.getModel();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Ragioneria");

        var dCurrentDate = new Date();
        var sCurrentDate = dCurrentDate.getFullYear().toString() + (dCurrentDate.getMonth() + 1).toString() + dCurrentDate.getDate().toString();

        self.setFilterEQ(aFilters, "ANNO", oFilters.Gjahr);
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
        var oModelFilters = self.getModel("FiltersSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Zragdest", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      //#endregion -----------------------VALUE HELP----------------------------

      //#region ---------------------SELECTION CHANGE---------------------------
      onRitenutaChange: function () {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");

        this._getEnteBeneficiario();
        oModelFilters.setProperty("/ZzCeberna", "");
      },

      _getEnteBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oFilters = self.getModel("FiltersSop").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Witht", oFilters?.Witht);

        oModel.read("/EnteBeneficiarioMCSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.setModelCustom("EnteBeneficiario", data?.results);
          },
        });
      },

      //#endregion ------------------SELECTION CHANGE---------------------------
    });
  }
);
