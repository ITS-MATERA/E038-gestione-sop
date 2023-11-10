sap.ui.define(["../BaseController", "sap/ui/model/json/JSONModel", "../../model/formatter"], function (BaseController, JSONModel, formatter) {
  "use strict";

  return BaseController.extend("gestionesop.controller.amm.BaseAmministrazioneController", {
    formatter: formatter,

    onInit: function () {},

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
        Zimptot: "",
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
        Zdscadenza: "",
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
        Zperiodrifda: "",
        Zperiodrifa: "",
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
        Position: [],

        DescZspecieSop: "",
      });

      self.setModel(oModelSop, "Sop");
    },

    //#region ----------------------------WIZARD 1------------------------------

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
        BuType: "",
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

    //#region ---------------------VALUE HELP-----------------------------------

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

      // oModelFilters.setProperty("/Zuffliq", []);

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

    //#region -------------------SELECTION CHANGE-------------------------------

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

    //#endregion ----------------SELECTION CHANGE-------------------------------

    //#region ------------------------METHODS-----------------------------------

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

    //#endregion ---------------------METHODS-----------------------------------

    //#endregion -------------------------WIZARD 1------------------------------

    setDataBeneficiario(sLifnr) {
      var self = this;
      var oModel = self.getModel();
      var oModelFilters = self.getModel("FiltersWizard1");
      var oModelSop = self.getModel("Sop");

      if (!sLifnr) {
        oModelFilters.setProperty("/BuType", "");
        oModelSop.setProperty("/NameFirst", "");
        oModelSop.setProperty("/NameLast", "");
        oModelSop.setProperty("/TaxnumCf", "");
        oModelSop.setProperty("/Taxnum", "");
        oModelSop.setProperty("/Taxnumxl", "");
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
            oModelFilters.setProperty("/Lifnr", "");
            oModelSop.setProperty("/ZspecieSop", "");
            oModelSop.setProperty("/DescZspecieSop", "");
          }
          oModelFilters.setProperty("/BuType", data?.Type);
          oModelSop.setProperty("/NameFirst", data?.NameFirst);
          oModelSop.setProperty("/NameLast", data?.NameLast);
          oModelSop.setProperty("/TaxnumCf", data?.TaxnumCf);
          oModelSop.setProperty("/Taxnum", data?.TaxnumPiva);
          oModelSop.setProperty("/Taxnumxl", data?.TaxnumxlCfe);
          self._createModelAnnoDocBen();
        },
        error: function () {
          self.getView().setBusy(false);
        },
      });
    },

    onBeneficiarioChange: function (oEvent) {
      var self = this;
      var oModelSop = self.getModel("Sop");
      oModelSop.setProperty("/Zquoteesi", false);
      this.setDataBeneficiario(oEvent.getParameter("value"));
    },

    functionReturnValueMC: function (obj) {
      var self = this;
      var oModelSop = self.getModel("Sop");

      if (obj?.Lifnr) {
        oModelSop.setProperty("/Zquoteesi", false);
        this.setDataBeneficiario(obj?.Lifnr);
      }
    },
  });
});
