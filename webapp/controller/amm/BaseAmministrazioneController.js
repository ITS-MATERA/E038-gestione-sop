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

    createModelFiltersWizard1: function () {
      var self = this;
      var oModelFilters = new JSONModel({
        BuType: "",
        ZdatesiFrom: null,
        ZdatesiTo: null,
      });

      self.setModel(oModelFilters, "FiltersWizard1");
    },

    onQuoteEsigibiliChange: function () {
      var self = this;
      var oModelFilter = self.getModel("FiltersWizard1");

      oModelFilter.setProperty("/ZdatesiFrom", null);
      oModelFilter.setProperty("/ZdatesiTo", null);
    },
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
          console.log(data);
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
        },
        error: function () {
          self.getView().setBusy(false);
        },
      });
    },

    onBeneficiarioChange: function (oEvent) {
      this.setDataBeneficiario(oEvent.getParameter("value"));
    },

    functionReturnValueMC: function (obj) {
      console.log(obj);
      if (obj?.Lifnr) {
        this.setDataBeneficiario(obj?.Lifnr);
      }
    },
  });
});
