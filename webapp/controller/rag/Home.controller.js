sap.ui.define(
  ["../BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"],
  function (BaseController, Filter, FilterOperator, JSONModel, formatter, Spreadsheet, exportLibrary) {
    "use strict";

    return BaseController.extend("gestionesop.controller.rag.Home", {
      formatter: formatter,

      onInit: async function () {
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
          ZspecieSop: "0",
          ZdatasopFrom: null,
          ZdatasopTo: null,
          Zdataprotrgs: null,
          Znumprotrgs: "",
          Lifnr: "",
          Witht: "",
          ZzCeberna: "",
          FiposFrom: "",
          FiposTo: "",
          Fistl: "",
        });

        this.getRouter().getRoute("rag.home").attachPatternMatched(this._onObjectMatched, this);
        self.setModel(oModelFilters, "FiltersHome");
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersHome");
        var oUrlParameters = oEvent.getParameter("arguments");

        var oModelUtility = new JSONModel({
          SelectedItems: [],
          EnabledBtnDetail: false,
        })
        self.setModel(oModelUtility, "Utility")

        oModelFilters.setProperty("/Zzamministr", await self.getPrc())
        await self.getPermissionSop();

        if (oUrlParameters.Reload === "true" && oModelFilters.getProperty("/Gjahr")) {
          this._getListSop()
        }

      },

      //#region ---------------------VALUE HELP---------------------------------

      onValueHelpRagioneria: function () {
        var self = this;
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oFilters = self.getModel("FiltersHome").getData();
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
          error: function () { },
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
        var oModelFilters = self.getModel("FiltersHome");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Zragdest", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      onValueHelpEnteBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oFilters = self.getModel("FiltersHome").getData();
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
        var oModelFilters = self.getModel("FiltersHome");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/ZzDescebe", self.setBlank(oSelectedItem?.getTitle()));
        oModelFilters.setProperty("/ZzCebenra", self.setBlank(oSelectedItem?.data("key")));
        self.unloadFragment();
      },

      //#endregion ------------------VALUE HELP---------------------------------

      //#region ---------------------SELECTION CHANGE---------------------------
      onRitenutaChange: function () {
        var self = this;
        var oModelFilters = self.getModel("FiltersHome");

        oModelFilters.setProperty("/ZzCeberna", "");
      },

      //#endregion ------------------SELECTION CHANGE---------------------------

      //#region ---------------------METHODS------------------------------------

      _getListSop: function () {
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
            Ragioneria: "X"
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
        var oFilters = self.getModel("FiltersHome").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Gjahr", oFilters.Gjahr);
        self.setFilterEQ(aFilters, "Zzamministr", oFilters.Zzamministr);
        self.setFilterEQ(aFilters, "Zragdest", oFilters.Zragdest);
        self.setFilterEQ(aFilters, "Capitolo", oFilters.Capitolo);
        self.setFilterEQ(aFilters, "ZufficioCont", oFilters.ZufficioCont);
        self.setFilterBT(aFilters, "Znumsop", oFilters.ZnumsopFrom, oFilters.ZnumsopTo);
        self.setFilterEQ(aFilters, "ZcodStatosop", oFilters.ZcodStatosop);
        self.setFilterEQ(aFilters, "ZztipologiaSop", oFilters.ZztipologiaSop);
        self.setFilterEQ(aFilters, "ZspecieSop", oFilters.ZspecieSop);
        self.setFilterBT(aFilters, "Zdatasop", formatter.UTCRome(oFilters.ZdatasopFrom), formatter.UTCRome(oFilters.ZdatasopTo));
        self.setFilterEQ(aFilters, "Zdataprotrgs", formatter.UTCRome(oFilters.Zdataprot));
        self.setFilterEQ(aFilters, "Znumprotrgs", oFilters.Znumprot);
        self.setFilterEQ(aFilters, "Lifnr", oFilters.Lifnr);
        self.setFilterEQ(aFilters, "Witht", oFilters.Witht);
        self.setFilterEQ(aFilters, "ZzCebenra", oFilters.ZzCebenra);
        self.setFilterBT(aFilters, "Fipos", oFilters.FiposFrom, oFilters.FiposTo);
        self.setFilterEQ(aFilters, "Fistl", oFilters.Fistl);

        return aFilters;
      },

      //#endregion ------------------METHODS------------------------------------

      onSearch: function () {
        this._getListSop()
      },

      onExport: function () {
        var oSheet;
        var self = this;

        var oTable = self.getView().byId("tblListSop");
        var oTableModel = oTable.getModel("ListSop");

        var aCols = this._createColumnConfig();
        var oSettings = {
          workbook: {
            columns: aCols,
          },
          dataSource: oTableModel.getData(),
          fileName: "Lista SOP.xlsx",
        };

        oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      onDetail: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oTableSop = self.getView().byId("tblListSop");
        oTableSop.removeSelections(true);

        var oSelectedItem = oModelUtility.getProperty("/SelectedItems")[0];
        oModelUtility.setProperty("/SelectedItems", []);

        var oParameters = {
          Gjahr: oSelectedItem.Gjahr,
          Zchiavesop: oSelectedItem.Zchiavesop,
          Bukrs: oSelectedItem.Bukrs,
          Zstep: oSelectedItem.Zstep,
          Ztipososp: oSelectedItem.Ztipososp,
        };

        self.getRouter().navTo("rag.detail", oParameters);
      },

      onSelectedItem: function (oEvent) {
        var self = this;
        var bSelected = oEvent.getParameter("selected");
        var oModelUtility = self.getModel("Utility");
        var oTableSop = self.getView().byId("tblListSop");
        var oModelTableSop = oTableSop.getModel("ListSop");

        oModelUtility.setProperty("/SelectedItems", []);
        var aSelectedItems = oModelUtility.getProperty("/SelectedItems");
        var aListItems = oEvent.getParameter("listItems");

        aListItems.map((oListItem) => {
          var oSelectedItem = oModelTableSop.getObject(
            oListItem.getBindingContextPath()
          );

          if (bSelected) {
            aSelectedItems.push(oSelectedItem);
          } else {
            var iIndex = aSelectedItems.findIndex((obj) => {
              return (
                obj.Gjahr === oSelectedItem.Gjahr &&
                obj.Zchiavesop === oSelectedItem.Zchiavesop &&
                obj.Bukrs === oSelectedItem.Bukrs &&
                obj.Zstep === oSelectedItem.Zstep &&
                obj.Ztipososp === oSelectedItem.Ztipososp
              );
            });

            if (iIndex > -1) {
              aSelectedItems.splice(iIndex, 1);
            }
          }
        });

        oModelUtility.setProperty("/EnabledBtnDetail", aSelectedItems.length === 1);
        sap.ui.getCore().setModel(new JSONModel(aSelectedItems), "SelectedItems");
        oModelUtility.setProperty("/SelectedItems", aSelectedItems);
      },

      _createColumnConfig: function () {
        const EDM_TYPE = exportLibrary.EdmType;
        var self = this;
        var oBundle = self.getResourceBundle();
        var aCols = [
          {
            label: oBundle.getText("labelChiaveSop"),
            property: "Zchiavesop",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelDataFirma"),
            property: "DataStato",
            type: EDM_TYPE.Date,
            format: "dd.mm.yyyy",
          },
          {
            label: oBundle.getText("labelDenomBenDocCostoBrev"),
            property: "DescLifnr",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelRitenuta"),
            property: "DescWitht",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelEnteBeneficiario"),
            property: "ZzDescebe",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelImporto"),
            property: "Zimptot",
            type: EDM_TYPE.Number,
            scale: 2,
            delimiter: true,
          },
          {
            label: oBundle.getText("labelCausale"),
            property: "Zcausale",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelTipoSop"),
            property: "DescTipologia",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelStatoSop"),
            property: "DescStatosop",
            type: EDM_TYPE.String,
          },
        ];

        return aCols;
      },
    });
  }
);
