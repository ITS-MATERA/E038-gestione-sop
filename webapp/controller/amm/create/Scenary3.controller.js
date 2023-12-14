sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/m/MessageBox"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, MessageBox) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.create.Scenary3", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.create.Scenary3",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaOrd");
        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");

        this.getRouter().getRoute("amm.create.scenary3").attachPatternMatched(this._onObjectMatched, this);
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
          self.getRouter().navTo("amm.inputSop", {
            type: this._sTypeSop,
            Reset: false
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
        var oWizard = self.getView().byId("wizScenario3");
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
        self.checkPermissions("A", "Registra")

        this._sTypeSop = oArguments.TypeSop;

        self.createModelSop("3");
        self.setFirstSopData(oArguments);
        self.createModelFiltersWizard1();
        self.createModelStepScenarioReg();
        self.createModelClassificazione();
        self.createModelUtilityReg("gestionesop.view.amm.create.Scenary3");
      },

      onStart: function () {
        this.checkExistDocumentForUser()

      },

      _getPosizioniScen3: function () {
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
          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
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

      onSelectedItem: function (oEvent) {
        var self = this;
        var bSelected = oEvent.getParameter("selected");
        //Load Model
        var oTable = self.getView().byId("tblPosizioniScen3")
        var oModelPosizioni = self.getModel("PosizioniScen3");
        var oModelSop = self.getModel("Sop");
        //Load Component
        var oButtonCalculate = self.getView().byId("btnCalculate");

        var aSelectedItems = oModelSop.getProperty("/Position");
        var aListItems = oEvent.getParameter("listItems");

        aListItems.map(async function (oListItem) {
          var oSelectedItem = oModelPosizioni.getObject(oListItem.getBindingContextPath());

          if (bSelected) {
            var oResponse = await self.lockQuoteBeneficiario(oSelectedItem)

            if (oResponse.data.Type === 'S') {
              aSelectedItems.push(oSelectedItem);
              oModelSop.setProperty("/Position", aSelectedItems);
              oButtonCalculate.setVisible(aSelectedItems.length !== 0);
              oModelSop.setProperty("/Zimptot", "0.00");
            }
            else {
              MessageBox.error(oResponse.data.Message)
              oTable.setSelectedItem(oListItem, false)
            }
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

            self.unlockQuoteBeneficiario(oSelectedItem)
            oModelSop.setProperty("/Position", aSelectedItems);
            oButtonCalculate.setVisible(aSelectedItems.length !== 0);
            oModelSop.setProperty("/Zimptot", "0.00");
          }
        });


      },

      checkExistDocumentForUser: function () {
        var self = this;
        var oModel = self.getModel()
        var oSop = self.getModel("Sop").getData()

        self.getView().setBusy(true)
        oModel.callFunction("/CheckExisitingDocument", {
          urlParameters: {
            Lifnr: oSop.Lifnr
          },
          success: function (data) {
            self.getView().setBusy(false)
            if (data.results.length > 0) {
              MessageBox.warning(
                "Per il Beneficiario selezionato esistono Documenti di costo. Verificare se è necessario procedere con la registrazione di un SOP da documenti di costo",
                {
                  actions: [MessageBox.Action.OK, MessageBox.Action.CLOSE],
                  onClose: function (oAction) {
                    if (oAction === 'OK') {
                      self._getPosizioniScen3()
                      return
                    }
                  },
                }
              )
            }
          },
          error: function () {
            self.getView().setBusy(false)
          }
        })
      },

    });
  }
);
