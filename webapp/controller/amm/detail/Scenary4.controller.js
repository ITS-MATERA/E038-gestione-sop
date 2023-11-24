sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/m/MessageBox"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, MessageBox) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.detail.Scenary4", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.detail.Scenary4",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");

        this.getRouter().getRoute("amm.detail.scenary4").attachPatternMatched(this._onObjectMatched, this);
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

        } else if (bWizard1Step2) {
          self.setModel(new JSONModel({}), "Sop")
          self.getRouter().navTo("amm.home", {
            Reload: false,
          });
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
        var oWizard = self.getView().byId("wizScenario4");
        var oModelStepScenario = self.getModel("StepScenario");

        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");

        if (bWizard1Step1) {
        } else if (bWizard1Step2) {
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelModPagamento();
          self.createModelSedeBeneficiario();
          oWizard.nextStep();
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard3", true);
          oWizard.nextStep();
        } else if (bWizard3) {
          oModelStepScenario.setProperty("/wizard3", false);
          oModelStepScenario.setProperty("/wizard4", true);
          oModelStepScenario.setProperty("/visibleBtnForward", false);
          oModelStepScenario.setProperty("/visibleBtnSave", true);
          oWizard.nextStep();
        }
      },

      _onObjectMatched: function (oEvent) {
        var self = this;
        var oParameters = oEvent.getParameter("arguments");

        self.getView().byId("idToolbarDetail").setVisible(false)

        self.setModelSop(oParameters);
        self.createModelClassificazione();
        self.createModelUtilityDet("gestionesop.view.amm.detail.Scenary4")
        self.createModelStepScenarioDet();
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
            self.resetWizard("wizScenario4");
            self.setModelSop(oParameters);
            self.createModelStepScenarioDet();
            break;
          }
          case "Workflow": {
            self.createModelWF()
            break;
          }
        }
      },

      createModelStepScenarioDet: function () {
        var self = this;
        var oModelStepScenario = new JSONModel({
          wizard1Step1: false,
          wizard1Step2: true,
          wizard2: false,
          wizard3: false,
          wizard4: false,
          visibleBtnForward: true,
          visibleBtnInserisciProspLiquidazione: false,
          visibleBtnSave: false,
          visibleBtnStart: false
        })

        self.setModel(oModelStepScenario, "StepScenario")
      }



    });
  }
);
