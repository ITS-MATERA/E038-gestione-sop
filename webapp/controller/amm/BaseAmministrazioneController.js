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
        BuType: "",
        //Primo quietanzante
        Zqindiriz: "",
        Zqcitta: "",
        Zqcap: "",
        Zqprovincia: "",
        Land1Quietanzante: "",
        ZzragSocQuietanzante: "",
        NumquietInitial1: false,
        //Secondo quietanzante
        Zqindiriz12: "",
        Zqcitta12: "",
        Zqcap12: "",
        Zqprovincia12: "",
        Land1Quietanzante2: "",
        NumquietInitial2: false,
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
      if (!oSelectedItem?.getTitle()) {
        oModelSop.setProperty("/ZspecieSop", "");
        oModelSop.setProperty("/DescZspecieSop", "");
      } else {
        self._setSpecieSop("2");
      }
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

    onRitenutaChange: function (oEvent) {
      var self = this;
      var oModelSop = self.getModel("Sop");

      if (!oEvent.getParameter("selectedItem").getSelectedKey()) {
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

    //#endregion ---------------------METHODS-----------------------------------

    //#endregion -------------------------WIZARD 1------------------------------

    //#region ----------------------------WIZARD 2------------------------------

    createModelModPagamento: function () {
      var self = this;
      var oSop = self.getModel("Sop").getData();
      var oModel = self.getModel();
      var aFilters = [];

      self.setFilterEQ(aFilters, "Lifnr", oSop.Lifnr);
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
        error: function (error) {},
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
        error: function (error) {},
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
        error: function (error) {},
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
        error: function (error) {},
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
          oModelSop.setProperty("/RegioConto", data.Regio);
          oModelSop.setProperty("/ZaccText", data.ZaccText);
        },
        error: function () {},
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
        Json: "",
      });

      self.getView().setBusy(true);
      oModel.read(sKey, {
        urlParameters: {
          AliasRgs: oSop.Zalias,
        },
        success: function (data, oResponse) {
          self.getView().setBusy(false);
          oModelSop.setProperty("/Iban", data?.Iban);
          self.hasResponseError(oResponse);
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
      oModelSop.setProperty("/Zstcd13", "");
      oModelSop.setProperty("/Zqindiriz", "");
      oModelSop.setProperty("/Zqcitta", "");
      oModelSop.setProperty("/Zqcap", "");
      oModelSop.setProperty("/Zqprovincia", "");
      oModelSop.setProperty("/Zstcd14", "");
      oModelSop.setProperty("/Land1Quietanzante", "");
      oModelSop.setProperty("/ZzragSocQuietanzante", "");
      oModelSop.setProperty("/Znumquiet", "");
      oModelSop.setProperty("/NumquietInitial1", false);
    },

    resetQuietanzante2: function () {
      var self = this;
      var oModelSop = self.getModel("Sop");

      oModelSop.setProperty("/ZpersCognomeQuiet2", "");
      oModelSop.setProperty("/ZpersNomeQuiet2", "");
      oModelSop.setProperty("/Zstcd12", "");
      oModelSop.setProperty("/Zqindiriz12", "");
      oModelSop.setProperty("/Zqcitta12", "");
      oModelSop.setProperty("/Zqcap12", "");
      oModelSop.setProperty("/Zqprovincia12", "");
      oModelSop.setProperty("/Zstcd15", "");
      oModelSop.setProperty("/Land1Quietanzante2", "");
      oModelSop.setProperty("/Znumquiet2", "");
    },

    _setDataQuietanzante1: function (sCodiceFiscale) {
      var self = this;
      var oModel = self.getModel();
      var oModelSop = self.getModel("Sop");
      var oSop = oModelSop.getData();

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
          if (oSop.Zwels === "ID1") {
            oModelSop.setProperty("/Zstcd1", data.Zstcd1);
          } else {
            oModelSop.setProperty("/Zstcd13", data.Zstcd1);
          }
          oModelSop.setProperty("/ZpersCognomeQuiet1", data.ZpersCognomeQuiet1);
          oModelSop.setProperty("/ZpersNomeQuiet1", data.ZpersNomeQuiet1);
          oModelSop.setProperty("/ZpersCognomeVaglia", data.ZpersCognomeVaglia);
          oModelSop.setProperty("/ZpersNomeVaglia", data.ZpersNomeVaglia);
          oModelSop.setProperty("/Land1Quietanzante", data.Land1);
          oModelSop.setProperty("/Zqcap", data.Zqcap);
          oModelSop.setProperty("/Zqcitta", data.Zqcitta);
          oModelSop.setProperty("/Zqindiriz", data.Zqindiriz);
          oModelSop.setProperty("/Zqprovincia", data.Zqprovincia);
          oModelSop.setProperty("/ZzragSocQuietanzante", data.ZzragSoc);
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
          oModelSop.setProperty("/Land1Quietanzante2", data.Land1);
          oModelSop.setProperty("/Zqcap12", data.Zqcap);
          oModelSop.setProperty("/Zqcitta12", data.Zqcitta);
          oModelSop.setProperty("/Zqindiriz12", data.Zqindiriz);
          oModelSop.setProperty("/Zqprovincia12", data.Zqprovincia);
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
          oModelSop.setProperty("/Land1Quietanzante", data.Land1);
          oModelSop.setProperty("/Zqcap", data.Zqcap);
          oModelSop.setProperty("/Zqcitta", data.Zqcitta);
          oModelSop.setProperty("/Zqindiriz", data.Zqindiriz);
          oModelSop.setProperty("/Zqprovincia", data.Zqprovincia);
          oModelSop.setProperty("/ZzragSocQuietanzante", data.ZzragSoc);
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
          oModelSop.setProperty("/Land1Quietanzante2", data.Land1);
          oModelSop.setProperty("/Zqcap12", data.Zqcap);
          oModelSop.setProperty("/Zqcitta12", data.Zqcitta);
          oModelSop.setProperty("/Zqindiriz12", data.Zqindiriz);
          oModelSop.setProperty("/Zqprovincia12", data.Zqprovincia);
          oModelSop.setProperty("/Znumquiet2", data.Znumquiet);
          self.hasResponseError(oResponse);
        },
        error: function () {
          self.getView().setBusy(false);
        },
      });
    },

    //#endregion --------------------------METHODS------------------------------

    //#endregion -------------------------WIZARD 2------------------------------

    setDataBeneficiario(sLifnr) {
      var self = this;
      var oModel = self.getModel();
      var oModelFilters = self.getModel("FiltersWizard1");
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
            oModelFilters.setProperty("/Lifnr", "");
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
      oModelSop.setProperty("/Zquoteesi", false);
      self._createModelAnnoDocBen();
      if (!oEvent.getParameter("value")) {
        oModelSop.setProperty("/ZspecieSop", "");
        oModelSop.setProperty("/DescZspecieSop", "");
      } else {
        self._setSpecieSop("1");
      }
      this.setDataBeneficiario(oEvent.getParameter("value"));
    },

    functionReturnValueMC: function (obj) {
      var self = this;
      var oModelSop = self.getModel("Sop");
      console.log(obj);

      if (obj?.Iban && obj?.Banks) {
        self.setPaeseResidenza();
        return;
      }

      if (obj?.Lifnr) {
        self._createModelAnnoDocBen();
        oModelSop.setProperty("/Zquoteesi", false);
        self._setSpecieSop("1");
        this.setDataBeneficiario(obj?.Lifnr);
        return;
      }

      if (obj?.Zalias && obj?.Iban) {
        oModelSop.setProperty("/Zalias", obj.Zalias);
        oModelSop.setProperty("/ZaccText", obj.ZaccText);
        oModelSop.setProperty("/AccTypeId", obj.AccTypeId);
        oModelSop.setProperty("/RegioConto", obj.Zregio);
        oModelSop.setProperty("/Iban", obj.Iban);
        return;
      }
    },
  });
});
