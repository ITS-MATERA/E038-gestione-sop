sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/m/MessageBox"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, MessageBox) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.create.Scenary1", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.create.Scenary2",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaOrd");
        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");

        this.getRouter().getRoute("amm.create.scenary2").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario2");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelSop = self.getModel("Sop");

        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");

        if (bWizard1Step1) {
          self.getRouter().navTo("amm.inputSop", {
            type: this._sTypeSop,
          });
        } else if (bWizard1Step2) {
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard1Step1", true);
          oModelStepScenario.setProperty("/visibleBtnForward", false);
          oModelStepScenario.setProperty("/visibleBtnStart", true);
          oModelSop.setProperty("/Position", []);
          oModelSop.setProperty("/Zimptot", "0.00");
        } else if (bWizard1Step3) {
          oModelStepScenario.setProperty("/wizard1Step3", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard1Step3", true);
          oWizard.previousStep();
        } else if (bWizard3) {
          oModelStepScenario.setProperty("/wizard3", false);
          oModelStepScenario.setProperty("/wizard2", true);
          oWizard.previousStep();
        } else if (bWizard4) {
          oModelStepScenario.setProperty("/wizard4", false);
          oModelStepScenario.setProperty("/wizard3", true);
          oModelStepScenario.setProperty("/visibleBtnForward", true);
          oModelStepScenario.setProperty("/visibleBtnSave", false);
          oWizard.previousStep();
        }
      },

      onNavForward: async function () {
        var self = this;
        var oWizard = self.getView().byId("wizScenario2");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility");

        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");

        if (bWizard1Step2) {
          self.checkWizard1();
        } else if (bWizard1Step3) {
          oModelStepScenario.setProperty("/wizard1Step3", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelModPagamento();
          self.createModelSedeBeneficiario();
          self.setIbanQuote();
          self.setModalitaPagamentoQuote();
          self.setSedeBeneficiario();
          oModelUtility.setProperty("/isVersanteEditable", await self.checkLifnrInTvarvc());
          oWizard.nextStep();
        } else if (bWizard2) {
          self.checkWizard2(oWizard);
          self.getCig();
        } else if (bWizard3) {
          if (self.checkClassificazione()) {
            oModelStepScenario.setProperty("/wizard3", false);
            oModelStepScenario.setProperty("/wizard4", true);
            oModelStepScenario.setProperty("/visibleBtnForward", false);
            oModelStepScenario.setProperty("/visibleBtnSave", true);
            self.setLocPagamento();
            oWizard.nextStep();
          }
        }
      },

      _onObjectMatched: function (oEvent) {
        var self = this;
        var oArguments = oEvent.getParameter("arguments");

        this._sTypeSop = oArguments.TypeSop;

        self.createModelSop("2");
        self.setFirstSopData(oArguments);
        self.createModelFiltersWizard1();
        self.createModelStepScenarioReg();
        self.createModelClassificazione();
        self.createModelUtilityReg("gestionesop.view.amm.create.Scenary2");
      },

      onStart: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelStepScenario = self.getModel("StepScenario");
        var aFilters = self.setFiltersWizard1();
        var oPanelCalculator = self.getView().byId("pnlCalculatorList");

        self.getView().setBusy(true);

        oModel.read("/QuoteDocumentoSet", {
          filters: aFilters,
          success: function (data, oResponse) {
            self.getView().setBusy(false);
            if (!self.hasResponseError(oResponse)) {
              oModelStepScenario.setProperty("/wizard1Step1", false);
              oModelStepScenario.setProperty("/wizard1Step2", true);
              oModelStepScenario.setProperty("/visibleBtnForward", true);
              oModelStepScenario.setProperty("/visibleBtnStart", false);
            }


            var aData = data?.results;
            aData?.map((oPosition, iIndex) => {
              oPosition.Index = iIndex + 1;
            });
            self.setModel(new JSONModel(aData), "PosizioniScen2");
            oPanelCalculator.setVisible(aData.length !== 0);

          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },

      onImpDaOrdinareChange: function (oEvent) {
        var self = this;
        var oTable = self.getView().byId("tblPosizioniScen2");
        var oTableModel = oTable.getModel("PosizioniScen2");
        var oModelSop = self.getModel("Sop");

        var sValue = oEvent.getParameter("value");
        oModelSop.setProperty("/Zimptot", "0.00");

        if (sValue) {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = parseFloat(sValue).toFixed(2);
        } else {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = "0.00";
        }
      },

      onSelectedItem: function (oEvent) {
        var self = this;
        var bSelected = oEvent.getParameter("selected");
        //Load Model
        var oModelPosizioni = self.getModel("PosizioniScen2");
        var oModelSop = self.getModel("Sop");
        //Load Component
        var oButtonCalculate = self.getView().byId("btnCalculate");

        var aSelectedItems = oModelSop.getProperty("/Position");
        var aListItems = oEvent.getParameter("listItems");

        aListItems.map((oListItem) => {
          var oSelectedItem = oModelPosizioni.getObject(oListItem.getBindingContextPath());

          if (bSelected) {
            aSelectedItems.push(oSelectedItem);
          } else {
            var iIndex = aSelectedItems.findIndex((obj) => {
              return (
                obj.Docid === oSelectedItem.Docid
              );
            });

            if (iIndex > -1) {
              aSelectedItems.splice(iIndex, 1);
            }
          }
        });

        oModelSop.setProperty("/Position", aSelectedItems);
        oButtonCalculate.setVisible(aSelectedItems.length !== 0);
        oModelSop.setProperty("/Zimptot", "0.00");
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
            Zimpdaord: oPosition.Zimpdaord
          })
        })

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
                      self.getRouter().navTo("amm.home.", {
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
      }
    });
  }
);
