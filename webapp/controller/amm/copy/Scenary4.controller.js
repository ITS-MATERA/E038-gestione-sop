sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.copy.Scenary4", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.copy.Scenary4",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");
        self.acceptOnlyNumber("iptCodInps")
        self.acceptOnlyNumber("iptCodiceTributo")
        self.acceptOnlyImport("iptCFCommit")

        this.getRouter().getRoute("amm.copy.scenary4").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario4");
        var oModelStepScenario = self.getModel("StepScenario");

        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");

        if (bWizard1Step1) {
          self.getRouter().navTo("amm.home");
        } else if (bWizard1Step2) {
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard1Step1", true);
          oModelStepScenario.setProperty("/visibleBtnForward", true);
          oModelStepScenario.setProperty(
            "/visibleBtnInserisciProspLiquidazione",
            false
          );
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
          oModelStepScenario.setProperty("/visibleBtnForward", false);
          oModelStepScenario.setProperty(
            "/visibleBtnInserisciProspLiquidazione",
            true
          );
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
        var oWizard = self.getView().byId("wizScenario4");
        var oModelStepScenario = self.getModel("StepScenario");
        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");


        if (bWizard1Step1) {
          if (await self.checkWizard1()) {
            oModelStepScenario.setProperty("/wizard1Step1", false);
            oModelStepScenario.setProperty("/wizard1Step2", true);
            oModelStepScenario.setProperty("/visibleBtnForward", false);
            oModelStepScenario.setProperty(
              "/visibleBtnInserisciProspLiquidazione",
              true
            );
            self.createModelModPagamento();
            self.createModelSedeBeneficiario();
            self.setSedeBeneficiario();
            self.setPosizioneScen4()

          }
          else if (bWizard2) {
            self.checkWizard2(oWizard);
          } else if (bWizard3) {
            if (self.checkClassificazione()) {
              oModelStepScenario.setProperty("/wizard3", false);
              oModelStepScenario.setProperty("/wizard4", true);
              oModelStepScenario.setProperty("/visibleBtnForward", false);
              oModelStepScenario.setProperty("/visibleBtnSave", true);
              self.setLocPagamento()
              oWizard.nextStep();
            }
          }
        },

        _onObjectMatched: function (oEvent) {
          var self = this;
          var oArguments = oEvent.getParameter("arguments");
          self.checkPermissions("A", "Copia")

          this._sTypeSop = oArguments.TypeSop;

          self.resetWizard("wizScenario4")
          self.setModelSop(oArguments, true, "PosizioniScen4");
          self.createModelUtilityReg("gestionesop.view.amm.copy.Scenary4");

          var oModelStepScenario = new JSONModel({
            wizard1Step1: true,
            wizard1Step2: false,
            wizard2: false,
            wizard3: false,
            wizard4: false,
            visibleBtnForward: true,
            visibleBtnInserisciProspLiquidazione: false,
            visibleBtnSave: false,
            visibleBtnStart: false
          })

          self.setModel(oModelStepScenario, "StepScenario")
        },

        checkWizard1: function () {
          var self = this;
          var oModel = self.getModel()
          var oSop = self.getModel("Sop").getData()

          return new Promise(async function (resolve, reject) {
            self.getView().setBusy(true);
            await oModel.callFunction("/CheckWizard1Scen4Amm", {
              method: "GET",
              urlParameters: {
                Iban: oSop.Iban,
                Lifnr: oSop.Lifnr,
                Zwels: oSop.Zwels,
                Zimptot: oSop.Zimptot,
                Hkont: oSop.Hkont,
                Kostl: oSop.Kostl
              },
              success: function (data) {
                self.getView().setBusy(false);
                resolve(self.hasMessageError(data) ? false : true);
              },
              error: function (error) {
                self.getView().setBusy(false);
                reject(error);
              },
            });
          });
        },
      });
  }
);
