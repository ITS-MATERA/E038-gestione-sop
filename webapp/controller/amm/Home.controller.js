sap.ui.define(
  ["./BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, Spreadsheet, exportLibrary) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.Home", {
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

        self.acceptOnlyTotChar("cbxEsercizio", 4)
        self.acceptOnlyTotChar("cbxStatoSop", 60)
        self.acceptOnlyTotChar("cbxTipoSop", 60)
        self.acceptOnlyTotChar("cbxTipoTipoloSop", 255)
        self.acceptOnlyTotChar("cbxSpecieSop", 60)
        self.acceptOnlyTotChar("cbxRichAnnullamento", 2)
        self.acceptOnlyTotChar("cbxRitenuta", 40)
        self.acceptOnlyNumber("iptZnumprot")
        self.acceptOnlyNumber("iptBeneficiario")
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");
        var oUrlParameters = oEvent.getParameter("arguments");
        self.checkPermissions("A")

        var oModelUtility = new JSONModel({
          SelectedItems: [],
          EnabledBtnDetail: false,
          EnabledBtnCopy: false
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

      onValueHelpAmministrazione: function () {
        var self = this
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Amministrazione");

        self.getView().setBusy(true)

        oModelRagioneria.read("/ZES_AMMINISTRAZIONE_SET", {
          success: function (data) {
            var aData = data.results;
            var aAmministrazione = [];
            aData.map((oData) =>
              aAmministrazione.push({
                Zzamministr: oData.PRCTR,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aAmministrazione);
            var oSelectDialog = sap.ui.getCore().byId("sdAmministrazione");
            oSelectDialog?.setModel(oModelJson, "Amministrazione");
            oDialog.open();
            self.getView().setBusy(false)
          },
          error: function () {
            self.getView().setBusy(false)
          }
        })
      },

      onValueHelpAmministrazioneClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Zzamministr", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      onValueHelpCapitolo: function () {
        var self = this
        var oModelRagioneria = self.getModel("ZSS4_CO_GEST_TIPOLOGICHE_SRV");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Capitolo");

        self.getView().setBusy(true)

        oModelRagioneria.read("/ZES_CAPITOLO_SET", {
          success: function (data) {
            var aData = data.results;
            var aCapitolo = [];
            aData.map((oData) =>
              aCapitolo.push({
                Capitolo: oData.CODICE_CAPITOLO,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aCapitolo);
            var oSelectDialog = sap.ui.getCore().byId("sdCapitolo");
            oSelectDialog?.setModel(oModelJson, "Capitolo");
            oDialog.open();
            self.getView().setBusy(false)
          },
          error: function () {
            self.getView().setBusy(false)
          }
        })
      },

      onValueHelpCapitoloClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Capitolo", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      //#endregion ------------------VALUE HELP---------------------------------

      //#region ---------------------SELECTION CHANGE---------------------------
      onRitenutaChange: function () {
        var self = this;
        var oModelFilters = self.getModel("FiltersSop");

        oModelFilters.setProperty("/ZzCeberna", "");
      },

      onFiposChange: function (oEvent) {
        var self = this;
        var sProperty = oEvent.getSource().data("property")

        var oModelFiltersSop = self.getModel("FiltersSop")
        oModelFiltersSop.setProperty("/" + sProperty, oEvent.getParameter("value"))
      },

      onFistlChange: function (oEvent) {
        var self = this;

        var oModelFiltersSop = self.getModel("FiltersSop")
        oModelFiltersSop.setProperty("/Fistl", oEvent.getParameter("value"))
      },

      onBeneficiarioChange: function (oEvent) {
        var self = this

        var oModelFiltersSop = self.getModel("FiltersSop")
        oModelFiltersSop.setProperty("/Lifnr", oEvent.getParameter("value"))
      },

      onAmministrazioneChange: function (oEvent) {
        var self = this

        var oModelFiltersSop = self.getModel("FiltersSop")
        oModelFiltersSop.setProperty("/Zzamministr", oEvent.getParameter("value"))
      },

      onNProspLiquidazioneChange: function (oEvent) {
        var self = this;
        var sProperty = oEvent.getSource().data("property")

        var oModelFiltersSop = self.getModel("FiltersSop")
        oModelFiltersSop.setProperty("/" + sProperty, oEvent.getParameter("value"))
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
        self.setFilterEQ(aFilters, "ZztipologiaSop", oFilters.ZztipologiaSop);
        self.setFilterEQ(aFilters, "DescZtipopag", oFilters.Ztipopag);
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

      onRegisterSop: function () {
        var self = this;
        self.getView().byId("tblListSop").removeSelections(true);
        self.getRouter().navTo("amm.selectType");
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

        switch (oSelectedItem?.Ztipopag) {
          case "1":
            self.getRouter().navTo("amm.detail.scenary1", oParameters);
            break;
          case "2":
            self.getRouter().navTo("amm.detail.scenary2", oParameters);
            break;
          case "3":
            self.getRouter().navTo("amm.detail.scenary3", oParameters);
            break;
          case "4":
            self.getRouter().navTo("amm.detail.scenary4", oParameters);
            break;
        }
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
        oModelUtility.setProperty("/EnabledBtnCopy", false);
        if (aSelectedItems.length === 1) {
          var sState = aSelectedItems[0].ZcodStatosop;
          var sZtipopag = aSelectedItems[0].Ztipopag
          if (sZtipopag === '4') {
            oModelUtility.setProperty("/EnabledBtnCopy", true);
          }

          if (
            (sState === '05' || sState === '08' || sState === '07' || sState === '11' || sState === '14' || sState === '15' || sState === '17') &&
            sZtipopag !== '4'
          ) {
            oModelUtility.setProperty("/EnabledBtnCopy", true);
          }
        }
        sap.ui.getCore().setModel(new JSONModel(aSelectedItems), "SelectedItems");
        oModelUtility.setProperty("/SelectedItems", aSelectedItems);
      },

      onCopy: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oTableSop = self.getView().byId("tblListSop");
        oTableSop.removeSelections(true);

        var oSelectedItem = oModelUtility.getProperty("/SelectedItems")[0];
        oModelUtility.setProperty("/SelectedItems", []);

        var oParameters = {
          Ztipopag: oSelectedItem.Ztipopag,
          Gjahr: oSelectedItem.Gjahr,
          Zchiavesop: oSelectedItem.Zchiavesop,
          Bukrs: oSelectedItem.Bukrs,
          Zstep: oSelectedItem.Zstep,
          Ztipososp: oSelectedItem.Ztipososp,
        };

        self.getRouter().navTo("amm.copy.inputSop", oParameters)
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
            label: oBundle.getText("labelDataRegSop"),
            property: "Zdatasop",
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
            label: oBundle.getText("labelPosFinanziaria"),
            property: "Fipos",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelFistl"),
            property: "Fistl",
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
