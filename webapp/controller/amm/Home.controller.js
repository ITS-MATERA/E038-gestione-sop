sap.ui.define(
  ["./BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.Home", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelFilters = new JSONModel({
          Gjahr: "",
          Zzamministr: "",
          Zragdest: "",
          ZufficioCont: "",
          Capitolo: "",
          ZnumsopFrom: "",
          ZnumsopTo: "",
          ZcodStatosop: "99",
          ZztipologiaSop: "0",
          Ztipopag: "TUTTI",
          ZspecieSop: "0",
          Zricann: "NO",
          ZdatasopFrom: null,
          ZdatasopTo: null,
          Zdataprot: null,
          Znumprot: "",
          Lifnr: "",
          Witht: "",
          ZzCeberna: "",
          FiposFrom: "",
          FiposTo: "",
          Fistl: "",
          ZnumliqFrom: "",
          ZnumliqTo: "",
          ZdescProsp: "",
        });

        this.getRouter().getRoute("amm.home").attachPatternMatched(this._onObjectMatched, this);
        self.setModel(oModelFilters, "FiltersSop");
      },

      _onObjectMatched: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelFilters = self.getModel("FiltersSop");

        if (!self.getModel("AuthorityCheck")) {
          self.getPermissionSop();
        }

        self.getView().setBusy(true);

        oModel.read("/UserParamSet('PRC')", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) return;
            oModelFilters.setProperty("/Zzamministr", data.Parva);
          },
          error: function () {
            self.getView().setBusy(false);
          },
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

      onValueHelpEnteBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oFilters = self.getModel("FiltersSop").getData();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.EnteBeneficiario");

        self.setFilterEQ(aFilters, "Witht", oFilters?.Witht);
        self.getView().setBusy(true);

        oModel.read("/EnteBeneficiarioMCSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("EnteBeneficiario", data, "sdEnteBeneficiario", oDialog);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpEnteBeneficiarioClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/ZzDescebe", self.setBlank(oSelectedItem?.getTitle()));
        oModelFilters.setProperty("/ZzCebenra", self.setBlank(oSelectedItem?.data("key")));
        self.unloadFragment();
      },

      //#endregion -----------------------VALUE HELP----------------------------

      //#region ---------------------SELECTION CHANGE---------------------------
      onRitenutaChange: function () {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");

        oModelFilters.setProperty("/ZzCeberna", "");
      },

      //#endregion ------------------SELECTION CHANGE---------------------------

      onSearch: function () {
        var self = this;
        var oModel = self.getModel();
        var oAuthorityCheck = self.getModel("AuthorityCheck").getData();
        var aFilters = this._setFilters();

        self.getView().setBusy(true);

        oModel.read("/SopAmministrazioneSet", {
          urlParameters: {
            AgrName: oAuthorityCheck.AgrName,
            Fikrs: oAuthorityCheck.Fikrs,
            Prctr: oAuthorityCheck.Prctr,
          },
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self
              .getView()
              .byId("pnlListSop")
              .setVisible(data.results.length > 0);
            self.setModel(new JSONModel(data.results), "ListSop");
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      _setFilters: function () {
        var self = this;
        var oFilters = self.getModel("FiltersSop").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Gjahr", oFilters.Gjahr);
        self.setFilterEQ(aFilters, "Zzamministr", oFilters.Zzamministr);
        self.setFilterEQ(aFilters, "Zragdest", oFilters.Zragdest);
        self.setFilterEQ(aFilters, "Capitolo", oFilters.Capitolo);
        self.setFilterEQ(aFilters, "ZufficioCont", oFilters.ZufficioCont);
        self.setFilterBT(aFilters, "Znumsop", oFilters.ZnumsopFrom, oFilters.ZnumsopTo);
        self.setFilterEQ(aFilters, "ZcodStatosop", oFilters.ZcodStatosop);
        self.setFilterEQ(aFilters, "ZztipologiaSop", oFilters.ZcodStatosop);
        self.setFilterEQ(aFilters, "Ztipopag", oFilters.Ztipopag);
        self.setFilterEQ(aFilters, "ZspecieSop", oFilters.ZspecieSop);
        if (oFilters.Zricann === "SI") {
          aFilters.push(new Filter("Zricann", FilterOperator.NE, ""));
        } else {
          aFilters.push(new Filter("Zricann", FilterOperator.EQ, ""));
        }
        self.setFilterBT(aFilters, "Zdatasop", formatter.UTCRome(oFilters.ZdatasopFrom), formatter.UTCRome(oFilters.ZdatasopTo));
        self.setFilterEQ(aFilters, "Zdataprot", formatter.UTCRome(oFilters.Zdataprot));
        self.setFilterEQ(aFilters, "Znumprot", oFilters.Znumprot);
        self.setFilterEQ(aFilters, "Lifnr", oFilters.Lifnr);
        self.setFilterEQ(aFilters, "Witht", oFilters.Witht);
        self.setFilterEQ(aFilters, "ZzCebenra", oFilters.ZzCebenra);
        self.setFilterBT(aFilters, "Fipos", oFilters.FiposFrom, oFilters.FiposTo);
        self.setFilterEQ(aFilters, "Fistl", oFilters.Fistl);
        self.setFilterBT(aFilters, "Znumliq", oFilters.ZnumliqFrom, oFilters.ZnumliqTo);
        self.setFilterCP(aFilters, "ZdescProsp", oFilters.ZdescProsp);

        return aFilters;
      },

      onRegisterSop: function () {
        var self = this;
        self.getView().byId("tblListSop").removeSelections(true);
        self.getRouter().navTo("amm.selectType");
      },
    });
  }
);
