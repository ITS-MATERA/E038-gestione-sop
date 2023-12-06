sap.ui.define(
  ["../BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../model/formatter", "sap/ui/export/Spreadsheet",
    "sap/ui/export/library", "sap/m/MessageBox"],
  function (BaseController, Filter, FilterOperator, JSONModel, formatter, Spreadsheet, exportLibrary, MessageBox) {
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
        self.checkPermissions("R", "Dettaglio")

        self.resetWizard("wizDetail");
        self.createModelStepScenario();
        self.setModelSop(oParameters)
        self.createModelStepScenario()
        self.createModelUtility()
        self.getView().byId("idToolbarDetail")?.setVisible(false)
        self.lockSop(oParameters);
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
          ZuffRag: oSop.ZuffRag,
          Znotpag: oSop.Znotpag
        });

        self.setModel(oModelSop, "Sop");
        self.getView().byId("idToolbarDetail")?.setVisible(true)

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

      onIconTabChange: function (oEvent) {
        var self = this;
        var oSop = self.getModel("Sop").getData();
        var sKey = oEvent.getParameter("selectedKey");
        var oModelUtility = self.getModel("Utility");

        oModelUtility.setProperty("/Function", sKey);

        var oParameters = {
          Gjahr: oSop.Gjahr,
          Bukrs: oSop.Bukrs,
          Zchiavesop: oSop.Zchiavesop,
          Ztipososp: oSop.Ztipososp,
          Zstep: oSop.Zstep,
        };

        switch (sKey) {
          case "Dettaglio": {
            self.resetWizard("wizDetail");
            self.setModelSop(oParameters);
            self.createModelStepScenario();
            oModelUtility.setProperty("/EnableEdit", false)
            break;
          }
          case "Workflow": {
            self.createModelWF()
            break;
          }
          default: {
            self.resetWizard("wizDetail");
            self.createModelStepScenario();
            oModelUtility.setProperty("/EnableEdit", true)
            break;
          }
        }
      },

      createModelStepScenario: function () {
        var self = this;
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

      createModelUtility: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          Function: "Dettaglio",
          EnableEdit: false,
          isLogVisible: false,
          RemoveFunctionButtons: false,
          Sop: [],
          EnableVerificaConferma: false,
          EnableValidazione: false,
          EnableRegistraRilievo: false,
          EnableRettificaRilievo: false,
          EnableCancellaRilievo: false,
          EnableValidaRilievo: false
        })

        self.setModel(oModelUtility, "Utility")
      },

      //#region ------------------------Functions-------------------------------

      onVerificaConferma: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");

        self.resetWizard("wizDetail");
        self.createModelStepScenario();
        oModelUtility.setProperty("/Function", "VerificaConferma")
        oModelUtility.setProperty("/EnableVerificaConferma", true)
        oModelUtility.setProperty("/RemoveFunctionButtons", true)
      },

      onConferma: function () {
        var self = this;
        var oDialog = self.loadFragment("gestionesop.view.fragment.rag.Motivazione")
        oDialog.open()
      },

      onRevocaConferma: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData();

        MessageBox.warning("Procedere con la Revoca della conferma del SOP selezionato?", {
          title: "Revoca Conferma",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (oAction) {
            if (oAction === 'OK') {

              var oSopDeep = {
                Operazione: "REVOCA_CONFERMA",
                Bukrs: "",
                Zchiavesop: "",
                SopAmministrazioneSet: {
                  Bukrs: oSop.Bukrs,
                  Gjahr: oSop.Gjahr,
                  Zchiavesop: oSop.Zchiavesop,
                },
                PosizioniSopSet: [],
                ClassificazioneSopSet: [],
                SopMessageSet: []
              }

              self.getView().setBusy(true)
              oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
                success: function (data) {
                  self.getView().setBusy(false)
                  self.managementLogFunction(data, "Revoca Conferma")
                },
                error: function () {
                  self.getView().setBusy(false)
                },
              });
              return
            }
          },
        })
      },

      onValidazione: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oSop = self.getModel("Sop").getData()

        oModelUtility.setProperty("/Function", "Validazione")
        oModelUtility.setProperty("/EnableValidazione", true)
        oModelUtility.setProperty("/RemoveFunctionButtons", true)
        oModelUtility.setProperty("/Sop", [oSop])
      },

      onValida: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        var oSopDeep = {
          Operazione: "VALIDAZIONE",
          Bukrs: "",
          Zchiavesop: "",
          SopAmministrazioneSet: {
            Bukrs: oSop.Bukrs,
            Gjahr: oSop.Gjahr,
            Zchiavesop: oSop.Zchiavesop,
          },
          PosizioniSopSet: [],
          ClassificazioneSopSet: [],
          SopMessageSet: []
        }

        self.getView().setBusy(true)
        oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
          success: function (data) {
            self.getView().setBusy(false)
            self.managementLogFunction(data, "Validazione SOP")
          },
          error: function () {
            self.getView().setBusy(false)
          },
        });
      },

      onRevocaValidazione: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData();

        MessageBox.warning("Procedere con la Revoca della validazione del SOP selezionato?", {
          title: "Revoca Validazione",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (oAction) {
            if (oAction === 'OK') {

              var oSopDeep = {
                Operazione: "REVOCA_VALIDAZIONE",
                Bukrs: "",
                Zchiavesop: "",
                SopAmministrazioneSet: {
                  Bukrs: oSop.Bukrs,
                  Gjahr: oSop.Gjahr,
                  Zchiavesop: oSop.Zchiavesop,
                },
                PosizioniSopSet: [],
                ClassificazioneSopSet: [],
                SopMessageSet: []
              }

              self.getView().setBusy(true)
              oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
                success: function (data) {
                  self.getView().setBusy(false)
                  self.managementLogFunction(data, "Revoca Validazione")
                },
                error: function () {
                  self.getView().setBusy(false)
                },
              });
              return
            }
          },
        })
      },

      onRegistraRilievo: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        if (!oModelUtility.getProperty("/EnableRegistraRilievo")) {
          self.resetWizard("wizDetail");
          self.createModelStepScenario();
          oModelUtility.setProperty("/Function", "RegistraRilievo")
          oModelUtility.setProperty("/EnableRegistraRilievo", true)
          oModelUtility.setProperty("/RemoveFunctionButtons", true)
          oModelUtility.setProperty("/Sop", [oSop])
          self.createModelDatiUtente()
          return
        }

        MessageBox.warning("Procedere con la Registrazione del rilievo per il SOP selezionato?", {
          title: "Registrazione Rilievo",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (oAction) {
            if (oAction === 'OK') {

              var oDatiUtente = self.getModel("DatiUtente").getData()
              var oSopDeep = {
                Operazione: "REGISTRA_RILIEVO",
                Bukrs: "",
                Zchiavesop: "",
                SopAmministrazioneSet: {
                  Bukrs: oSop.Bukrs,
                  Gjahr: oSop.Gjahr,
                  Zchiavesop: oSop.Zchiavesop,
                  Zmotrilievo: oDatiUtente.Zmotrilievo
                },
                PosizioniSopSet: [],
                ClassificazioneSopSet: [],
                SopMessageSet: []
              }

              self.getView().setBusy(true)
              oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
                success: function (data) {
                  self.getView().setBusy(false)
                  self.managementLogFunction(data, "Registrazione Rilievo")
                },
                error: function () {
                  self.getView().setBusy(false)
                },
              });
              return
            }
          },
        })
      },

      onRettificaRilievo: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        if (!oModelUtility.getProperty("/EnableRettificaRilievo")) {
          self.resetWizard("wizDetail");
          self.createModelStepScenario();
          oModelUtility.setProperty("/Function", "RettificaRilievo")
          oModelUtility.setProperty("/EnableRettificaRilievo", true)
          oModelUtility.setProperty("/RemoveFunctionButtons", true)
          oModelUtility.setProperty("/Sop", [oSop])
          self.createModelDatiUtente()
          return
        }


        var oDatiUtente = self.getModel("DatiUtente").getData()
        var oSopDeep = {
          Operazione: "RETTIFICA_RILIEVO",
          Bukrs: "",
          Zchiavesop: "",
          SopAmministrazioneSet: {
            Bukrs: oSop.Bukrs,
            Gjahr: oSop.Gjahr,
            Zchiavesop: oSop.Zchiavesop,
            Zmotrilievo: oDatiUtente.Zmotrilievo
          },
          PosizioniSopSet: [],
          ClassificazioneSopSet: [],
          SopMessageSet: []
        }

        self.getView().setBusy(true)
        oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
          success: function (data) {
            self.getView().setBusy(false)
            self.managementLogFunction(data, "Registrazione Rilievo")
          },
          error: function () {
            self.getView().setBusy(false)
          },
        });
      },

      onCancellaRilievo: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        if (!oModelUtility.getProperty("/EnableCancellaRilievo")) {
          self.resetWizard("wizDetail");
          self.createModelStepScenario();
          oModelUtility.setProperty("/Function", "CancellaRilievo")
          oModelUtility.setProperty("/EnableCancellaRilievo", true)
          oModelUtility.setProperty("/RemoveFunctionButtons", true)
          oModelUtility.setProperty("/Sop", [oSop])
          self.createModelDatiUtente()
          return
        }

        MessageBox.warning("Procedere con la cancellazione del rilievo per il SOP selezionato?", {
          title: "Cancellazione Rilievo",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (oAction) {
            if (oAction === 'OK') {

              var oSopDeep = {
                Operazione: "CANCELLA_RILIEVO",
                Bukrs: "",
                Zchiavesop: "",
                SopAmministrazioneSet: {
                  Bukrs: oSop.Bukrs,
                  Gjahr: oSop.Gjahr,
                  Zchiavesop: oSop.Zchiavesop,
                },
                PosizioniSopSet: [],
                ClassificazioneSopSet: [],
                SopMessageSet: []
              }

              self.getView().setBusy(true)
              oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
                success: function (data) {
                  self.getView().setBusy(false)
                  self.managementLogFunction(data, "Cancellazione Rilievo")
                },
                error: function () {
                  self.getView().setBusy(false)
                },
              });
              return
            }
          },
        })
      },

      onValidazioneRilievo: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oSop = self.getModel("Sop").getData()

        self.resetWizard("wizDetail");
        self.createModelStepScenario();
        oModelUtility.setProperty("/Function", "ValidaRilievo")
        oModelUtility.setProperty("/EnableValidaRilievo", true)
        oModelUtility.setProperty("/RemoveFunctionButtons", true)
        oModelUtility.setProperty("/Sop", [oSop])
        self.createModelDatiUtente()
      },

      onValidaRilievo: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        MessageBox.warning("Procedere con la validazione del rilievo per il SOP selezionato?", {
          title: "Validazione Rilievo",
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          onClose: function (oAction) {
            if (oAction === 'OK') {
              var oSopDeep = {
                Operazione: "VALIDA_RILIEVO",
                Bukrs: "",
                Zchiavesop: "",
                SopAmministrazioneSet: {
                  Bukrs: oSop.Bukrs,
                  Gjahr: oSop.Gjahr,
                  Zchiavesop: oSop.Zchiavesop,
                },
                PosizioniSopSet: [],
                ClassificazioneSopSet: [],
                SopMessageSet: []
              }

              self.getView().setBusy(true)
              oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
                success: function (data) {
                  self.getView().setBusy(false)
                  self.managementLogFunction(data, "Validazione Rilievo")
                },
                error: function () {
                  self.getView().setBusy(false)
                },
              });
            }
          }
        })
      },

      //#region ---------------------------Methods------------------------------

      onOkMotivazione: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()
        var sMotivazione = sap.ui.getCore().byId("txtMotivazione")?.getValue();
        var oDialogMotivazione = sap.ui.getCore().byId("dlgMotivazione");

        oDialogMotivazione.close();
        self.unloadFragment();

        var oSopDeep = {
          Operazione: "Conferma",
          Bukrs: "",
          Zchiavesop: "",
          SopAmministrazioneSet: {
            Bukrs: oSop.Bukrs,
            Gjahr: oSop.Gjahr,
            Zchiavesop: oSop.Zchiavesop,
            Znotpag: sMotivazione,
            ZuffRag: oSop.ZuffRag
          },
          PosizioniSopSet: [],
          ClassificazioneSopSet: [],
          SopMessageSet: []
        }

        self.getView().setBusy(true)
        oModel.create("/DeepSopAmministrazioneSet", oSopDeep, {
          success: function (data) {
            self.getView().setBusy(false)
            self.managementLogFunction(data, "Conferma SOP")
          },
          error: function () {
            self.getView().setBusy(false)
          },
        });
      },

      onCancelMotivazione: function () {
        var self = this;
        var oDialog = sap.ui.getCore().byId("dlgMotivazione");
        oDialog.close();
        self.unloadFragment();
      },

      managementLogFunction: function (data, sTitle) {
        var self = this;
        var aMessage = data?.SopMessageSet?.results;
        var oModelUtility = self.getModel("Utility")
        var aMessageFormatted = []

        if (aMessage.length > 0) {
          if (aMessage.length === 1) {
            if (aMessage[0]?.Body?.Msgty === 'E') {
              MessageBox.error(aMessage[0]?.Body?.Message, {
                title: sTitle,
              });
            }
            else if (aMessage[0]?.Body?.Msgty === 'S') {
              MessageBox.success(aMessage[0]?.Body?.Message, {
                title: sTitle,
                actions: [MessageBox.Action.CLOSE],
                onClose: function () {
                  self.unlockSop()
                  self.getRouter().navTo("rag.home", {
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
        }
      },

      onOpenNote: function () {
        var self = this;

        var oDialog = self.loadFragment("gestionesop.view.fragment.rag.function.Nota")
        oDialog.open()
      },

      onCloseNote: function () {
        var self = this;
        var oDialog = sap.ui.getCore().byId("dlgNote")
        oDialog.close()
        self.unloadFragment();
      },

      createModelDatiUtente: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        var sKey = oModel.createKey("/RilievoSet", {
          Zchiavesop: oSop.Zchiavesop
        })

        self.getView().setBusy(true)
        oModel.read(sKey, {
          success: function (data) {
            self.getView().setBusy(false)
            self.setModel(new JSONModel(data), "DatiUtente")
          },
          error: function () {
            self.getView().setBusy(false)
          }
        })
      },

      //#endregion ------------------------Methods------------------------------

      //#endregion ------------------------Functions----------------------------


    });
  })
