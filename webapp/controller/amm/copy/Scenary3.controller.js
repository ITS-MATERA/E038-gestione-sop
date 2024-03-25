sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/m/MessageBox"],
  function (BaseAmministrazioneController, JSONModel, formatter, MessageBox) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.copy.Scenary3", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.copy.Scenary3",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaOrd");
        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");
        self.acceptOnlyNumber("iptCodInps")
        self.acceptOnlyNumber("iptCodiceTributo")
        self.acceptOnlyImport("iptCFCommit")
        self.acceptOnlyNumber("iptCos")
        self.acceptOnlyNumber("iptZnumprot")

        this.getRouter().getRoute("amm.copy.scenary3").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario3");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelSop = self.getModel("Sop");

        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");

        if (bWizard1Step1) {
          self.resetLog()
          self.getRouter().navTo("amm.home");
        }
        else if (bWizard1Step2) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard1Step2", false);
          oModelStepScenario.setProperty("/wizard1Step1", true);
          oModelStepScenario.setProperty("/visibleBtnForward", false);
          oModelStepScenario.setProperty("/visibleBtnStart", true);
          oModelSop.setProperty("/Position", []);
          oModelSop.setProperty("/Zimptot", "0.00");
        } else if (bWizard1Step3) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard1Step3", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
        } else if (bWizard2) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard1Step3", true);
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
        var oWizard = self.getView().byId("wizScenario3");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility");

        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");

        if (bWizard1Step2) {
          self.resetLog()
          self.checkWizard1();
        } else if (bWizard1Step3) {
          self.resetLog()
          oModelStepScenario.setProperty("/wizard1Step3", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelSedeBeneficiario();
          self.createModelModPagamento();
          self.setSedeBeneficiario();
          oModelUtility.setProperty("/isVersanteEditable", await self.checkLifnrInTvarvc());
          oWizard.nextStep();
        } else if (bWizard2) {
          self.resetLog()
          self.checkWizard2(oWizard);
          self.getCig();
        } else if (bWizard3) {
          if (self.checkClassificazione()) {
            self.resetLog()
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

        self.resetWizard("wizScenario3")
        self.setModelSop(oArguments, true, "PosizioniScen3");
        self.createModelStepScenarioCopy();
        self.createModelFiltersWizard1();
        self.createModelUtilityReg("gestionesop.view.amm.copy.Scenary3");
        self.getView().byId("pnlCalculatorList").setVisible(true)

      },

      onImpDaOrdinareChange: function (oEvent) {
        var self = this;
        var oTable = self.getView().byId("tblPosizioniScen3");
        var oTableModel = oTable.getModel("PosizioniScen3");
        var oModelSop = self.getModel("Sop");

        var sValue = oEvent.getParameter("value");
        oModelSop.setProperty("/Zimptot", "0.00");

        if (sValue) {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = parseFloat(sValue).toFixed(2);
        } else {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = "0.00";
        }
      },

      onSelectedItem: async function (oEvent) {
        var self = this;
        var aError = []
        var bSelected = oEvent.getParameter("selected");
        //Load Model
        var oTable = self.getView().byId("tblPosizioniScen3")
        var oModelPosizioni = self.getModel("PosizioniScen3");
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility")
        //Load Component
        var oButtonCalculate = self.getView().byId("btnCalculate");

        var aSelectedItems = oModelSop.getProperty("/Position");
        var aListItems = oEvent.getParameter("listItems");

        for (var i = 0; i < aListItems.length; i++) {
          var oListItem = aListItems[i];
          var oSelectedItem = oModelPosizioni.getObject(oListItem.getBindingContextPath());

          if (bSelected) {
            aListItems[i].getAggregation("cells")[6].setEnabled(true)
            var oResponse = await self.lockQuoteBeneficiario(oSelectedItem)

            if (oResponse.data.Type === 'S') {
              aSelectedItems.push(oSelectedItem);
              oModelSop.setProperty("/Position", aSelectedItems);
              oButtonCalculate.setVisible(aSelectedItems.length !== 0);
              oModelSop.setProperty("/Zimptot", "0.00");
              continue
            }

            aError.push({
              Msgid: "",
              Msgty: oResponse?.data?.Type,
              Msgno: "",
              Message: oResponse?.data?.Message,
            })
            oTable.setSelectedItem(oListItem, false)
            aListItems[i].getAggregation("cells")[6].setEnabled(false)
          } else {
            aListItems[i].getAggregation("cells")[6].setEnabled(false)
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

            await self.unlockQuoteBeneficiario(oSelectedItem)
            oModelSop.setProperty("/Position", aSelectedItems);
            oButtonCalculate.setVisible(aSelectedItems.length !== 0);
            oModelSop.setProperty("/Zimptot", "0.00");
          }
        }

        if (aError.length === 1) {
          MessageBox.error(aError[0].Message)
        }
        else if (aError.length > 1) {
          MessageBox.error("Operazione non eseguita correttamente")
          self.setModel(new JSONModel(aError), "Log")
          oModelUtility.setProperty("/isLogVisible", true)
        }
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
            self.setModel(new JSONModel(aData), "PosizioniScen3");
            oPanelCalculator.setVisible(aData.length !== 0);

            // if (data.results !== 0) {
            //   data.results.map((oItem, iIndex) => {
            //     //Vengono selezionati i record quando viene caricata l'entità
            //     aListRiepilogo.map((oSelectedItem) => {
            //       if (
            //         oItem.Bukrs === oSelectedItem.Bukrs &&
            //         oItem.Znumliq === oSelectedItem.Znumliq &&
            //         oItem.Zposizione === oSelectedItem.Zposizione &&
            //         oItem.Zversione === oSelectedItem.Zversione &&
            //         oItem.ZversioneOrig === oSelectedItem.ZversioneOrig
            //       ) {
            //         oTableDocumenti.setSelectedItem(oTableDocumenti.getItems()[iIndex]);
            //       }
            //     });
            //   });
            // }
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
      },
    });
  }
);
