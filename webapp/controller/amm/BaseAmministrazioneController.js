sap.ui.define(
  ["../BaseController", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/m/MessageBox", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  function (BaseController, JSONModel, formatter, MessageBox, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("gestionesop.controller.amm.BaseAmministrazioneController", {
      formatter: formatter,

      createModelSop: function (sZtipopag) {
        var self = this;

        var oModelSop = new JSONModel({
          Bukrs: "",
          Gjahr: "",
          Zchiavesop: "",
          Zstep: "",
          Ztipososp: "",
          Zcausale: "",
          Zzamministr: "",
          Znumsop: "",
          Zragdest: "",
          Zdatasop: null,
          ZztipologiaSop: "",
          Lifnr: "",
          Ztipopag: sZtipopag,
          Witht: "",
          ZzCebenra: "",
          ZufficioCont: "",
          Zimptot: "0.00",
          Fipos: "",
          Fistl: "",
          Znumprot: "",
          Zdataprot: null,
          ZcodStatosop: "",
          ZspecieSop: "",
          Zricann: "",
          Capitolo: "",
          DescWitht: "",
          DescZzcebenra: "",
          DescLifnr: "",
          DescStatosop: "",
          DescTipologia: "",
          DescZtipopag: "",
          DescZwels: "",
          Znumliq: "",
          ZdescProsp: "",
          Zprovgiud: "",
          NameFirst: "",
          NameLast: "",
          ZzragSoc: "",
          Taxnumcf: "",
          Taxnum: "",
          Type: "",
          Taxnumxl: "",
          Zsede: "",
          Zdenominazione: "",
          Zdurc: "",
          Zdstatodes: "",
          Zdscadenza: null,
          ZfermAmm: "",
          Zwels: "",
          Zcoordest: "",
          Swift: "",
          Iban: "",
          ZCausaleval: "",
          Zpurpose: "",
          Zzposfinent: "",
          Zflagfrutt: "",
          Zcausben: "",
          Zalias: "",
          AccTypeId: "",
          Regio: "",
          ZaccText: "",
          Banks: "",
          Ztipofirma: "",
          ZpersCognomeQuiet1: "",
          ZpersNomeQuiet1: "",
          ZpersNomeVaglia: "",
          ZpersCognomeVaglia: "",
          Zstcd1: "",
          Zstcd14: "",
          Zqindiriz: "",
          Zqcitta: "",
          Zqcap: "",
          Zqprovincia: "",
          ZqragSoc: "",
          Land1: "",
          ZpersCognomeQuiet2: "",
          ZpersNomeQuiet2: "",
          Zstcd12: "",
          Zstcd15: "",
          Zqindiriz2: "",
          Zqcitta2: "",
          Zqcap2: "",
          Zqprovincia2: "",
          Land2: "",
          Zcodprov: "",
          Zcfcommit: "",
          Zcodtrib: "",
          Zperiodrifda: null,
          Zperiodrifa: null,
          Zcodinps: "",
          Zcodvers: "",
          Zcfvers: "",
          Zdescvers: "",
          Zdatavers: null,
          Zprovvers: "",
          Zsedevers: "",
          Zibanb: "",
          Zbicb: "",
          Zcoordestb: "",
          Zdenbanca: "",
          Zclearsyst: "",
          StrasBanca: "",
          Zcivico: "",
          Ort01Banca: "",
          RegioBanca: "",
          PstlzBanca: "",
          Zibani: "",
          Zbici: "",
          Zcoordesti: "",
          Zdenbancai: "",
          Zclearsysti: "",
          Zstrasi: "",
          Zcivicoi: "",
          Zort01i: "",
          Zregioi: "",
          Zpstlzi: "",
          Zland1i: "",
          Zlocpag: "",
          Zzonaint: "",
          ZE2e: "",
          Stras: "",
          Ort01: "",
          RegioSede: "",
          Pstlz: "",
          Land1Sede: "",
          Zquoteesi: true,
          Zfunzdel: "",
          Zgeber: "",
          ZimptotDivisa: "",
          Zidsede: "",
          Zmotivaz: "",
          Kostl: "",
          Hkont: "",
          Znumquiet: "",
          Znumquiet2: "",
          Ztipoprovv: "",
          Zautemit: "",
          Zdataprovv: null,
          Znprovv: "",
          Seqnr: "",
          Position: [],
          Classificazione: [],

          DescZspecieSop: "",
          BuType: "",
          //Primo quietanzante
          NumquietInitial1: false,
          //Secondo quietanzante
          NumquietInitial2: false,
        });

        self.setModel(oModelSop, "Sop");
      },

      createModelUtilityReg: function (sViewId) {
        var self = this;
        var oModelUtility = new JSONModel({
          ViewId: sViewId,
          EnableEdit: true,
          isQuiet1Prevalorizzato: false,
          isZcoordEsterPrevalorizzato: false,
          isIbanPrevalorizzato: false,
          isVersanteEditable: false,
          isLogVisible: false,
          CurrentDate: new Date(),
          CurrentDateFormatted: formatter.dateToString(new Date())
        });

        self.setModel(oModelUtility, "Utility");
      },

      //#region ----------------------------WIZARD 1----------------------------

      setFirstSopData: function (oParamenters) {
        var self = this;
        var oModelSop = self.getModel("Sop");

        oModelSop.setProperty("/Gjahr", oParamenters?.Gjahr);
        oModelSop.setProperty("/Zragdest", oParamenters?.Zragdest);
        oModelSop.setProperty("/Zzamministr", oParamenters?.Zzamministr);
        oModelSop.setProperty("/Fipos", oParamenters?.Fipos);
        oModelSop.setProperty("/Fistl", oParamenters?.Fistl);
        oModelSop.setProperty("/Zgeber", oParamenters?.Zgeber);
        oModelSop.setProperty("/ZufficioCont", oParamenters?.ZufficioCont);
        oModelSop.setProperty("/Zfunzdel", oParamenters?.Zfunzdel);
        oModelSop.setProperty("/Ztipoprovv", oParamenters?.Ztipoprovv);
        oModelSop.setProperty("/Zautemit", oParamenters?.Zautemit);
        oModelSop.setProperty("/Zdataprovv", new Date(oParamenters?.Zdataprovv));
        oModelSop.setProperty("/Znprovv", oParamenters?.Znprovv);
        oModelSop.setProperty("/Zcausale", oParamenters?.Zcausale);
      },

      createModelFiltersWizard1: async function () {
        var self = this;
        var sUfficio = await self.getUfficio();

        var oModelFilters = new JSONModel({
          ZdatesiFrom: null,
          ZdatesiTo: null,
          Gjahr: "",
          Zuffliq: [],
          ZnumliqFrom: "",
          ZnumliqTo: "",
          ZdescProsp: "",
          FkberLong: sUfficio,
          ZzuffPag: sUfficio,
          AnnoRegDoc: [],
          BelnrFrom: "",
          BelnrTo: "",
          AnnoDocBen: [],
          Xblnr: [],
          Zbenalt: "",
          Cig: "",
          Cup: "",
          NetdtFrom: null,
          NetdtTo: null,
        });

        self.setModel(oModelFilters, "FiltersWizard1");
      },

      createModelStepScenarioReg: function () {
        var self = this;
        var oModelStepScenario = new JSONModel({
          wizard1Step1: true,
          wizard1Step2: false,
          wizard1Step3: false,
          wizard2: false,
          wizard3: false,
          wizard4: false,
          visibleBtnForward: false,
          visibleBtnStart: true,
          visibleBtnSave: false,
        });

        self.setModel(oModelStepScenario, "StepScenario");
      },

      onCalculate: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var aPosizioni = oModelSop.getProperty("/Position");
        var fTotal = 0;

        aPosizioni.map((oSelectedItem) => {
          fTotal += parseFloat(oSelectedItem?.Zimpdaord);
        });

        oModelSop.setProperty("/Zimptot", fTotal.toFixed(2));
      },

      //#region ----------------------------VALUE HELP--------------------------

      onValueHelpUffLiquidatore: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.UfficioLiquidatore");

        self.getView().setBusy(true);

        oDataModel.read("/UfficioLiquidatoreMcSet", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("UfficioLiquidatore", data, "sdUfficioLiquidatore", oDialog);
            self.hasResponseError(oResponse);
          },
          error: function (error) {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpUffLiquidatoreClose: function (oEvent) {
        var self = this;
        var oContexts = oEvent.getParameter("selectedContexts");
        var oModelFilters = self.getModel("FiltersWizard1");

        oModelFilters.setProperty("/Zuffliq", []);

        if (oContexts?.length) {
          var aData = oContexts.map((oContext) => {
            return oContext.getObject()["Zuffliq"];
          });

          oModelFilters.setProperty("/Zuffliq", aData);
        }
        this.unloadFragment();
      },

      onValueHelpEnteBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.EnteBeneficiario");

        self.setFilterEQ(aFilters, "Witht", oSop?.Witht);
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
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelSop.setProperty("/ZzDescebe", self.setBlank(oSelectedItem?.getTitle()));
        oModelSop.setProperty("/ZzCebenra", self.setBlank(oSelectedItem?.data("key")));

        self.unloadFragment();
      },

      onValueHelpDescProspLiquidazione: function () {
        var self = this;
        var oModel = self.getModel();
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.DescProspettoLiquidazione");

        self.getView().setBusy(true);

        oModel.read("/DescrizioneProspettoMcSet", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("DescProspettoLiquidazione", data, "sdDescProspettoLiquidazione", oDialog);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpDescProspLiquidazioneClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/ZdescProsp", self.setBlank(oSelectedItem?.getTitle()));
        self.unloadFragment();
      },

      onValueHelpNRegDocumento: function (oEvent) {
        var self = this;
        var oDataModel = self.getModel();
        var oModelFilters = self.getModel("FiltersWizard1");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.NRegDocumento");

        var oSelectDialog = sap.ui.getCore().byId("sdNRegDocumento");
        oSelectDialog.data("PropertyModel", oEvent.getSource().data().PropertyModel);

        var aFilters = [];
        var aGjahr = oModelFilters.getProperty("/AnnoRegDocumento");

        aGjahr?.map((sGjahr) => {
          self.setFilterEQ(aFilters, "Gjahr", sGjahr);
        });
        self.getView().setBusy(true);

        oDataModel.read("/NRegDocumentoMcSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("NRegDocumento", data, "sdNRegDocumento", oDialog);
            self.hasResponseError(oResponse);
          },
          error: function (error) {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpNRegDocumentoClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var oSelectedItem = oEvent.getParameter("selectedItem");
        var sBelnr = self.setBlank(oSelectedItem?.getTitle());

        oModelFilters.setProperty("/" + oEvent.getSource().data("PropertyModel"), sBelnr);

        this.unloadFragment();
      },

      onValueHelpNDocBene: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelFilters = self.getModel("FiltersWizard1");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.NDocBeneficiario");
        var aFilters = [];
        var aGjahr = oModelFilters.getProperty("/AnnoRegDoc");

        aGjahr?.map((sGjahr) => {
          self.setFilterEQ(aFilters, "Gjahr", sGjahr);
        });
        self.getView().setBusy(true);

        oModel.read("/NDocBeneficiarioMcSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("NDocBeneficiario", data, "sdNDocBeneficiario", oDialog);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpNDocBeneClose: function (oEvent) {
        var self = this;
        var oContexts = oEvent.getParameter("selectedContexts");
        var oModelFilters = self.getModel("FiltersWizard1");

        if (oContexts?.length) {
          var aData = oContexts.map((oContext) => {
            return oContext.getObject()["Xblnr"];
          });

          oModelFilters.setProperty("/Xblnr", aData);
        }
        this.unloadFragment();
      },

      onValueHelpCupFilter: function () {
        var self = this;
        var oModelCup = self.getModel("ZSS4_COSP_CONTRATTO_SRV");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Cup");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Matchcode", "CODICE_CUP");

        self.getView().setBusy(true);

        oModelCup.read("/MatchCodeContrattoSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            var aCup = [];
            var aData = data.results;
            aData.map((oData) =>
              aCup.push({
                Cup: oData.CodiceCup,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aCup);
            var oSelectDialog = sap.ui.getCore().byId("sdCupFilter");
            oSelectDialog?.setModel(oModelJson, "Cup");
            oDialog.open();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpCupFilterClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Cup", self.setBlank(oSelectedItem?.getTitle()));

        this.unloadFragment();
      },

      onValueHelpCigFilter: function () {
        var self = this;
        var oModel = self.getModel();
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Cig");

        self.getView().setBusy(true);

        oModel.read("/CigMcSet", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModelDialog("Cig", data, "sdCigFilter", oDialog);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpCigFilterClose: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelFilters.setProperty("/Cig", self.setBlank(oSelectedItem?.getTitle()));

        this.unloadFragment();
      },

      //#endregion -------------------VALUE HELP----------------------------------

      //#region ----------------------------SELECTION CHANGE----------------------

      onTipoBeneficiarioChange: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");
        oModelSop.setProperty("/Zquoteesi", false);
      },

      onQuoteEsigibiliChange: function () {
        var self = this;
        var oModelFilter = self.getModel("FiltersWizard1");

        oModelFilter.setProperty("/ZdatesiFrom", null);
        oModelFilter.setProperty("/ZdatesiTo", null);
      },

      onRitenutaChange: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");

        if (!oEvent.getSource().getSelectedKey()) {
          oModelSop.setProperty("/ZspecieSop", "");
          oModelSop.setProperty("/DescZspecieSop", "");
        } else {
          self._setSpecieSop("2");
        }

        oModelSop.setProperty("/ZzCeberna", "");
      },

      onUffLiquidatoreChange: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var sValue = oEvent.getParameter("value");
        if (!sValue) {
          oModelFilters.setProperty("/Zuffliq", []);
        }

        sValue = sValue.replace(" ", "");
        var aValues = sValue.split(",");
        oModelFilters.setProperty("/Zuffliq", aValues);
      },

      onNDocBeneChange: function (oEvent) {
        var self = this;
        var oModelFilters = self.getModel("FiltersWizard1");
        var sValue = oEvent.getParameter("value");
        if (!sValue) {
          oModelFilters.setProperty("/Xblnr", []);
        }

        sValue = sValue.replace(" ", "");
        var aValues = sValue.split(",");
        oModelFilters.setProperty("/Xblnr", aValues);
      },

      //#endregion ----------------SELECTION CHANGE-------------------------------

      //#region ----------------------------METHODS-------------------------------

      _createModelAnnoDocBen: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);
        self.getView().setBusy(true);

        oModel.read("/AnnoDocBeneficiarioMcSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModel(new JSONModel(data.results), "AnnoDocBeneficiario");
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(true);
          },
        });
      },

      setFiltersWizard1: function () {
        var self = this;
        var oFiltersWizard1 = self.getModel("FiltersWizard1").getData();
        var oSop = self.getModel("Sop").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Ztipopag", oSop.Ztipopag);
        self.setFilterEQ(aFilters, "Witht", oSop.Witht);
        self.setFilterEQ(aFilters, "ZzCebenra", oSop.ZzCebenra);
        self.setFilterEQ(aFilters, "Zquoteesi", oSop.Zquoteesi);
        self.setFilterBT(aFilters, "Zdateesi", oFiltersWizard1.ZdatesiFrom, oFiltersWizard1.ZdatesiTo);
        self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);
        self.setFilterEQ(aFilters, "Fipos", oSop.Fipos);
        self.setFilterEQ(aFilters, "Fistl", oSop.Fistl);
        self.setFilterEQ(aFilters, "Zgeber", oSop.Zgeber);
        self.setFilterEQ(aFilters, "EsercizioContabile", oFiltersWizard1.Gjahr);
        self.setFilterEQ(aFilters, "Zbenalt", oFiltersWizard1.Zbenalt);
        self.setFilterEQ(aFilters, "ZzuffPag", oFiltersWizard1.ZzuffPag);
        oFiltersWizard1.Zuffliq?.map((Zuffliq) => {
          self.setFilterEQ(aFilters, "Zuffliq", Zuffliq);
        });
        self.setFilterBT(aFilters, "Znumliq", oFiltersWizard1.ZnumliqFrom, oFiltersWizard1.ZnumliqTo);
        self.setFilterCP(aFilters, "ZdescProsp", oFiltersWizard1.ZdescProsp);
        self.setFilterEQ(aFilters, "FkberLong", oFiltersWizard1.FkberLong);
        oFiltersWizard1.AnnoRegDoc?.map((AnnoRegDoc) => {
          self.setFilterEQ(aFilters, "AnnoRegDoc", AnnoRegDoc);
        });
        self.setFilterBT(aFilters, "Belnr", oFiltersWizard1.BelnrFrom, oFiltersWizard1.BelnrTo);
        oFiltersWizard1.AnnoDocBen?.map((AnnoDocBen) => {
          self.setFilterEQ(aFilters, "AnnoDocBen", AnnoDocBen);
        });
        oFiltersWizard1.Xblnr?.map((Xblnr) => {
          self.setFilterEQ(aFilters, "Xblnr", Xblnr);
        });
        self.setFilterEQ(aFilters, "Cig", oFiltersWizard1.Cig);
        self.setFilterEQ(aFilters, "Cup", oFiltersWizard1.Cup);
        self.setFilterBT(aFilters, "Netdt", oFiltersWizard1.NetdtFrom, oFiltersWizard1.NetdtTo);

        return aFilters;
      },

      _setSpecieSop: function (sZspecieSop) {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var sKey = oModel.createKey("/SpecieSopMcSet", {
          ZspecieSop: sZspecieSop,
        });
        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/ZspecieSop", sZspecieSop);
            oModelSop.setProperty("/DescZspecieSop", data?.Descrizione);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      checkWizard1: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelStepScenario = self.getModel("StepScenario");
        var oSop = self.getModel("Sop").getData();
        var aPosizioni = oSop.Position;
        var aPosizioniFormatted = [];
        if (oSop.Zimptot <= 0) {
          MessageBox.error("L'importo non può essere minore o uguale a 0");
          return;
        }

        aPosizioni.map((oPosition) => {
          aPosizioniFormatted.push({
            HeaderIndex: "1",
            Index: oPosition.Index.toString(),
            Zimpdaord: oPosition.Zimpdaord,
            Zimppag: oPosition.Zimppag,
            Zimpres: oPosition.Zimpres,
            Zimpliq: oPosition.Zimpliq
          });
        });

        var oParamenters = {
          HeaderIndex: "1",
          Ztipopag: oSop.Ztipopag,
          ZspecieSop: oSop.ZspecieSop,
          CheckImportPositionSet: aPosizioniFormatted,
          CheckImportMessageSet: [],
        };

        self.getView().setBusy(true);
        oModel.create("/DeepCheckImportHeaderSet", oParamenters, {
          success: function (data) {
            var aMessage = data?.CheckImportMessageSet?.results;
            if (aMessage.length > 0) {
              self.managementLogDeep(aMessage);
              self.getView().setBusy(false);
              return;
            }

            oModelStepScenario.setProperty("/wizard1Step2", false);
            oModelStepScenario.setProperty("/wizard1Step3", true);
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },


      //#endregion -------------------------METHODS-------------------------------

      //#endregion -------------------------WIZARD 1------------------------------

      //#region ----------------------------WIZARD 2----------------------------

      createModelModPagamento: function () {
        var self = this;
        var oSop = self.getModel("Sop").getData();
        var oModel = self.getModel();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);
        self.setFilterEQ(aFilters, "ZspecieSop", oSop.ZspecieSop);
        self.setFilterEQ(aFilters, "Qsskz", oSop.Witht);
        self.setFilterEQ(aFilters, "ZzCebenra", oSop.ZzCebenra);
        self.getView().setBusy(true);

        oModel.read("/ModalitaPagamentoSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.setModel(new JSONModel(data.results), "ModalitaPagamento");
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onOkMotivazione: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var sMotivazione = sap.ui.getCore().byId("txtMotivazione")?.getValue();
        var oDialogMotivazione = sap.ui.getCore().byId("dlgMotivazione");

        oDialogMotivazione.close();
        self.unloadFragment();

        if (!sMotivazione) {
          MessageBox.error("Motivazione cambio IBAN obbligatoria", {
            title: "Errore",
          });
          oModelSop.setProperty("/Iban", "");
          return;
        }

        oModelSop.setProperty("/Zmotivaz", sMotivazione);
      },

      onCloseMotivazione: function () {
        var self = this;
        var oDialogMotivazione = sap.ui.getCore().byId("dlgMotivazione");
        oDialogMotivazione.close();
        self.unloadFragment();
      },

      //#region -----------------------------VALUE HELP---------------------------

      onValueHelpQuietanzante1: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Quietanzante1");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        oDataModel.read("/Quietanzante1Set", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.setModelDialog("Quietanzante1", data, "sdQuietanzante1", oDialog);
          },
          error: function (error) { },
        });
      },

      onValueHelpQuietanzante1Close: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();
        var oSelectedItem = oEvent?.getParameter("selectedItem");
        var sCodiceFiscale = self.setBlank(oSelectedItem?.getTitle());
        var sZnumquiet = oEvent?.getParameter("selectedItem")?.data("Znumquiet");
        var bNumquietInitial1 = oEvent?.getParameter("selectedItem")?.data("NumquietInitial");

        oModelSop.setProperty("/Znumquiet", sZnumquiet);
        oModelSop.setProperty("/NumquietInitial1", bNumquietInitial1);
        if (oSop.Zwels === "ID1") {
          oModelSop.setProperty("/Zstcd1", sCodiceFiscale);
        } else {
          oModelSop.setProperty("/Zstcd3", sCodiceFiscale);
        }

        self._setDataQuietanzante1(sCodiceFiscale);

        self.unloadFragment();
      },

      onValueHelpQuietanzante2: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Quietanzante2");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        oDataModel.read("/Quietanzante2Set", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.setModelDialog("Quietanzante2", data, "sdQuietanzante2", oDialog);
          },
          error: function (error) { },
        });
      },

      onValueHelpQuietanzante2Close: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent?.getParameter("selectedItem");
        var sCodiceFiscale = self.setBlank(oSelectedItem?.getTitle());
        var sZnumquiet2 = oEvent?.getParameter("selectedItem")?.data("Znumquiet2");
        var bNumquietInitial1 = oEvent?.getParameter("selectedItem")?.data("NumquietInitial");

        oModelSop.setProperty("/Znumquiet2", sZnumquiet2);
        oModelSop.setProperty("/NumquietInitial2", bNumquietInitial1);
        oModelSop.setProperty("/Zstcd12", sCodiceFiscale);

        self._setDataQuietanzante2();

        self.unloadFragment();
      },

      onValueHelpQuietEstero1: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.QuietanzanteEstero1");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        oDataModel.read("/Quietanzante1EsteroSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.setModelDialog("QuietEstero1", data, "sdQuietEstero1", oDialog);
          },
          error: function (error) { },
        });
      },

      onValueHelpQuietEstero1Close: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent?.getParameter("selectedItem");
        var sCodiceFiscale = self.setBlank(oSelectedItem?.getTitle());
        var bNumquietInitial1 = oEvent?.getParameter("selectedItem")?.data("NumquietInitial");

        oModelSop.setProperty("/NumquietInitial2", bNumquietInitial1);
        oModelSop.setProperty("/Zstcd14", sCodiceFiscale);

        self._setDataQuietEstero1();

        self.unloadFragment();
      },

      onValueHelpQuietEstero2: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.QuietanzanteEstero2");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        oDataModel.read("/Quietanzante2EsteroSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.setModelDialog("QuietEstero2", data, "sdQuietEstero2", oDialog);
          },
          error: function (error) { },
        });
      },

      onValueHelpQuietEstero2Close: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent?.getParameter("selectedItem");
        var sCodiceFiscale = self.setBlank(oSelectedItem?.getTitle());
        var bNumquietInitial1 = oEvent?.getParameter("selectedItem")?.data("NumquietInitial");

        oModelSop.setProperty("/NumquietInitial2", bNumquietInitial1);
        oModelSop.setProperty("/Zstcd15", sCodiceFiscale);

        self._setDataQuietEstero2();

        self.unloadFragment();
      },

      onValueHelpCoordEstere: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.CoordinateEstere");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.getView().setBusy(true);

        oModel.read("/CoordinateEstereSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            self.setModelDialog("CoordinateEstere", data, "sdCoordEstere", oDialog);
          },
          error: function (error) {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpCoordEstereClose: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent?.getParameter("selectedItem");

        oModelSop.setProperty("/Zcoordest", self.setBlank(oSelectedItem?.getTitle()));
        self.setPaeseResidenza();
        self.setBic();

        self.unloadFragment();
      },

      //#endregion --------------------------VALUE HELP---------------------------

      //#region -----------------------------SELECTION CHANGE---------------------

      onAliasChange: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");

        var sZalias = oModelSop.getProperty("/Zalias");

        if (!sZalias) {
          oModelSop.setProperty("/AccTypeId", "");
          oModelSop.setProperty("/RegioConto", "");
          oModelSop.setProperty("/ZaccText", "");
          oModelSop.setProperty("/Iban", "");
          return;
        }

        self.setIban();

        var sPath = oModel.createKey("/AliasSet", {
          Zalias: sZalias,
        });

        oModel.read(sPath, {
          success: function (data) {
            oModelSop.setProperty("/AccTypeId", data.AccTypeId);
            oModelSop.setProperty("/Regio", data.Regio);
            oModelSop.setProperty("/ZaccText", data.ZaccText);
          },
          error: function () { },
        });
      },

      onTipoFirmaChange: function (oEvent) {
        var self = this;
        var sTipoFirma = oEvent.getSource().getSelectedKey();

        if (sTipoFirma) {
          self.setQuietanzante1();
        }

        if (sTipoFirma === "03" && sTipoFirma === "04") {
          this.setQuietanzante2();
        }

        self.setQuietanzante1();

        if (sTipoFirma !== "03" && sTipoFirma !== "04") {
          this.resetQuietanzante2();
        }
      },

      onQuietanzante1Change: function (oEvent) {
        if (oEvent.getParameter("value")) {
          this._setDataQuietanzante1(oEvent.getParameter("value"));
        } else {
          this.resetQuietanzante1();
        }
      },

      onQuietanzante2Change: function (oEvent) {
        if (oEvent.getParameter("value")) {
          this._setDataQuietanzante2();
        } else {
          this.resetQuietanzante2();
        }
      },

      onQuietEstero1Change: function (oEvent) {
        if (oEvent.getParameter("value")) {
          this._setDataQuietEstero1();
        } else {
          this.resetQuietanzante1();
        }
      },

      onQuietEstero2Change: function (oEvent) {
        if (oEvent.getParameter("value")) {
          this._setDataQuietEstero2();
        } else {
          this.resetQuietanzante2();
        }
      },

      onIbanChange: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        if (oModelUtility.getProperty("/isIbanPrevalorizzato")) {
          var oDialogMotivazione = self.loadFragment("gestionesop.view.fragment.amm.wizard2.MotivazioneIban");
          oModelUtility.setProperty("/isIbanPrevalorizzato", false);
          oDialogMotivazione.open();
        }

        this.checkIban();
        this.setDataIban();
      },

      onModalitaPagamentoChange: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");
        var sZwels = oEvent.getSource().getSelectedKey();
        if (!oModelUtility.getProperty("/isIbanPrevalorizzato") || !sZwels) {
          oModelSop.setProperty("/Iban", "");
          oModelSop.setProperty("/Banks", "");
        }
        if (sZwels === "ID1" || sZwels === "ID2" || sZwels === "ID3" || sZwels === "ID4" || sZwels === "ID5") {
          oModelUtility.setProperty("/isIbanPrevalorizzato", true);
        }

        if (oModelUtility.getProperty("/isVersanteEditable") && (oModelSop.getProperty("/Zwels") === "ID4" || oModelSop.getProperty("/Zwels") === "ID3")) {
          this._getCodProvenienza();
        }
        this._resetDataModalitaPagamento();

        if (!sZwels) {
          return;
        }

        this.setIban();
        this.setCoordinateEstere();
      },

      onCoordinateEstereChange: function () {
        this._checkCoordinateEstere();
        this.setPaeseResidenza();
        this.setBic();
      },

      onSedeBeneficiarioChange: function () {
        this.setSedeBeneficiario();
      },

      onCausaleValutariaChange: function () {
        this.checkCasualeValutaria();
      },

      //#endregion --------------------------SELECTION CHANGE---------------------

      //#region -----------------------------METHODS------------------------------

      setPaeseResidenza: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/PaeseBancaSet", {
          Zwels: oSop.Zwels,
          ZspecieSop: oSop.ZspecieSop,
          Iban: oSop.Iban,
          Zcoordest: oSop.Zcoordest,
          Lifnr: oSop.Lifnr,
        });
        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            self.getView().setBusy(false);
            if (data.Banks === "" || data.Banks === "IT") {
              oModelSop.setProperty("/ZCausaleval", "");
              oModelSop.setProperty("/ZDesccauval", "");
            }
            oModelSop.setProperty("/Banks", data.Banks);
            oModelSop.setProperty("/Seqnr", data.Seqnr);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setIban: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/IbanBeneficiarioSet", {
          ZspecieSop: oSop.ZspecieSop,
          Zwels: oSop.Zwels,
          Iban: "",
          Json: "",
          Lifnr: oSop.Lifnr,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          urlParameters: {
            AliasRgs: oSop.Zalias,
          },
          success: function (data, oResponse) {
            self.getView().setBusy(false);

            if (oSop.Zwels === "ID1" || oSop.Zwels === "ID2" || oSop.Zwels === "ID3" || oSop.Zwels === "ID4" || oSop.Zwels === "ID5") {
              oModelSop.setProperty("/Iban", data?.Iban);
            }

            self.checkIban();
            self.setDataIban();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setIbanQuote: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");
        var oSop = oModelSop.getData();

        if (oSop.Iban) {
          return;
        }

        if (oSop?.Position) {
          var aPosizioniFormatted = oSop?.Position?.map((oPosition) => {
            var oPosizioneFormatted = {
              Bukrs: oPosition?.Bukrs,
              Znumliq: oPosition?.Znumliq,
              Zposizione: oPosition?.Zposizione,
              Zversione: oPosition?.Zversione,
              ZversioneOrig: oPosition?.ZversioneOrig,
              Docid: oPosition?.Docid,
            };

            return oPosizioneFormatted;
          });
        }

        var sKey = oModel.createKey("/IbanBeneficiarioSet", {
          ZspecieSop: oSop.ZspecieSop,
          Zwels: "",
          Iban: "",
          Json: JSON.stringify(aPosizioniFormatted),
          Lifnr: oSop.Lifnr,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          urlParameters: {
            AliasRgs: oSop.Zalias,
          },
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Iban", data?.Iban);
            if (data?.Iban) {
              oModelUtility.setProperty("/isIbanPrevalorizzato", true);
            } else {
              oModelUtility.setProperty("/isIbanPrevalorizzato", false);
            }
            if (self.hasResponseError(oResponse)) {
              oModelSop.setProperty("/Iban", "");
              oModelSop.setProperty("/Banks", "");
              return;
            }
            self.setDataIban();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setModalitaPagamentoQuote: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        if (oSop.ZspecieSop === '1') {
          return;
        }

        if (oSop?.Position) {
          var aPosizioniFormatted = oSop?.Position?.map((oPosition) => {
            var oPosizioneFormatted = {
              Bukrs: oPosition?.Bukrs,
              Znumliq: oPosition?.Znumliq,
              Zposizione: oPosition?.Zposizione,
              Zversione: oPosition?.Zversione,
              ZversioneOrig: oPosition?.ZversioneOrig,
              Docid: oPosition?.Docid,
            };

            return oPosizioneFormatted;
          });
        }

        var sKey = oModel.createKey("/ModalitaPagamentoSet", {
          ZspecieSop: oSop.ZspecieSop,
          Zwels: "",
          Json: JSON.stringify(aPosizioniFormatted),
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data) {
            oModelSop.setProperty("/Zwels", data?.Zwels)
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      checkIban: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/IbanBeneficiarioSet", {
          ZspecieSop: oSop.ZspecieSop,
          Zwels: oSop.Zwels,
          Iban: oModelSop.getProperty("/Iban"),
          Json: "",
          Lifnr: oSop.Lifnr,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          urlParameters: {
            AliasRgs: oSop.Zalias,
          },
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) {
              oModelSop.setProperty("/Iban", "");
              oModelSop.setProperty("/Banks", "");
              return;
            }
            self.setDataIban();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      resetQuietanzante1: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");

        oModelSop.setProperty("/ZpersNomeQuiet1", "");
        oModelSop.setProperty("/ZpersCognomeQuiet1", "");
        oModelSop.setProperty("/Zstcd1", "");
        oModelSop.setProperty("/ZpersNomeVaglia", "");
        oModelSop.setProperty("/ZpersCognomeVaglia", "");
        oModelSop.setProperty("/Zqindiriz", "");
        oModelSop.setProperty("/Zqcitta", "");
        oModelSop.setProperty("/Zqcap", "");
        oModelSop.setProperty("/Zqprovincia", "");
        oModelSop.setProperty("/Zstcd14", "");
        oModelSop.setProperty("/Land1", "");
        oModelSop.setProperty("/ZqragSoc", "");
        oModelSop.setProperty("/Znumquiet", "");
        oModelSop.setProperty("/NumquietInitial1", false);
      },

      resetQuietanzante2: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");

        oModelSop.setProperty("/ZpersCognomeQuiet2", "");
        oModelSop.setProperty("/ZpersNomeQuiet2", "");
        oModelSop.setProperty("/Zstcd12", "");
        oModelSop.setProperty("/Zqindiriz2", "");
        oModelSop.setProperty("/Zqcitta2", "");
        oModelSop.setProperty("/Zqcap2", "");
        oModelSop.setProperty("/Zqprovincia2", "");
        oModelSop.setProperty("/Zstcd15", "");
        oModelSop.setProperty("/Land2", "");
        oModelSop.setProperty("/Znumquiet2", "");
      },

      _setDataQuietanzante1: function (sCodiceFiscale) {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        if (!sCodiceFiscale) {
          return;
        }

        var sKey = oModel.createKey("/Quietanzante1Set", {
          Zstcd1: sCodiceFiscale,
          Zwels: oSop.Zwels,
          Lifnr: oSop.Lifnr,
          NumquietInitial: oSop.NumquietInitial1 ? oSop.NumquietInitial1 : false,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zstcd1", data.Zstcd1);
            oModelSop.setProperty("/ZpersCognomeQuiet1", data.ZpersCognomeQuiet1);
            oModelSop.setProperty("/ZpersNomeQuiet1", data.ZpersNomeQuiet1);
            oModelSop.setProperty("/ZpersCognomeVaglia", data.ZpersCognomeVaglia);
            oModelSop.setProperty("/ZpersNomeVaglia", data.ZpersNomeVaglia);
            oModelSop.setProperty("/Land1", data.Land1);
            oModelSop.setProperty("/Zqcap", data.Zqcap);
            oModelSop.setProperty("/Zqcitta", data.Zqcitta);
            oModelSop.setProperty("/Zqindiriz", data.Zqindiriz);
            oModelSop.setProperty("/Zqprovincia", data.Zqprovincia);
            oModelSop.setProperty("/ZqragSoc", data.ZzragSoc);
            oModelSop.setProperty("/Znumquiet", data.Znumquiet);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setQuietanzante1: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");
        var oSop = oModelSop.getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        self.getView().setBusy(true);
        oDataModel.read("/Quietanzante1Set", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            var aData = data.results;
            var oFirstRecord = aData[0];
            if (aData.length === 1 && oFirstRecord.NumquietInitial === true) {
              self.getView().setBusy(false);
              oModelUtility.setProperty("/isQuiet1Prevalorizzato", true);
              oModelSop.setProperty("/Znumquiet", oFirstRecord.Znumquiet);
              oModelSop.setProperty("/NumquietInitial1", oFirstRecord.NumquietInitial1);
              if (oSop.Zwels === "ID1") {
                oModelSop.setProperty("/Zstcd1", oFirstRecord.Zstcd1);
              } else {
                oModelSop.setProperty("/Zstcd3", oFirstRecord.Zstcd1);
              }

              self._setDataQuietanzante1(oFirstRecord.Zstcd1);
            }
          },
          error: function (error) {
            self.getView().setBusy(false);
          },
        });
      },

      setQuietanzante2: function () {
        var self = this;
        var oDataModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oModelSop?.getProperty("/Lifnr"));
        self.setFilterEQ(aFilters, "Ztipofirma", oModelSop?.getProperty("/Ztipofirma"));

        self.getView().setBusy(true);
        oDataModel.read("/Quietanzante2Set", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            var aData = data.results;
            var oFirstRecord = aData[0];
            if (aData.length === 1 && oFirstRecord.NumquietInitial === true) {
              oModelUtility.setProperty("/isQuiet1Prevalorizzato", true);
              oModelSop.setProperty("/Znumquiet", oFirstRecord.Znumquiet);
              oModelSop.setProperty("/NumquietInitial1", oFirstRecord.NumquietInitial1);
              oModelSop.setProperty("/Zstcd12", oFirstRecord.Zstcd12);

              self._setDataQuietanzante2();
            }
          },
          error: function (error) {
            self.getView().setBusy(false);
          },
        });
      },

      _setDataQuietanzante2: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        if (!oSop.Zstcd12) {
          return;
        }

        var sKey = oModel.createKey("/Quietanzante2Set", {
          Zstcd12: oSop.Zstcd12,
          Lifnr: oSop.Lifnr,
          NumquietInitial: oSop.NumquietInitial2 ? oSop.NumquietInitial2 : false,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zstcd12", data.Zstcd12);
            oModelSop.setProperty("/ZpersCognomeQuiet2", data.ZpersCognomeQuiet2);
            oModelSop.setProperty("/ZpersNomeQuiet2", data.ZpersNomeQuiet2);
            oModelSop.setProperty("/Land2", data.Land1);
            oModelSop.setProperty("/Zqcap2", data.Zqcap);
            oModelSop.setProperty("/Zqcitta2", data.Zqcitta);
            oModelSop.setProperty("/Zqindiriz2", data.Zqindiriz);
            oModelSop.setProperty("/Zqprovincia2", data.Zqprovincia);
            oModelSop.setProperty("/Znumquiet2", data.Znumquiet);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      _setDataQuietEstero1: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/Quietanzante1EsteroSet", {
          Zstcd14: oSop.Zstcd14,
          Lifnr: oSop.Lifnr,
          NumquietInitial: oSop.NumquietInitial1 ? oSop.NumquietInitial1 : false,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zstcd14", data.Zstcd14);
            oModelSop.setProperty("/ZpersCognomeQuiet1", data.ZpersCognomeQuiet1);
            oModelSop.setProperty("/ZpersNomeQuiet1", data.ZpersNomeQuiet1);
            oModelSop.setProperty("/Land1", data.Land1);
            oModelSop.setProperty("/Zqcap", data.Zqcap);
            oModelSop.setProperty("/Zqcitta", data.Zqcitta);
            oModelSop.setProperty("/Zqindiriz", data.Zqindiriz);
            oModelSop.setProperty("/Zqprovincia", data.Zqprovincia);
            oModelSop.setProperty("/ZqragSoc", data.ZzragSoc);
            oModelSop.setProperty("/Znumquiet", data.Znumquiet);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      _setDataQuietEstero2: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/Quietanzante2EsteroSet", {
          Zstcd15: oSop.Zstcd15,
          Lifnr: oSop.Lifnr,
          NumquietInitial: oSop.NumquietInitial2 ? oSop.NumquietInitial2 : false,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zstcd15", data.Zstcd15);
            oModelSop.setProperty("/ZpersCognomeQuiet2", data.ZpersCognomeQuiet2);
            oModelSop.setProperty("/ZpersNomeQuiet2", data.ZpersNomeQuiet2);
            oModelSop.setProperty("/Land2", data.Land1);
            oModelSop.setProperty("/Zqcap2", data.Zqcap);
            oModelSop.setProperty("/Zqcitta2", data.Zqcitta);
            oModelSop.setProperty("/Zqindiriz2", data.Zqindiriz);
            oModelSop.setProperty("/Zqprovincia2", data.Zqprovincia);
            oModelSop.setProperty("/Znumquiet2", data.Znumquiet);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setBancaAccredito: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        if (!((oSop.Iban || oSop.Zcoordest) && (oSop.Zwels === "ID6" || oSop.Zwels === "ID10"))) {
          oModelSop.setProperty("/Zibanb", "");
          oModelSop.setProperty("/Zbicb", "");
          oModelSop.setProperty("/Zcoordestb", "");
          oModelSop.setProperty("/Zdenbanca", "");
          oModelSop.setProperty("/Zclearsyst", "");
          oModelSop.setProperty("/StrasBanca", "");
          oModelSop.setProperty("/Zcivico", "");
          oModelSop.setProperty("/Ort01Banca", "");
          oModelSop.setProperty("/RegioBanca", "");
          oModelSop.setProperty("/PstlzBanca", "");
          oModelSop.setProperty("/Land1", "");
          return;
        }

        var sKey = oModel.createKey("/BancaAccreditoSet", {
          Lifnr: oSop.Lifnr,
          Iban: oSop.Iban,
          Zcoordest: oSop.Zcoordest,
        });
        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zibanb", data?.Zibanb);
            oModelSop.setProperty("/Zbicb", data?.Zbicb);
            oModelSop.setProperty("/Zcoordestb", data?.Zcoordestb);
            oModelSop.setProperty("/Zdenbanca", data?.Zdenbanca);
            oModelSop.setProperty("/Zclearsyst", data?.Zclearsyst);
            oModelSop.setProperty("/StrasBanca", data?.Stras);
            oModelSop.setProperty("/Zcivico", data?.Zcivico);
            oModelSop.setProperty("/Ort01Banca", data?.Ort01);
            oModelSop.setProperty("/RegioBanca", data?.Regio);
            oModelSop.setProperty("/PstlzBanca", data?.Pstlz);
            oModelSop.setProperty("/Land1", data?.Land1);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setIntermediario1: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        if (!((oSop.Iban || oSop.Zcoordest) && (oSop.Zwels === "ID6" || oSop.Zwels === "ID10"))) {
          oModelSop.setProperty("/Zibani", "");
          oModelSop.setProperty("/Zbici", "");
          oModelSop.setProperty("/Zcoordesti", "");
          oModelSop.setProperty("/Zdenbancai", "");
          oModelSop.setProperty("/Zclearsysti", "");
          oModelSop.setProperty("/Zstrasi", "");
          oModelSop.setProperty("/Zcivicoi", "");
          oModelSop.setProperty("/Zort01i", "");
          oModelSop.setProperty("/Zregioi", "");
          oModelSop.setProperty("/Zpstlzi", "");
          oModelSop.setProperty("/Zland1i", "");
          return;
        }

        var sKey = oModel.createKey("/Intermediario1Set", {
          Lifnr: oSop.Lifnr,
          Iban: oSop.Iban,
          Zcoordest: oSop.Zcoordest,
        });
        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            self.getView().setBusy(false);
            oModelSop.setProperty("/Zibani", data?.Zibani);
            oModelSop.setProperty("/Zbici", data?.Zbici);
            oModelSop.setProperty("/Zcoordesti", data?.Zcoordesti);
            oModelSop.setProperty("/Zdenbancai", data?.Zdenbancai);
            oModelSop.setProperty("/Zclearsysti", data?.Zclearsysti);
            oModelSop.setProperty("/Zstrasi", data?.Zstrasi);
            oModelSop.setProperty("/Zcivicoi", data?.Zcivicoi);
            oModelSop.setProperty("/Zort01i", data?.Zort01i);
            oModelSop.setProperty("/Zregioi", data?.Zregioi);
            oModelSop.setProperty("/Zpstlzi", data?.Zpstlzi);
            oModelSop.setProperty("/Zland1i", data?.Zland1i);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setDataIban: function () {
        this.setPaeseResidenza();
        this.setBancaAccredito();
        this.setIntermediario1();
      },

      checkLifnrInTvarvc: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();

        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.callFunction("/CheckLifnrInTvarvc", {
            urlParameters: {
              Lifnr: oSop.Lifnr,
            },
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              resolve(data?.CheckLifnrInTvarvc?.Editable);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      _getCodProvenienza: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");

        var sKey = oModel.createKey("/CodiceProvenienzaSet", {
          Zcodprov: "",
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data) {
            oModelSop.setProperty("/Zcodprov", data.Zcodprov);
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      _resetDataModalitaPagamento: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var sZwels = oModelSop.getProperty("/Zwels");

        if (sZwels !== "ID3") {
          oModelSop.setProperty("/Zalias", "");
          oModelSop.setProperty("/AccTypeId", "");
          oModelSop.setProperty("/RegioConto", "");
          oModelSop.setProperty("/ZaccText", "");
          oModelSop.setProperty("/Zflagfrutt", "");
          oModelSop.setProperty("/Zcausben", "");
        }
        if (sZwels !== "ID4") {
          oModelSop.setProperty("/Zzposfinent", "");
        }
        if (sZwels !== "ID6" && sZwels !== "ID10") {
          oModelSop.setProperty("/Swift", "");
          oModelSop.setProperty("/Zcoordest", "");
          oModelSop.setProperty("/Zpurpose", "");

          oModelSop.setProperty("/Zibanb", "");
          oModelSop.setProperty("/Zbicb", "");
          oModelSop.setProperty("/Zcoordestb", "");
          oModelSop.setProperty("/Zdenbanca", "");
          oModelSop.setProperty("/Zclearsyst", "");
          oModelSop.setProperty("/StrasBanca", "");
          oModelSop.setProperty("/Zcivico", "");
          oModelSop.setProperty("/Ort01Banca", "");
          oModelSop.setProperty("/RegioBanca", "");
          oModelSop.setProperty("/PstlzBanca", "");
          oModelSop.setProperty("/Land1", "");

          oModelSop.setProperty("/Zibani", "");
          oModelSop.setProperty("/Zbici", "");
          oModelSop.setProperty("/Zcoordesti", "");
          oModelSop.setProperty("/Zdenbancai", "");
          oModelSop.setProperty("/Zclearsysti", "");
          oModelSop.setProperty("/Zstrasi", "");
          oModelSop.setProperty("/Zcivicoi", "");
          oModelSop.setProperty("/Zort01i", "");
          oModelSop.setProperty("/Zregioi", "");
          oModelSop.setProperty("/Zpstlzi", "");
          oModelSop.setProperty("/Zland1i", "");
        }

        oModelSop.setProperty("/Ztipofirma", "");
        this.resetQuietanzante1();
        this.resetQuietanzante2();

        if (sZwels !== "ID3" && sZwels !== "ID4") {
          oModelSop.setProperty("/Zcodprov", "");
          oModelSop.setProperty("/Zcfcommit", "");
          oModelSop.setProperty("/Zcodtrib", "");
          oModelSop.setProperty("/Zperiodrifda", null);
          oModelSop.setProperty("/Zperiodrifa", null);
          oModelSop.setProperty("/Zcodinps", "");
          oModelSop.setProperty("/Zdescvers", "");
          oModelSop.setProperty("/Zdatavers", null);
          oModelSop.setProperty("/Zprovvers", "");
          oModelSop.setProperty("/Zsedevers", "");
        }
      },

      setCoordinateEstere: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");
        var oSop = oModelSop.getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);

        if (oSop.Zwels !== "ID6" && oSop.Zwels !== "ID10") {
          return;
        }

        self.getView().setBusy(true);
        oModel.read("/CoordinateEstereSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            var aData = data.results;
            if (aData.length === 1) {
              oModelSop.setProperty("/Zcoordest", aData[0]?.Zcoordest);
              oModelUtility.setProperty("/isZcoordEsterPrevalorizzato", true);
              self.setPaeseResidenza();
              self.setBic();
            }
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      _checkCoordinateEstere: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/CoordinateEstereSet", {
          Lifnr: oSop.Lifnr,
          Zcoordest: oSop.Zcoordest,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            if (self.hasResponseError(oResponse)) {
              oModelSop.setProperty("/Zcoordest", "");
            }
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setBic: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/SwiftSet", {
          Lifnr: oSop.Lifnr,
          Zwels: oSop.Zwels,
          Zcoordest: oSop.Zcoordest,
        });

        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            oModelSop.setProperty("/Swift", data.Bic);
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      setSedeBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/SedeBeneficiarioSet", {
          Lifnr: oSop.Lifnr,
          ZspecieSop: oSop.ZspecieSop,
          Zidsede: oModelSop.getProperty("/Zidsede"),
          Witht: oSop.Witht,
          ZzCebenra: oSop.ZzCebenra,
        });

        self.getView().setBusy(true);

        oModel.read(sKey, {
          success: function (data) {
            oModelSop.setProperty("/Zidsede", data.Zidsede);
            oModelSop.setProperty("/Stras", data.Stras);
            oModelSop.setProperty("/RegioSede", data.Regio);
            oModelSop.setProperty("/Pstlz", data.Pstlz);
            oModelSop.setProperty("/Ort01", data.Ort01);
            oModelSop.setProperty("/Land1Sede", data.Land1);
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      createModelSedeBeneficiario: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();
        var aFilters = [];

        self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);
        self.setFilterEQ(aFilters, "ZspecieSop", oSop.ZspecieSop);
        self.setFilterEQ(aFilters, "ZzCebenra", oSop.ZzCebenra);
        self.setFilterEQ(aFilters, "Witht", oSop.Witht);

        self.getView().setBusy(true);
        oModel.read("/SedeBeneficiarioSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            self.setModel(new JSONModel(data.results), "SedeBeneficiario");
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      checkCasualeValutaria: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/CausaleValutariaSet", {
          ZCausaleval: oSop.ZCausaleval,
        });

        oModel.read(sKey, {
          success: function (data, oResponse) {
            if (self.hasResponseError(oResponse)) {
              oModelSop.setProperty("/ZCausaleval", "");
              oModelSop.setProperty("/ZDesccauval", "");
            }
          },
          error: function () { },
        });
      },

      checkWizard2: function (oWizard) {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility");

        var oParamenters = {
          ZspecieSop: oSop?.ZspecieSop,
          Zwels: oSop?.Zwels,
          Ztipofirma: oSop?.Ztipofirma,
          Iban: oSop?.Iban,
          Zcoordest: oSop?.Zcoordest,
          Zstcd1: oSop?.Zstcd1,
          Zstcd14: oSop?.Zstcd14,
          Zstcd12: oSop?.Zstcd12,
          Zstcd15: oSop?.Zstcd15,
          Zalias: oSop?.Zalias,
          Zzposfinent: oSop?.Zzposfinent,
          Zflagfrutt: oSop?.Zflagfrutt,
          Zimptot: oSop?.Zimptot,
        };

        self.getView().setBusy(true);
        oModel.callFunction("/CheckWizard2Amm", {
          urlParameters: oParamenters,
          success: function (data, oResponse) {
            var aMessage = data?.results;
            if (aMessage.length > 0) {
              self.managementLogFI(aMessage);
              self.getView().setBusy(false);
              return;
            }
            self.getView().setBusy(false);
            oModelUtility.setProperty("/isLogVisible", false);
            oModelStepScenario.setProperty("/wizard2", false);
            oModelStepScenario.setProperty("/wizard3", true);
            oWizard.nextStep();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      //#endregion --------------------------METHODS------------------------------

      //#endregion --------------------------WIZARD 2-----------------------------

      //#region ----------------------------WIZARD 3----------------------------

      onAddRow: function (oEvent) {
        var self = this;
        var oModelClassificazione = self.getModel("Classificazione");

        var oData = oEvent?.getSource()?.data();
        var aListClassificazione = oModelClassificazione.getProperty("/" + oData?.etichetta);

        aListClassificazione.push({
          Zchiavesop: "",
          Bukrs: "",
          Zetichetta: oData?.etichetta,
          Zposizione: "",
          ZstepSop: "",
          Zzcig: "",
          Zzcup: "",
          Zcpv: "",
          ZcpvDesc: "",
          Zcos: "",
          ZcosDesc: "",
          Belnr: "",
          ZimptotClass: "0.00",
          Zflagcanc: "",
          ZstatoClass: "",
          Index: aListClassificazione.length,
        });

        oModelClassificazione.setProperty("/" + oData?.etichetta, aListClassificazione);
      },

      onCancelRow: function (oEvent) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");

        var oSourceData = oEvent?.getSource()?.data();
        var oTableClassificazione = self.getView().byId(oSourceData?.table);

        var aPathSelectedItems = oTableClassificazione.getSelectedContextPaths();

        var aListClassificazione = oModelClassificazione.getProperty("/" + oSourceData?.etichetta);

        //Rimuovo i record selezionati
        aPathSelectedItems.map((sPath) => {
          var oItem = oModelClassificazione.getObject(sPath);
          aListClassificazione.splice(aListClassificazione.indexOf(oItem), 1);
        });

        //Resetto l'index
        aListClassificazione.map((oItem, iIndex) => {
          oItem.Index = iIndex;
        });

        //Rimuovo i record selezionati
        oTableClassificazione.removeSelections();

        oModelClassificazione.setProperty("/" + oSourceData?.etichetta, aListClassificazione);

        //Resetto l'importo totale da associare
        this._setImpTotAssociare(oSourceData?.etichetta);
      },

      onCosChange: function (oEvent) {
        var self = this;
        var oModel = self.getModel();
        var oModelClassificazione = self.getModel("Classificazione");
        var oSop = self.getModel("Sop").getData();
        var aListClassificazione = oModelClassificazione.getProperty("/Cos");

        var oSource = oEvent.getSource();
        var sIndex = oSource.data().index;

        var sKey = oModel.createKey("/CosSet", {
          Gjahr: oSop.Gjahr,
          Zcos: aListClassificazione[sIndex].Zcos,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            aListClassificazione[sIndex].ZcosDesc = data.ZcosDesc;
            oModelClassificazione.setProperty("/Cos", aListClassificazione);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onCpvChange: function (oEvent) {
        var self = this;
        var oModel = self.getModel();
        var oModelClassificazione = self.getModel("Classificazione");
        var aListClassificazione = oModelClassificazione.getProperty("/Cpv");

        var oSource = oEvent.getSource();
        var sIndex = oSource.data().index;

        if (!aListClassificazione[sIndex].Zcpv) {
          aListClassificazione[sIndex].ZcpvDesc = "";
          oModelClassificazione.setProperty("/Cpv", aListClassificazione);
          return;
        }

        var sKey = oModel.createKey("/CpvSet", {
          Zcpv: aListClassificazione[sIndex].Zcpv,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            aListClassificazione[sIndex].ZcpvDesc = data.ZcpvDesc;
            oModelClassificazione.setProperty("/Cpv", aListClassificazione);
            self.hasResponseError(oResponse);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      //#region ----------------------------VALUE HELP--------------------------

      onValueHelpCos: function (oEvent) {
        var self = this;
        var oModel = self.getModel();
        var oModelGestAnag = self.getModel("ZSS4_CO_GEST_ANAGRAFICHE_SRV");
        var oModelSop = self.getModel("Sop").getData();
        var aFilters = [];
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.Cos");
        var oSourceData = oEvent.getSource().data();

        var dCurrentDate = new Date();
        var sCurrentDate = dCurrentDate.getFullYear().toString() + (dCurrentDate.getMonth() + 1).toString() + dCurrentDate.getDate().toString();

        self.setFilterEQ(aFilters, "ANNO", oModelSop?.Gjahr);
        self.setFilterEQ(aFilters, "FASE", "GEST");
        aFilters.push(new Filter("DATBIS", FilterOperator.GE, sCurrentDate));
        aFilters.push(new Filter("DATAB", FilterOperator.LE, sCurrentDate));
        self.setFilterEQ(aFilters, "MC", "X");
        self.setFilterEQ(aFilters, "REALE", "R");

        oModel.read("/UserParamSet('FIK')", {
          success: function (data) {
            self.setFilterEQ(aFilters, "FIKRS", data.ParameterValue);
          },
          error: function () { },
        });

        self.getView().setBusy(true);
        oModelGestAnag.read("/ZES_COD_GEST_SET", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);
            var aCos = [];
            var aData = data.results;
            aData.map((oData) =>
              aCos.push({
                Zcos: oData.CODICE_GESTIONALE,
                ZcosDesc: oData.DESCRIZIONE,
              })
            );

            var oModelJson = new JSONModel();
            oModelJson.setData(aCos);
            var oSelectDialog = sap.ui.getCore().byId("sdCos");
            oSelectDialog?.setModel(oModelJson, "Cos");
            oSelectDialog?.data("index", oSourceData.index);
            oDialog.open();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpCosClose: function (oEvent) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");
        var aListClassificazione = oModelClassificazione.getProperty("/Cos");

        var oSelectedItem = oEvent.getParameter("selectedItem");
        var oSource = oEvent.getSource();
        var sIndex = oSource.data().index;

        if (!oSelectedItem) {
          this.unloadFragment();
          return;
        }

        aListClassificazione[sIndex].Zcos = oSelectedItem.getTitle();
        aListClassificazione[sIndex].ZcosDesc = oSelectedItem.getDescription();
        oModelClassificazione.setProperty("/Cos", aListClassificazione);

        this.unloadFragment();
      },

      onValueHelpCupClassificazione: function (oEvent) {
        var self = this;
        //Load Models
        var oModelCup = self.getModel("ZSS4_COSP_CONTRATTO_SRV");
        var oSourceData = oEvent.getSource().data();
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.CupClassificazione");
        var aFilters = [];

        self.setFilterEQ(aFilters, "Matchcode", "CODICE_CUP");

        oModelCup.read("/MatchCodeContrattoSet", {
          filters: aFilters,
          success: function (data) {
            var aCup = [];
            var aData = data.results;
            aData.map((oData) =>
              aCup.push({
                Zzcup: oData.CodiceCup,
                Belnr: oData.Descrizione,
              })
            );
            var oModelJson = new JSONModel();
            oModelJson.setData(aCup);
            var oSelectDialog = sap.ui.getCore().byId("sdCup");
            oSelectDialog?.setModel(oModelJson, "Cup");
            oSelectDialog?.data("index", oSourceData.index);
            oDialog.open();
          },
          error: function () { },
        });
      },

      onValueHelpCupClassificazioneClose: function (oEvent) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");
        var aListClassificazione = oModelClassificazione.getProperty("/Cup");

        var oSelectedItem = oEvent.getParameter("selectedItem");
        var oSource = oEvent.getSource();
        var sIndex = oSource.data().index;

        if (!oSelectedItem) {
          this.unloadFragment();
          return;
        }

        aListClassificazione[sIndex].Zzcup = oSelectedItem.getTitle();
        aListClassificazione[sIndex].Belnr = oSelectedItem.getDescription();
        oModelClassificazione.setProperty("/Cup", aListClassificazione);

        this.unloadFragment();
      },

      onValueHelpCigClassificazione: function (oEvent) {
        var self = this;
        var oModel = self.getModel();
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.CigClassificazione");
        var oSourceData = oEvent.getSource().data();

        self.getView().setBusy(true);

        oModel.read("/CigMcSet", {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            self.hasResponseError(oResponse);

            var oModelJson = new JSONModel();
            oModelJson.setData(data?.results);
            var oSelectDialog = sap.ui.getCore().byId("sdCigClassificazione");
            oSelectDialog?.setModel(oModelJson, "Cig");
            oSelectDialog?.data("index", oSourceData.index);
            oDialog.open();
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onValueHelpCigClassificazioneClose: async function (oEvent) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");
        var aListClassificazione = oModelClassificazione.getProperty("/Cig");

        var oSelectedItem = oEvent.getParameter("selectedItem");
        var oSource = oEvent.getSource();
        var sIndex = oSource.data().index;

        if (!oSelectedItem) {
          this.unloadFragment();
          return;
        }

        aListClassificazione[sIndex].Zzcig = oSelectedItem.getTitle();
        aListClassificazione[sIndex].Belnr = await this._getCigDescription(oSelectedItem.getTitle());
        oModelClassificazione.setProperty("/Cig", aListClassificazione);
      },

      //#endregion -------------------------VALUE HELP--------------------------

      //#region ----------------------------SELECTION CHANGE--------------------

      onImpDaAssociareChange: function (oEvent) {
        var self = this;
        var oSourceData = oEvent.getSource().data();
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");

        var sValue = oEvent.getParameter("value");
        var aListClassificazione = oModelClassificazione.getProperty("/" + oSourceData?.etichetta);

        if (sValue) {
          aListClassificazione[oSourceData?.index].ZimptotClass = parseFloat(sValue).toFixed(2);
        } else {
          aListClassificazione[oSourceData?.index].ZimptotClass = "0.00";
        }

        oModelClassificazione.setProperty("/" + oSourceData?.etichetta, aListClassificazione);

        this._setImpTotAssociare(oSourceData?.etichetta);
      },

      //#endregion -------------------------SELECTION CHANGE--------------------

      //#region ----------------------------METHODS-----------------------------

      _setImpTotAssociare: function (sEtichetta) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");

        var aListClassificazione = oModelClassificazione.getProperty("/" + sEtichetta);

        var iTotalImpDaAssociare = 0;
        aListClassificazione.map((oItem) => {
          iTotalImpDaAssociare += parseFloat(oItem.ZimptotClass);
        });

        oModelClassificazione.setProperty("/ImpTotAssociare" + sEtichetta, parseFloat(iTotalImpDaAssociare).toFixed(2));
      },

      createModelClassificazione: function () {
        var self = this;

        var oModelClassificazione = new JSONModel({
          Cos: [],
          Cpv: [],
          Cig: [],
          Cup: [],
          ImpTotAssociareCos: "0.00",
          ImpTotAssociareCpv: "0.00",
          ImpTotAssociareCig: "0.00",
          ImpTotAssociareCup: "0.00",
        });

        self.setModel(oModelClassificazione, "Classificazione");
      },

      _getCigDescription: async function (sCig) {
        var self = this;
        var oModel = self.getModel();
        var sKey = oModel.createKey("/CigMcSet", {
          ZcodiCig: sCig,
        });
        self.getView().setBusy(true);
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false);
              if (self.hasResponseError(oResponse)) return;
              resolve(data.Belnr);
            },
            error: function (e) {
              self.getView().setBusy(false);
              reject(e);
            },
          });
        });
      },

      checkClassificazione: function () {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oModelClassificazione = self.getModel("Classificazione");
        var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

        var aListCos = oModelClassificazione.getProperty("/Cos");
        var aListCpv = oModelClassificazione.getProperty("/Cpv");
        var aListCig = oModelClassificazione.getProperty("/Cig");
        var aListCup = oModelClassificazione.getProperty("/Cup");

        //Controllo se sono stati inseriti i Codici Gestionali
        if (aListCos?.length === 0) {
          sap.m.MessageBox.error(oBundle.getText("msgCosRequired"));
          return false;
        }

        //Controllo se i codici sono stati inseriti
        if (this._checkCodiceClassificazione(aListCos, "Zcos")) {
          sap.m.MessageBox.error(oBundle.getText("msgNoZcos"));
          return false;
        }

        //Controllo se i codici sono stati inseriti
        if (this._checkCodiceClassificazione(aListCpv, "Zcpv")) {
          sap.m.MessageBox.error(oBundle.getText("msgNoZcpv"));
          return false;
        }

        //Controllo se i codici sono stati inseriti
        if (this._checkCodiceClassificazione(aListCig, "Zzcig")) {
          sap.m.MessageBox.error(oBundle.getText("msgNoZcig"));
          return false;
        }

        //Controllo se i codici sono stati inseriti
        if (this._checkCodiceClassificazione(aListCup, "Zzcup")) {
          sap.m.MessageBox.error(oBundle.getText("msgNoZcup"));
          return false;
        }

        //Controllo gli importi
        var aListClassificazione = this._getClassificazioneList();

        var bImpZero = false;
        aListClassificazione.map((oClassificazione) => {
          if (oClassificazione.ZimptotClass === "0.00") {
            bImpZero = true;
          }
        });

        if (bImpZero) {
          sap.m.MessageBox.error(oBundle.getText("msgImportiZero"));
          return false;
        }

        //Controllo il totale degli importi con l'importo associato
        var iImpAssociato = parseFloat(oModelSop.getProperty("/Zimptot"));
        var iImpAssociatoCodiceGestione = parseFloat(oModelClassificazione.getProperty("/ImpTotAssociareCos"));
        var iImpCpv = parseFloat(oModelClassificazione.getProperty("/ImpTotAssociareCpv"));
        var iImpCig = parseFloat(oModelClassificazione.getProperty("/ImpTotAssociareCig"));
        var iImpCup = parseFloat(oModelClassificazione.getProperty("/ImpTotAssociareCup"));

        var iTotaImpAssociato = iImpAssociatoCodiceGestione + iImpCpv + iImpCig + iImpCup;

        if (iImpAssociato !== iTotaImpAssociato) {
          sap.m.MessageBox.error(oBundle.getText("msgDifferentImpAssociato", formatter.convertImport(parseFloat(iImpAssociato).toFixed(2))));
          return false;
        }

        oModelSop.setProperty("/Classificazione", aListClassificazione);
        return true;
      },

      _checkCodiceClassificazione: function (aList, sCodice) {
        var bCodiceEmpty = false;
        if (aList.length !== 0) {
          aList.map((oItem) => {
            if (!oItem[sCodice]) {
              bCodiceEmpty = true;
            }
          });
        }

        return bCodiceEmpty;
      },

      _getClassificazioneList: function () {
        var self = this;
        var oModelClassificazione = self.getModel("Classificazione");

        var aListCos = oModelClassificazione.getProperty("/Cos");
        var aListCpv = oModelClassificazione.getProperty("/Cpv");
        var aListCig = oModelClassificazione.getProperty("/Cig");
        var aListCup = oModelClassificazione.getProperty("/Cup");

        var aListClassificazione = [];

        aListCos.map((oCos) => {
          aListClassificazione.push(oCos);
        });

        aListCpv.map((oCpv) => {
          aListClassificazione.push(oCpv);
        });

        aListCig.map((oCig) => {
          aListClassificazione.push(oCig);
        });

        aListCup.map((oCup) => {
          aListClassificazione.push(oCup);
        });

        return aListClassificazione;
      },

      getCig: function () {
        var self = this;
        var oModel = self.getModel();
        var oSop = self.getModel("Sop").getData();
        var oModelClassificazione = self.getModel("Classificazione");
        var aCos = [];
        var aPosition = oSop.Position;
        var aFilters = [];

        aPosition.map((oPosition) => {
          self.setFilterEQ(aFilters, "Belnr", oPosition.Belnr);
        });

        self.getView().setBusy(true);
        oModel.read("/CigMcSet", {
          filters: aFilters,
          success: function (data) {
            self.getView().setBusy(false);

            var aData = data.results;
            aData.map((oData, index) => {
              aCos.push({
                Zchiavesop: "",
                Bukrs: "",
                Zetichetta: "",
                Zposizione: "",
                ZstepSop: "",
                Zzcig: oData.ZcodiCig,
                Zzcup: "",
                Zcpv: "",
                ZcpvDesc: "",
                Zcos: "",
                ZcosDesc: "",
                Belnr: oData.Belnr,
                ZimptotClass: "0.00",
                Zflagcanc: "",
                ZstatoClass: "",
                Index: index,
              });
            });

            oModelClassificazione.setProperty("/Cig", aCos);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      //#endregion -------------------------METHODS------------------------------

      //#endregion -------------------------WIZARD 3----------------------------

      //#region ----------------------------WIZARD 4----------------------------

      onLocPagamentoChange: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
      },

      setLocPagamento: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();

        var sKey = oModel.createKey("/LocPagamentoSet", {
          Regio: oSop.RegioSede,
          Zlocpag: "",
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data) {
            oModelSop.setProperty("/Zlocpag", data.Zlocpag);
            self.getView().setBusy(false);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onSave: async function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        this._registerSop()
        //TODO - Decommentare quando ci saranno tutti i parametri per entrare nel FM chiamo nel FI
        // var sBukrs = await self.getBukrs()

        // self.getView().setBusy(true)
        // oModel.callFunction("/CheckDispCassa", {
        //   urlParameters: {
        //     Bukrs: sBukrs,
        //     Fipos: oSop.Fipos,
        //     Fistl: oSop.Fistl,
        //     Gjahr: oSop.Gjahr,
        //     Zgeber: oSop.Zgeber,
        //     Zimptot: oSop.Zimptot
        //   },
        //   success: function (data) {
        //     console.log(data)
        //     self.getView().setBusy(false)
        //     this._registerSop()
        //     var aMessage = data?.results;
        //     self.getView().setBusy(false);
        //     if (aMessage.length > 0) {
        //       MessageBox.warning("La disponibilità di cassa è sufficiente per l’emissione di un Mandato Informatico. Si vuole procedere con l’emissione del SOP?", {
        //         actions: [MessageBox.Action.CLOSE, MessageBox.Action.OK],
        //         onClose: function (oAction) {
        //           if (oAction === 'OK') {
        //             this._registerSop()
        //             return
        //           }
        //         },
        //       })
        //     }
        //     else {
        //       this._registerSop()
        //     }
        //   },
        //   error: function () {
        //     self.getView().setBusy(false)
        //   }
        // })
      },

      _registerSop: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData()
        var aPosition = oSop.Position
        var aClassificazione = oSop.Classificazione

        var aPosizioniDeep = [];
        var aClassificazioneDeep = [];

        switch (oSop.Ztipopag) {
          case "1": {
            aPosition.map((oPosition) => {
              aPosizioniDeep.push({
                Znumliq: oPosition.Znumliq,
                Zposizione: oPosition.Zposizione,
                Belnr: oPosition.Belnr,
                GjahrDc: oPosition.AnnoRegDoc,
                Xblnr: oPosition.Xblnr,
                Blart: oPosition.Blart,
                Bldat: oPosition.Bldat,
                Zbenalt: oPosition.Zbenalt,
                ZbenaltName: oPosition.ZbenaltName,
                Wrbtr: oPosition.Zimptot,
                Zimppag: oPosition.Zimppag,
                Zimpdaord: oPosition.Zimpdaord,
                Zimptot: oPosition.Zimptot
              })
            })
            break;
          }
          case "2": {
            aPosition.map((oPosition) => {
              aPosizioniDeep.push({
                Zimpres: oPosition.Zimpres,
                Belnr: oPosition.Belnr,
                GjahrDc: oPosition.AnnoRegDoc,
                Xblnr: oPosition.Xblnr,
                Blart: oPosition.Blart,
                Bldat: oPosition.Bldat,
                Zbenalt: oPosition.Zbenalt,
                ZbenaltName: oPosition.ZbenaltName,
                Wrbtr: oPosition.Wrbtr,
                Zimpdaord: oPosition.Zimpdaord,
                Zdurc: oPosition.Zdurc,
                ZfermAmm: oPosition.ZfermAmm
              })
            })
            break;
          }
          case "3": {
            aPosition.map((oPosition) => {
              aPosizioniDeep.push({
                Znumliq: oPosition.Znumliq,
                Zposizione: oPosition.Zposizione,
                Belnr: oPosition.Belnr,
                GjahrDc: oPosition.AnnoRegDoc,
                Blart: oPosition.Blart,
                Bldat: oPosition.Bldat,
                ZbenaltName: oPosition.ZbenaltName,
                Wrbtr: oPosition.Zimptot,
                Zimpdaord: oPosition.Zimpdaord,
              })
            })
            break;
          }
        }


        aClassificazione.map((oClassificazione) => {
          aClassificazioneDeep.push({
            Zetichetta: oClassificazione.Zetichetta,
            Zzcig: oClassificazione.Zzcig,
            Zzcup: oClassificazione.Zzcup,
            Zcpv: oClassificazione.Zcpv,
            ZcpvDesc: oClassificazione.ZcpvDesc.slice(0, 40),
            Zcos: oClassificazione.Zcos,
            ZcosDesc: oClassificazione.ZcosDesc.slice(0, 30),
            Belnr: oClassificazione.Belnr.slice(0, 10),
            ZimptotClass: oClassificazione.ZimptotClass,
          })
        })

        var oSopDeep = {
          Operazione: "Registra",
          Bukrs: "",
          Zchiavesop: "",

          SopAmministrazioneSet: {
            Bukrs: oSop.Bukrs,
            Gjahr: oSop.Gjahr,
            Zchiavesop: oSop.Zchiavesop,
            Zstep: oSop.Zstep,
            Ztipososp: oSop.Ztipososp,
            Zcausale: oSop.Zcausale,
            Zzamministr: oSop.Zzamministr,
            Znumsop: oSop.Znumsop,
            Zragdest: oSop.Zragdest,
            Zdatasop: oSop.Zdatasop,
            ZztipologiaSop: oSop.ZztipologiaSop,
            Lifnr: oSop.Lifnr,
            Ztipopag: oSop.Ztipopag,
            Witht: oSop.Witht,
            ZzCebenra: oSop.ZzCebenra,
            ZufficioCont: oSop.ZufficioCont,
            Zimptot: oSop.Zimptot,
            Fipos: oSop.Fipos,
            Fistl: oSop.Fistl,
            Znumprot: oSop.Znumprot,
            Zdataprot: oSop.Zdataprot,
            ZcodStatosop: oSop.ZcodStatosop,
            ZspecieSop: oSop.ZspecieSop,
            Zricann: oSop.Zricann,
            Capitolo: oSop.Capitolo,
            DescWitht: oSop.DescWitht,
            DescZzcebenra: oSop.DescZzcebenra,
            DescLifnr: oSop.DescLifnr,
            DescStatosop: oSop.DescStatosop,
            DescTipologia: oSop.DescTipologia,
            DescZtipopag: oSop.DescZtipopag,
            DescZwels: oSop.DescZwels,
            Znumliq: oSop.Znumliq,
            ZdescProsp: oSop.ZdescProsp,
            Zprovgiud: oSop.Zprovgiud,
            NameFirst: oSop.NameFirst,
            NameLast: oSop.NameLast,
            ZzragSoc: oSop.ZzragSoc,
            Taxnumcf: oSop.Taxnumcf,
            Taxnum: oSop.Taxnum,
            Type: oSop.Type,
            Taxnumxl: oSop.Taxnumxl,
            Zsede: oSop.Zsede,
            Zdenominazione: oSop.Zdenominazione,
            Zdurc: oSop.Zdurc,
            Zdstatodes: oSop.Zdstatodes,
            Zdscadenza: oSop.Zdscadenza,
            ZfermAmm: oSop.ZfermAmm,
            Zwels: oSop.Zwels,
            Zcoordest: oSop.Zcoordest,
            Swift: oSop.Swift,
            Iban: oSop.Iban,
            ZCausaleval: oSop.ZCausaleval,
            Zpurpose: oSop.Zpurpose,
            Zzposfinent: oSop.Zzposfinent,
            Zflagfrutt: oSop.Zflagfrutt,
            Zcausben: oSop.Zcausben,
            Zalias: oSop.Zalias,
            AccTypeId: oSop.AccTypeId,
            Regio: oSop.Regio,
            ZaccText: oSop.ZaccText,
            Banks: oSop.Banks,
            Ztipofirma: oSop.Ztipofirma,
            ZpersCognomeQuiet1: oSop.ZpersCognomeQuiet1,
            ZpersNomeQuiet1: oSop.ZpersNomeQuiet1,
            ZpersNomeVaglia: oSop.ZpersNomeVaglia,
            ZpersCognomeVaglia: oSop.ZpersCognomeVaglia,
            Zstcd1: oSop.Zstcd1,
            Zstcd14: oSop.Zstcd14,
            Zqindiriz: oSop.Zqindiriz,
            Zqcitta: oSop.Zqcitta,
            Zqcap: oSop.Zqcap,
            Zqprovincia: oSop.Zqprovincia,
            ZqragSoc: oSop.ZqragSoc,
            Land1: oSop.Land1,
            ZpersCognomeQuiet2: oSop.ZpersCognomeQuiet2,
            ZpersNomeQuiet2: oSop.ZpersNomeQuiet2,
            Zstcd12: oSop.Zstcd12,
            Zstcd15: oSop.Zstcd15,
            Zqindiriz2: oSop.Zqindiriz2,
            Zqcitta2: oSop.Zqcitta2,
            Zqcap2: oSop.Zqcap2,
            Zqprovincia2: oSop.Zqprovincia2,
            Land2: oSop.Land2,
            Zcodprov: oSop.Zcodprov,
            Zcfcommit: oSop.Zcfcommit,
            Zcodtrib: oSop.Zcodtrib,
            Zperiodrifda: oSop.Zperiodrifda,
            Zperiodrifa: oSop.Zperiodrifa,
            Zcodinps: oSop.Zcodinps,
            Zcodvers: oSop.Zcodvers,
            Zcfvers: oSop.Zcfvers,
            Zdescvers: oSop.Zdescvers,
            Zdatavers: oSop.Zdatavers,
            Zprovvers: oSop.Zprovvers,
            Zsedevers: oSop.Zsedevers,
            Zibanb: oSop.Zibanb,
            Zbicb: oSop.Zbicb,
            Zcoordestb: oSop.Zcoordestb,
            Zdenbanca: oSop.Zdenbanca,
            Zclearsyst: oSop.Zclearsyst,
            StrasBanca: oSop.StrasBanca,
            Zcivico: oSop.Zcivico,
            Ort01Banca: oSop.Ort01Banca,
            RegioBanca: oSop.RegioBanca,
            PstlzBanca: oSop.PstlzBanca,
            Zibani: oSop.Zibani,
            Zbici: oSop.Zbici,
            Zcoordesti: oSop.Zcoordesti,
            Zclearsysti: oSop.Zclearsysti,
            Zclearsysti: oSop.Zclearsysti,
            Zstrasi: oSop.Zstrasi,
            Zcivicoi: oSop.Zcivicoi,
            Zort01i: oSop.Zort01i,
            Zregioi: oSop.Zregioi,
            Zpstlzi: oSop.Zpstlzi,
            Zland1i: oSop.Zland1i,
            Zlocpag: oSop.Zlocpag,
            Zzonaint: oSop.Zzonaint,
            ZE2e: oSop.ZE2e,
            Stras: oSop.Stras,
            Ort01: oSop.Ort01,
            RegioSede: oSop.RegioSede,
            Pstlz: oSop.Pstlz,
            Land1Sede: oSop.Land1Sede,
            Zquoteesi: oSop.Zquoteesi,
            Zfunzdel: oSop.Zfunzdel,
            Zgeber: oSop.Zgeber,
            ZimptotDivisa: oSop.ZimptotDivisa,
            Zidsede: oSop.Zidsede,
            Zmotivaz: oSop.Zmotivaz,
            Kostl: oSop.Kostl,
            Hkont: oSop.Hkont,
            Znumquiet: oSop.Znumquiet,
            Znumquiet2: oSop.Znumquiet2,
            Ztipoprovv: oSop.Ztipoprovv,
            Zautemit: oSop.Zautemit,
            Zdataprovv: oSop.Zdataprovv,
            Znprovv: oSop.Znprovv,
            Seqnr: oSop.Seqnr
          },

          PosizioniSopSet: aPosizioniDeep,
          ClassificazioneSopSet: aClassificazioneDeep,
          SopMessageSet: []
        }

        self.getView().setBusy(true)

        oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
          success: function (data) {
            console.log(data)
            self.getView().setBusy(false)
            var aMessage = data?.SopMessageSet?.results;
            if (aMessage.length > 0) {
              if (aMessage.length === 1) {
                if (aMessage[0]?.Body?.Msgty === 'E') {
                  MessageBox.error(aMessage[0]?.Body?.Message);
                }
                else if (aMessage[0]?.Body?.Msgty === 'S') {
                  MessageBox.success(aMessage[0]?.Body?.Message, {
                    actions: [MessageBox.Action.CLOSE],
                    onClose: function () {
                      self.getRouter().navTo("amm.home", {
                        Reload: true,
                      });
                    },
                  });

                }
                return;
              }

              aMessage.map((oMessage) => {
                aMessageFormatted.push({
                  Msgid: oMessage?.Body?.Msgid,
                  Msgty: oMessage?.Body?.Msgty,
                  Msgno: oMessage?.Body?.Msgno,
                  Message: oMessage?.Body?.Message,
                });
              });

              oModelUtility.setProperty("/isLogVisible");
              self.setModel(new JSONModel(aMessageFormatted), "Log");
              MessageBox.error("Operazione non eseguita correttamente");
              return;
            }

          },
          error: function () {
            self.getView().setBusy(false)
          },
        });
      },

      //#endregion -------------------------WIZARD 4----------------------------

      setDataBeneficiario(sLifnr) {
        var self = this;
        var oModel = self.getModel();
        var oModelSop = self.getModel("Sop");

        if (!sLifnr) {
          oModelSop.setProperty("/BuType", "");
          oModelSop.setProperty("/NameFirst", "");
          oModelSop.setProperty("/NameLast", "");
          oModelSop.setProperty("/TaxnumCf", "");
          oModelSop.setProperty("/Taxnum", "");
          oModelSop.setProperty("/Taxnumxl", "");
          oModelSop.setProperty("/Zdurc", "");
          oModelSop.setProperty("/Zdstatodes", "");
          oModelSop.setProperty("/Zdscadenza", "");
          oModelSop.setProperty("/ZfermAmm", "");
          return;
        }

        var sKey = oModel.createKey("/BeneficiarioSet", {
          Lifnr: sLifnr,
        });

        self.getView().setBusy(true);
        oModel.read(sKey, {
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (self.hasResponseError(oResponse)) {
              oModelSop.setProperty("/Lifnr", "");
              oModelSop.setProperty("/ZspecieSop", "");
              oModelSop.setProperty("/DescZspecieSop", "");
            }
            oModelSop.setProperty("/BuType", data?.Type);
            oModelSop.setProperty("/NameFirst", data?.NameFirst);
            oModelSop.setProperty("/NameLast", data?.NameLast);
            oModelSop.setProperty("/TaxnumCf", data?.TaxnumCf);
            oModelSop.setProperty("/Taxnum", data?.TaxnumPiva);
            oModelSop.setProperty("/Taxnumxl", data?.TaxnumxlCfe);
            oModelSop.setProperty("/Zdurc", data?.Zdurc);
            oModelSop.setProperty("/Zdstatodes", data?.Zdstatodes);
            oModelSop.setProperty("/Zdscadenza", data?.Zdscadenza);
            oModelSop.setProperty("/ZfermAmm", data?.ZfermAmm);
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onBeneficiarioChange: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSop = oModelSop.getData();
        var oStepScenario = self.getModel("StepScenario").getData();

        if (!oStepScenario.wizard2) {
          oModelSop.setProperty("/Zquoteesi", false);
          self._createModelAnnoDocBen();
          if (!oEvent.getParameter("value")) {
            oModelSop.setProperty("/ZspecieSop", "");
            oModelSop.setProperty("/DescZspecieSop", "");
          } else {
            self._setSpecieSop("1");
          }
        }

        if (oSop.Ztipopag === "4") {
          self.createModelModPagamento()
        }

        this.setDataBeneficiario(oEvent.getParameter("value"));
      },

      functionReturnValueMC: function (obj) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility");

        if (obj?.Iban && obj?.Banks) {
          if (oModelUtility.getProperty("/isIbanPrevalorizzato")) {
            var oDialogMotivazione = self.loadFragment("gestionesop.view.fragment.amm.wizard2.MotivazioneIban");
            oDialogMotivazione.open();
          }

          self.checkIban();
          self.setDataIban();
          return;
        }

        if (obj?.Lifnr) {


          if (!oStepScenario.wizard2) {
            self._createModelAnnoDocBen();
            oModelSop.setProperty("/Zquoteesi", false);
            self._setSpecieSop("1");
          }

          if (oSop.Ztipopag === "4") {
            self.createModelModPagamento()
          }
          this.setDataBeneficiario(obj?.Lifnr);
          return;
        }

        if (obj?.Zalias) {
          oModelSop.setProperty("/Zalias", obj.Zalias);
          oModelSop.setProperty("/ZaccText", obj.ZaccText);
          oModelSop.setProperty("/AccTypeId", obj.AccTypeId);
          oModelSop.setProperty("/RegioConto", obj.Zregio);
          this.setIban();
          return;
        }

        if (obj?.ZCausaleval) {
          oModelSop.setProperty("/ZCausaleval", obj?.ZCausaleval);
          oModelSop.setProperty("/ZDesccauval", obj?.ZDesccauval);
          return;
        }

        if (obj?.Zcodtrib) {
          oModelSop.setProperty("/Zcodinps", obj.Zcodinps);
          oModelSop.setProperty("/Zperiodrifa", obj.Zperiodrifa ? obj.Zperiodrifa : null);
          oModelSop.setProperty("/Zperiodrifda", obj.Zperiodrifda ? obj.Zperiodrifda : null);
          return;
        }
      },

      //#region ---------------CREAZIONE ANAGRAFICA/PAGAMENTO------------------/
      functionReturnValueAnag: function (obj) {
        var oData = obj?.data;
        var aDataQuietaVaglia = obj?.data?.QuietVaglia?.results;
        var self = this;
        var oModelSop = self.getModel("Sop");

        if (oData.MessageType !== "S") {
          return;
        }

        //Dati beneficiario
        oModelSop.setProperty("/Lifnr", oData.Lifnr);
        oModelSop.setProperty("/BuType", oData.Type);
        oModelSop.setProperty("/TaxnumCf", oData.Stcd1);
        oModelSop.setProperty("/Taxnum", oData.Stcd2);
        oModelSop.setProperty("/Taxnumxl", oData.Stcd3);
        oModelSop.setProperty("/NameFirst", oData.Name);
        oModelSop.setProperty("/NameLast", oData.Surname);
        oModelSop.setProperty("/ZzragSoc", oData.Ragsoc);
        oModelSop.setProperty("/Zdurc", oData.Durc);
        oModelSop.setProperty("/Zdstatodes", oData.Statodurc);
        oModelSop.setProperty("/Zdscadenza", oData.Scadenzadurc);
        oModelSop.setProperty("/ZfermAmm", oData.ZfermAmm);

        //Modalita di pagamento
        oModelSop.setProperty("/Banks", oData.CountryRes);
        oModelSop.setProperty("/Zwels", oData.Zwels);
        oModelSop.setProperty("/Zdescwels", oData.Zdescwels);
        oModelSop.setProperty("/Swift", oData.Swift);
        oModelSop.setProperty("/Zcoordest", oData.Zcoordest);
        oModelSop.setProperty("/Iban", oData.Iban);
        oModelSop.setProperty("/Ztipofirma", oData.Ztipofirma);

        //Banca Accredito
        oModelSop.setProperty("/Zibanb", oData.Zibanb);
        oModelSop.setProperty("/Zbicb", oData.Zbicb);
        oModelSop.setProperty("/Zcoordestb", oData.Zcoordestb);
        oModelSop.setProperty("/Zdenbancab", oData.Zdenbanca);
        oModelSop.setProperty("/Zclearsystb", oData.Zclearsyst);
        oModelSop.setProperty("/StrasBanca", oData.Stras);
        oModelSop.setProperty("/Zcivico", oData.Zcivico);
        oModelSop.setProperty("/Ort01Banca", oData.Ort01);
        oModelSop.setProperty("/RegioBanca", oData.Regio);
        oModelSop.setProperty("/PstlzBanca", oData.Stlz);
        oModelSop.setProperty("/Land1Banca", oData.Land1);

        //Intermediario 1
        oModelSop.setProperty("/Zibani", oData.Zibani);
        oModelSop.setProperty("/Zbici", oData.Zbici);
        oModelSop.setProperty("/Zcoordesti", oData.Zcoordesti);
        oModelSop.setProperty("/Zdenbancai", oData.Zdenbancai);
        oModelSop.setProperty("/Zclearsysti", oData.Zclearsysti);
        oModelSop.setProperty("/Zstrasi", oData.Zstrasi);
        oModelSop.setProperty("/Zcivicoi", oData.Zcivicoi);
        oModelSop.setProperty("/Zort01i", oData.Zort01i);
        oModelSop.setProperty("/Zregioi", oData.Zregioi);
        oModelSop.setProperty("/Zpstlzi", oData.Zpstlzi);
        oModelSop.setProperty("/Zland1i", oData.Zland1i);

        //Sede beneficiario
        oModelSop.setProperty("/Ort01", oData.City);
        oModelSop.setProperty("/RegioSede", oData.Region);
        oModelSop.setProperty("/Pstlz", oData.Pstlz);
        oModelSop.setProperty("/Land1Sede", oData.Country);
        oModelSop.setProperty("/Stras", oData.Street + ", " + oData.Housenum);

        this._setDatiQuagliaVaglia(aDataQuietaVaglia, false);
      },

      functionReturnValueModPag: function (obj) {
        var aDataQuietaVaglia = obj?.data?.QuietVaglia?.results;
        var oData = obj?.data;

        if (oData.MessageType !== "S" || aDataQuietaVaglia.length === 0) {
          return;
        }

        this._setDatiQuagliaVaglia(aDataQuietaVaglia, true);
      },

      _setDatiQuagliaVaglia: function (aData, bModPag) {
        var self = this;
        var oModelSop = self.getModel("Sop");

        aData.map((oData) => {
          if (oData.TipVis === "P" && bModPag) {
            oModelSop.setProperty("/Banks", oData.Country_res);
            oModelSop.setProperty("/Zwels", oData.Zwels);
            oModelSop.setProperty("/Zdescwels", oData.Zdescwels);
            oModelSop.setProperty("/Swift", oData.Swift);
            oModelSop.setProperty("/Zcoordest", oData.Zcoordest);
            oModelSop.setProperty("/Iban", oData.Iban);
            oModelSop.setProperty("/Ztipofirma", oData.Ztipofirma);

            //Banca Accredito
            oModelSop.setProperty("/Zibanb", oData.Zibanb);
            oModelSop.setProperty("/Zbicb", oData.Zbicb);
            oModelSop.setProperty("/Zcoordestb", oData.Zcoordestb);
            oModelSop.setProperty("/Zdenbancab", oData.Zdenbanca);
            oModelSop.setProperty("/Zclearsystb", oData.Zclearsyst);
            oModelSop.setProperty("/StrasBanca", oData.Stras);
            oModelSop.setProperty("/Zcivico", oData.Zcivico);
            oModelSop.setProperty("/Ort01Banca", oData.Ort01);
            oModelSop.setProperty("/RegioBanca", oData.Regio);
            oModelSop.setProperty("/PstlzBanca", oData.Stlz);
            oModelSop.setProperty("/Land1Banca", oData.Land1);

            //Intermediario 1
            oModelSop.setProperty("/Zibani", oData.Zibani);
            oModelSop.setProperty("/Zbici", oData.Zbici);
            oModelSop.setProperty("/Zcoordesti", oData.Zcoordesti);
            oModelSop.setProperty("/Zdenbancai", oData.Zdenbancai);
            oModelSop.setProperty("/Zclearsysti", oData.Zclearsysti);
            oModelSop.setProperty("/Zstrasi", oData.Zstrasi);
            oModelSop.setProperty("/Zcivicoi", oData.Zcivicoi);
            oModelSop.setProperty("/Zort01i", oData.Zort01i);
            oModelSop.setProperty("/Zregioi", oData.Zregioi);
            oModelSop.setProperty("/Zpstlzi", oData.Zpstlzi);
            oModelSop.setProperty("/Zland1i", oData.Zland1i);
          } else if (oData.TipVis === "D") {
            //Se D = Destinatario
            oModelSop.setProperty("/ZpersNomeVaglia", oData.ZQNome);
            oModelSop.setProperty("/ZpersCognomeVaglia", oData.ZQCognome);
            oModelSop.setProperty("/Zstcd11", oData.Stcd3);
            oModelSop.setProperty("/Zqindiriz", oData.ZQIndiriz);
            oModelSop.setProperty("/Zqcitta", oData.ZQCitta);
            oModelSop.setProperty("/Zqcap", oData.ZQCAP);
            oModelSop.setProperty("/Zqprovincia", oData.ZQProvincia);
            oModelSop.setProperty("/Land1", oData.Land1);
            oModelSop.setProperty("/ZqragSoc", oData.Zzrag_soc);
          } else if (oData.TipVis === "Q") {
            //Se Q = Quietanzante
            //Se non sono valorizzati sia il CF del primo quietanzante e sia
            //il CF del destinatario vuol dire che quello inserito è il primo
            //quietanzante
            if (!oModelSop.getProperty("/Zstcd1")) {
              oModelSop.setProperty("/ZpersNomeQuiet1", oData.ZQNome);
              oModelSop.setProperty("/ZpersCognomeQuiet1", oData.ZQCognome);
              oModelSop.setProperty("/Zstcd1", oData.Stcd1);
              oModelSop.setProperty("/Zqindiriz", oData.ZQIndiriz);
              oModelSop.setProperty("/Zqcitta", oData.ZQCitta);
              oModelSop.setProperty("/Zqcap", oData.ZQCAP);
              oModelSop.setProperty("/Zqprovincia", oData.ZQProvincia);
              oModelSop.setProperty("/Land1", oData.Zzrag_soc);
              oModelSop.setProperty("/ZqragSoc", oData.Land1);
            } else {
              oModelSop.setProperty("/ZpersCognomeQuiet2", oData.ZQCognome);
              oModelSop.setProperty("/ZpersNomeQuiet2", oData.ZQNome);
              oModelSop.setProperty("/Zstcd2", oData.Stcd2);
              oModelSop.setProperty("/Zqindiriz2", oData.ZQIndiriz);
              oModelSop.setProperty("/Zqcitta2", oData.ZQCitta);
              oModelSop.setProperty("/Zqcap2", oData.ZQCAP);
              oModelSop.setProperty("/Zqprovincia2", oData.ZQProvincia);
              oModelSop.setProperty("/Land2", oData.Land1);
            }
          }
        });
      },

      //#endregion ------------CREAZIONE ANAGRAFICA/PAGAMENTO------------------/
    });
  }
);
