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

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizDetail");
        var oModelStepScenario = self.getModel("StepScenario");

        var bWizard1 = oModelStepScenario.getProperty("/Wizard1");
        var bWizard2 = oModelStepScenario.getProperty("/Wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/Wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/Wizard4");
        var bWizard5 = oModelStepScenario.getProperty("/Wizard5");
        var bWizard6 = oModelStepScenario.getProperty("/Wizard6");
        var bWizard7 = oModelStepScenario.getProperty("/Wizard7");

        if (bWizard1) {
          self.getRouter().navTo("rag.home");
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/Wizard2", false);
          oModelStepScenario.setProperty("/Wizard1", true);
          oWizard.previousStep();
        } else if (bWizard3) {
          oModelStepScenario.setProperty("/Wizard3", false);
          oModelStepScenario.setProperty("/Wizard2", true);
          oWizard.previousStep();
        } else if (bWizard4) {
          oModelStepScenario.setProperty("/Wizard4", false);
          oModelStepScenario.setProperty("/Wizard3", true);
          oWizard.previousStep();
        } else if (bWizard5) {
          oModelStepScenario.setProperty("/Wizard5", false);
          oModelStepScenario.setProperty("/Wizard4", true);
          oWizard.previousStep();
        } else if (bWizard6) {
          oModelStepScenario.setProperty("/Wizard6", false);
          oModelStepScenario.setProperty("/Wizard5", true);
          oWizard.previousStep();
        } else if (bWizard7) {
          oModelStepScenario.setProperty("/Wizard7", false);
          oModelStepScenario.setProperty("/Wizard6", true);
          oWizard.previousStep();
        }
      },

      onNavForward: async function () {
        var self = this;
        var oWizard = self.getView().byId("wizDetail");
        var oModelStepScenario = self.getModel("StepScenario");

        var bWizard1 = oModelStepScenario.getProperty("/Wizard1");
        var bWizard2 = oModelStepScenario.getProperty("/Wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/Wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/Wizard4");
        var bWizard5 = oModelStepScenario.getProperty("/Wizard5");
        var bWizard6 = oModelStepScenario.getProperty("/Wizard6");

        if (bWizard1) {
          oModelStepScenario.setProperty("/Wizard1", false);
          oModelStepScenario.setProperty("/Wizard2", true);
          oWizard.nextStep()
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/Wizard2", false);
          oModelStepScenario.setProperty("/Wizard3", true);
          oWizard.nextStep()
        } else if (bWizard3) {
          oModelStepScenario.setProperty("/Wizard3", false);
          oModelStepScenario.setProperty("/Wizard4", true);
          oWizard.nextStep()
        } else if (bWizard4) {
          oModelStepScenario.setProperty("/Wizard4", false);
          oModelStepScenario.setProperty("/Wizard5", true);
          oWizard.nextStep()
        } else if (bWizard5) {
          oModelStepScenario.setProperty("/Wizard5", false);
          oModelStepScenario.setProperty("/Wizard6", true);
          oWizard.nextStep()
        } else if (bWizard6) {
          oModelStepScenario.setProperty("/Wizard6", false);
          oModelStepScenario.setProperty("/Wizard7", true);
          oWizard.nextStep()
        }
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;

        var oParameters = oEvent.getParameter("arguments");
        self.setModelSop(oParameters)

        var oModelStepScenario = new JSONModel({
          Wizard1: true,
          Wizard2: false,
          Wizard3: false,
          Wizard4: false,
          Wizard5: false,
          Wizard6: false,
          Wizard7: false,
        })

        self.setModel(oModelStepScenario, "StepScenario")
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
          ZzDescebe: oSop.ZzDescebe,
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
          Position: await self._getPositions(oParameters, oSop.ZspecieSop, oSop.Ztipopag),
          Classificazione: await self._getClassificazione(oParameters),

          DescZmissione: oSop.DescZmissione,
          DescZprogramma: oSop.DescZprogramma,
          DescZazione: oSop.DescZazione,
          DescCapitolo: oSop.DescCapitolo,
          DescPianoGest: oSop.DescPianoGest,
          DescZamministr: oSop.DescZamministr,
          DescCdr: oSop.DescCdr,
          DescZvimufficio: oSop.DescZvimufficio,
          ZdirigenteAmm: oSop.ZdirigenteAmm,
          DataStato: oSop.DataStato,
          Znumprotrgs: oSop.Znumprotrgs,
          Zdataprotrgs: oSop.Zdataprotrgs,
          Ragioneria: oSop.Ragioneria,
          DescZflagfrutt: oSop.DescZflagfrutt,
          DescZtipofirma: oSop.DescZtipofirma,
          // Zcassa: oSop.Zcassa
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

      _getPositions: async function (oParameters, sZspecieSop, sZtipopag) {
        var self = this;
        var oModel = self.getModel();
        var aFilters = []

        self.setFilterEQ(aFilters, "Bukrs", oParameters.Bukrs)
        self.setFilterEQ(aFilters, "Zchiavesop", oParameters.Zchiavesop)

        self.getView().setBusy(true)
        return new Promise(async function (resolve, reject) {
          await oModel.read("/PosizioniSopSet", {
            filters: aFilters,
            success: function (data, oResponse) {
              self.getView().setBusy(false)
              self.hasResponseError(oResponse)
              var aData = data.results;
              aData?.map((oData) => {
                oData.ImpQuotaDoc = oData.Wrbtr

                if (sZspecieSop && (sZtipopag === '3' || sZtipopag === '4')) {
                  oData.ImpQuotaDoc = oData.Zimpliq
                }
              })
              resolve(aData)
            },
            error: function () {
              self.getView().setBusy(false)
            }
          })
        })

      },

      _getClassificazione: async function (oParameters) {
        var self = this;
        var oModel = self.getModel()
        var aFilters = []

        self.setFilterEQ(aFilters, "Bukrs", oParameters.Bukrs)
        self.setFilterEQ(aFilters, "Zchiavesop", oParameters.Zchiavesop)

        self.getView().setBusy(true)
        return new Promise(async function (resolve, reject) {
          await oModel.read("/ClassificazioneSopSet", {
            filters: aFilters,
            success: function (data, oResponse) {
              self.getView().setBusy(false)
              self.hasResponseError(oResponse)
              var aData = data.results;
              self._setModelClassificazione(aData)
              resolve(aData)
            },
            error: function () {
              self.getView().setBusy(false)
            }
          })
        })
      },

      _setModelClassificazione: function (aData) {
        var self = this;

        var oDataClassificazione = {
          Cos: [],
          Cpv: [],
          Cig: [],
          Cup: [],
          ImpTotAssociareCos: 0.0,
          ImpTotAssociareCpv: 0.0,
          ImpTotAssociareCig: 0.0,
          ImpTotAssociareCup: 0.0,
        };

        aData.map((oClassificazione) => {
          switch (oClassificazione.Zetichetta) {
            case "COS":
              oDataClassificazione.ImpTotAssociareCos += parseFloat(
                oClassificazione.ZimptotClass
              );

              oClassificazione.Index = oDataClassificazione.Cos.length;
              oDataClassificazione.Cos.push(oClassificazione);
              break;
            case "CPV":
              oDataClassificazione.ImpTotAssociareCpv += parseFloat(
                oClassificazione.ZimptotClass
              );
              oClassificazione.Index = oDataClassificazione.Cpv.length;
              oDataClassificazione.Cpv.push(oClassificazione);
              break;
            case "CIG":
              oDataClassificazione.ImpTotAssociareCig += parseFloat(
                oClassificazione.ZimptotClass
              );
              oClassificazione.Index = oDataClassificazione.Cig.length;
              oDataClassificazione.Cig.push(oClassificazione);
              break;
            case "CUP":
              oDataClassificazione.ImpTotAssociareCup += parseFloat(
                oClassificazione.ZimptotClass
              );
              oClassificazione.Index = oDataClassificazione.Cup.length;
              oDataClassificazione.Cup.push(oClassificazione);
              break;
          }
        });

        oDataClassificazione.ImpTotAssociareCos =
          oDataClassificazione.ImpTotAssociareCos.toFixed(2);
        oDataClassificazione.ImpTotAssociareCpv =
          oDataClassificazione.ImpTotAssociareCpv.toFixed(2);
        oDataClassificazione.ImpTotAssociareCig =
          oDataClassificazione.ImpTotAssociareCig.toFixed(2);
        oDataClassificazione.ImpTotAssociareCup =
          oDataClassificazione.ImpTotAssociareCup.toFixed(2);

        self.setModel(new JSONModel(oDataClassificazione), "Classificazione");
      },
    });
  })
