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
        self.acceptOnlyNumber("iptCodInps")
        self.acceptOnlyNumber("iptCodiceTributo")
        self.acceptOnlyImport("iptCFCommit")

        this.getRouter().getRoute("amm.detail.scenary4").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario4");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility")

        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");
        var bEnableEditMode = oModelUtility.getProperty("/EnableEditMode")

        if (bWizard1Step1) {
          self.unlockSop()
          self.setModel(new JSONModel({}), "Sop")
          self.getRouter().navTo("amm.home", {
            Reload: false,
          });
        } else if (bWizard1Step2) {
          if (bEnableEditMode) {
            oModelStepScenario.setProperty("/wizard1Step2", false);
            oModelStepScenario.setProperty("/wizard1Step1", true);
            return;
          }
          self.unlockSop()
          self.setModel(new JSONModel({}), "Sop")
          self.getRouter().navTo("amm.home", {
            Reload: false,
          });
        } else if (bWizard2) {
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
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
          if (await self.checkWizard1()) {
            oModelStepScenario.setProperty("/wizard1Step1", false);
            oModelStepScenario.setProperty("/wizard1Step2", true);
            self.setSedeBeneficiario();
            self.createModelModPagamento();
            self.createModelSedeBeneficiario();
            self.setPosizioneScen4()
          }
        } else if (bWizard1Step2) {
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelSedeBeneficiario();
          self.createModelModPagamento();
          oWizard.nextStep();
        } else if (bWizard2) {
          self.checkWizard2(oWizard);
        } else if (bWizard3) {
          if (self.checkClassificazione()) {
            oModelStepScenario.setProperty("/wizard3", false);
            oModelStepScenario.setProperty("/wizard4", true);
            oModelStepScenario.setProperty("/visibleBtnForward", false);
            oModelStepScenario.setProperty("/visibleBtnSave", true);
            if (oModelUtility.getProperty("/EnableEdit")) {
              self.setLocPagamento()
            }
            oWizard.nextStep();
          }
        }
      },

      _onObjectMatched: async function (oEvent) {
        var self = this;
        var oParameters = oEvent.getParameter("arguments");
        self.checkPermissions("A", "Dettaglio")

        self.getView().byId("idToolbarDetail").setVisible(false)

        self.getPermissionSop();
        self.resetWizard("wizScenario4");
        self.setModelSop(oParameters);
        self.createModelClassificazione();
        self.createModelUtilityDet("gestionesop.view.amm.detail.Scenary4")
        self.createModelStepScenarioDet();
        self.lockSop(oParameters);
      },

      onIconTabChange: function (oEvent) {
        var self = this;
        var oSop = self.getModel("Sop").getData();
        var sKey = oEvent.getParameter("selectedKey");
        var oModelUtility = self.getModel("Utility");
        var oModelStepScenario = self.getModel("StepScenario")

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
            oModelUtility.setProperty("/EnableEdit", false)
            self.getView().byId("idToolbarDetail").setVisible(true)
            break;
          }
          case "Workflow": {
            self.createModelWF()
            self.getView().byId("idToolbarDetail").setVisible(false)
            break;
          }
          case "Rettifica": {
            self.resetWizard("wizScenario4");
            oModelStepScenario.setProperty("/wizard1Step2", false)
            oModelStepScenario.setProperty("/wizard1Step1", true)
            oModelStepScenario.setProperty("/visibleBtnForward", true)
            oModelStepScenario.setProperty("/visibleBtnSave", false)
            oModelUtility.setProperty("/EnableEdit", true)
            break;
          } case "FascicoloElettronico": {
            self.getView().byId("idToolbarDetail").setVisible(false)
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
      },

      onEdit: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility")
        var oModelStepScenario = self.getModel("StepScenario")

        oModelUtility.setProperty("/EnableEditMode", true)
        oModelUtility.setProperty("/Function", "Rettifica")
        oModelUtility.setProperty("/RemoveFunctionButtons", true)
        self.createModelModPagamento()

        self.resetWizard("wizScenario4");
        oModelStepScenario.setProperty("/wizard1Step2", false)
        oModelStepScenario.setProperty("/wizard1Step1", true)
        oModelStepScenario.setProperty("/visibleBtnForward", true)
        oModelStepScenario.setProperty("/visibleBtnSave", false)
        oModelUtility.setProperty("/EnableEdit", true)
        return;

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

      onCancelRow: function (oEvent) {
        var self = this;
        //Load Models
        var oModelClassificazione = self.getModel("Classificazione");
        var oModelUtility = self.getModel("Utility")
        var aDeletedClassificazioni = oModelUtility.getProperty("/DeletedClassificazioni")

        var oSourceData = oEvent?.getSource()?.data();
        var oTableClassificazione = self.getView().byId(oSourceData?.table);

        var aPathSelectedItems = oTableClassificazione.getSelectedContextPaths();

        var aListClassificazione = oModelClassificazione.getProperty("/" + oSourceData?.etichetta);

        //Rimuovo i record selezionati
        aPathSelectedItems.map((sPath) => {
          var oItem = oModelClassificazione.getObject(sPath);
          if (oItem.Zchiavesop) {
            oItem.Zflagcanc = 'X'
            aDeletedClassificazioni.push(oItem)
          }
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

    });
  }
);
