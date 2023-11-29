sap.ui.define(
  ["../BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"],
  function (BaseController, Filter, FilterOperator, JSONModel, formatter, Spreadsheet, exportLibrary) {
    "use strict";

    return BaseController.extend("gestionesop.controller.rag.Detail", {
      formatter: formatter,

      onInit: async function () {
        this.getRouter().getRoute("rag.detail").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;

        var oParameters = oEvent.getParameter("arguments");
        self.setModelSop(oParameters)
      },

      setModelSop: async function (oParameters) {
        var self = this;

        var oSop = await self._getSop(oParameters)

        var oModelSop = new JSONModel({
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
          Zdatarichann: oSop.Zdatarichann,
          Capitolo: oSop.Capitolo,
          DescWitht: oSop.DescWitht,
          DescZzcebenra: oSop.DescZzcebenra,
          DescLifnr: oSop.DescLifnr,
          DescStatosop: oSop.DescStatosop,
          DescTipologia: oSop.DescTipologia,
          DescZtipopag: oSop.Ztipopag,
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
          Zperiodrifda: oSop.Zperiodrifa,
          Zperiodrifa: oSop.Zperiodrifda,
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
          Zdenbancai: oSop.Zdenbancai,
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
          Seqnr: oSop.Seqnr,
          ZdirigenteAmm: oSop.ZdirigenteAmm,
          DescKostl: oSop.DescKostl,
          DescHkont: oSop.DescHkont,
          DescZspecieSop: oSop?.DescZspecie,

          DescZmissione: oSop.DescZmissione,
          DescZprogramma: oSop.DescZprogramma,
          DescZazione: oSop.DescZazione,
          DescCapitolo: oSop.DescCapitolo,
          DescPianoGest: oSop.DescPianoGest
        });

        self.setModel(oModelSop, "Sop");
        return oModelSop
      },

      _getSop: async function (oParameters) {
        var self = this;
        var oModel = self.getModel();
        var sKey = self.getModel().createKey("/SopAmministrazioneSet", {
          Gjahr: oParameters.Gjahr,
          Zchiavesop: oParameters.Zchiavesop,
          Bukrs: oParameters.Bukrs,
          Zstep: oParameters.Zstep,
          Ztipososp: oParameters.Ztipososp,
        });

        self.getView().setBusy(true)
        return new Promise(async function (resolve, reject) {
          await oModel.read(sKey, {
            success: function (data, oResponse) {
              self.getView().setBusy(false)
              self.hasResponseError(oResponse)
              resolve(data)
            },
            error: function () {
              self.getView().setBusy(false)
            }
          })
        })
      },
    });
  })
