sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/json/JSONModel", "../../../model/formatter"],
  function (BaseAmministrazioneController, JSONModel, formatter) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.copy.Scenary1", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.copy.Scenary1",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaOrd");
        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");

        this.getRouter().getRoute("amm.copy.scenary1").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario1");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelSop = self.getModel("Sop");
        var sZtipopag = oModelSop.getProperty("/Ztipopag")
        var sType = "2"

        if (sZtipopag === "1" || sZtipopag === "2") {
          sType = "1"
        }

        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");


        if (bWizard1Step2) {
          self.getRouter().navTo("amm.inputSop", {
            type: sType,
          });
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
        var oWizard = self.getView().byId("wizScenario1");
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
          self.createModelSedeBeneficiario();
          self.createModelModPagamento();
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
        self.checkPermissions("A", "Copia")

        self.resetWizard("wizScenario1")
        self.setModelSop(oArguments, true, "PosizioniScen1");
        self.createModelClassificazione();
        self.createModelStepScenarioCopy();
        self.createModelUtilityReg("gestionesop.view.amm.copy.Scenary1");
        self.getView().byId("pnlCalculatorList").setVisible(true)

      },

      onImpDaOrdinareChange: function (oEvent) {
        var self = this;
        var oTable = self.getView().byId("tblPosizioniScen1");
        var oTableModel = oTable.getModel("PosizioniScen1");
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
        var oModelPosizioni = self.getModel("PosizioniScen1");
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
                obj.Bukrs === oSelectedItem.Bukrs &&
                obj.Zposizione === oSelectedItem.Zposizione &&
                obj.Znumliq === oSelectedItem.Znumliq &&
                obj.Zversione === oSelectedItem.Zversione &&
                obj.ZversioneOrig === oSelectedItem.ZversioneOrig
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
    });
  }
);
