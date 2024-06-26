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
        self.acceptOnlyNumber("iptCos")
        self.acceptOnlyNumber("iptZnumprot")
        self.attachFiposFocusOut()

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
          self.resetLog()
          self.unlockSop()
          if (!oModelUtility.getProperty("/EnableEdit")) {
            self.setModel(new JSONModel({}), "Sop")
            self.getRouter().navTo("amm.home", {
              Reload: false,
            });
          } else {
            this._goToDetail()
          }

        } else if (bWizard1Step2) {
          self.resetLog()
          if (bEnableEditMode) {
            oModelStepScenario.setProperty("/wizard1Step2", false);
            oModelStepScenario.setProperty("/wizard1Step1", true);
            return;
          }
          self.unlockSop()
          if (!oModelUtility.getProperty("/EnableEdit")) {
            self.setModel(new JSONModel({}), "Sop")
            self.getRouter().navTo("amm.home", {
              Reload: false,
            });
          } else {
            this._goToDetail()
          }
        } else if (bWizard2) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
          oWizard.previousStep();
        } else if (bWizard3) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard3", false);
          oModelStepScenario.setProperty("/wizard2", true);
          oWizard.previousStep();
        } else if (bWizard4) {
          self.resetLog()
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
        var oModelUtility = self.getModel("Utility")

        if (bWizard1Step1) {
          self.resetLog()
          if (await self.checkWizard1()) {
            oModelStepScenario.setProperty("/wizard1Step1", false);
            oModelStepScenario.setProperty("/wizard1Step2", true);
            self.setSedeBeneficiario();
            self.createModelModPagamento();
            self.createModelSedeBeneficiario();
            self.setPosizioneScen4()
          }
        } else if (bWizard1Step2) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelSedeBeneficiario();
          self.createModelModPagamento();
          oWizard.nextStep();
        } else if (bWizard2) {
          self.resetLog()
          self.checkWizard2(oWizard);
        } else if (bWizard3) {
          if (self.checkClassificazione()) {
            self.resetLog()
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
        await self.createModelUtilityDet("gestionesop.view.amm.detail.Scenary4")
        self.createModelStepScenarioDet();
        self.lockSop(oParameters);
      },

      onIconTabChange: function (oEvent) {
        var self = this;
        var oSop = self.getModel("Sop").getData();
        var sKey = oEvent.getParameter("selectedKey");
        var oModelUtility = self.getModel("Utility");
        var oModelStepScenario = self.getModel("StepScenario")
        var aSop = {
          Sop: []
        }
        aSop.Sop.push(oSop)

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
            self.resetLog()
            self.resetWizard("wizScenario4");
            self.setModelSop(oParameters);
            self.createModelStepScenarioDet();
            oModelUtility.setProperty("/EnableEdit", false)
            self.getView().byId("idToolbarDetail").setVisible(true)
            oModelUtility.setProperty("/ButtonsVisible", true)
            break;
          }
          case "Workflow": {
            self.resetLog()
            self.createModelWF()
            self.setModel(new JSONModel(aSop), "DatiFirmatario")
            self.getView().byId("idToolbarDetail").setVisible(true)
            oModelUtility.setProperty("/ButtonsVisible", false)
            break;
          }
          case "Rettifica": {
            self.resetLog()
            oModelUtility.setProperty("/ButtonsVisible", true)
            self.resetWizard("wizScenario4");
            oModelStepScenario.setProperty("/wizard1Step2", false)
            oModelStepScenario.setProperty("/wizard1Step1", true)
            oModelStepScenario.setProperty("/visibleBtnForward", true)
            oModelStepScenario.setProperty("/visibleBtnSave", false)
            oModelUtility.setProperty("/EnableEdit", true)
            break;
          } case "FascicoloElettronico": {
            self.resetLog()
            self.getView().byId("idToolbarDetail").setVisible(true)
            oModelUtility.setProperty("/ButtonsVisible", false)
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
          if (oItem?.Zchiavesop) {
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

      _goToDetail: async function () {
        var self = this;
        var oSop = self.getModel("Sop").getData()
        var oParameters = {
          Gjahr: oSop.Gjahr,
          Zchiavesop: oSop.Zchiavesop,
          Bukrs: oSop.Bukrs,
          Zstep: oSop.Zstep,
          Ztipososp: oSop.Ztipososp
        }

        self.resetWizard("wizScenario4");
        self.setModelSop(oParameters);
        self.createModelClassificazione();
        self.createModelStepScenarioDet();
        await self.createModelUtilityDet("gestionesop.view.amm.detail.Scenary4")
      },

    });
  }
);
