sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, exportLibrary,
    Spreadsheet) {
    "use strict";

    const EDM_TYPE = exportLibrary.EdmType;

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.create.Scenary1", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.create.Scenary4",
        });

        self.setModel(oModelUtility, "Utility");

        // self.acceptOnlyImport("iptImpDaOrd");
        self.acceptOnlyImport("iptImpDaAssociareCos");
        self.acceptOnlyImport("iptImpDaAssociareCpv");
        self.acceptOnlyImport("iptImpDaAssociareCig");
        self.acceptOnlyImport("iptImpDaAssociareCup");

        this.getRouter().getRoute("amm.create.scenary4").attachPatternMatched(this._onObjectMatched, this);
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
          self.getRouter().navTo("amm.inputSop", {
            type: this._sTypeSop,
          });
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
        }
        else if (bWizard2) {
          oModelStepScenario.setProperty("/wizard2", false);
          oModelStepScenario.setProperty("/wizard3", true);
          oWizard.nextStep();
        } else if (bWizard3) {
          if (self.checkClassificazione()) {
            oModelStepScenario.setProperty("/wizard3", false);
            oModelStepScenario.setProperty("/wizard4", true);
            oModelStepScenario.setProperty("/visibleBtnForward", false);
            oModelStepScenario.setProperty("/visibleBtnSave", true);
            oWizard.nextStep();
          }
        }
      },

      onInserisciProspettoLiquidazione: function () {
        var self = this;
        var oWizard = self.getView().byId("wizScenario4");
        var oModelStepScenario = self.getModel("StepScenario");

        oModelStepScenario.setProperty("/wizard1Step2", false);
        oModelStepScenario.setProperty("/wizard2", true);
        oModelStepScenario.setProperty("/visibleBtnForward", true);
        oModelStepScenario.setProperty(
          "/visibleBtnInserisciProspLiquidazione",
          false
        );
        oWizard.nextStep();
      },

      _onObjectMatched: function (oEvent) {
        var self = this;
        var oArguments = oEvent.getParameter("arguments");

        this._sTypeSop = oArguments.TypeSop;

        self.createModelSop("4");
        self.setFirstSopData(oArguments);
        self.createModelClassificazione();
        self.createModelUtilityReg("gestionesop.view.amm.create.Scenary4");

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

      onImpLiquidazioneChange: function (oEvent) {
        var self = this;
        //Load Models
        var oModelSop = self.getModel("Sop");

        var sValue = oEvent.getParameter("value");
        if (sValue) {
          oModelSop.setProperty("/Zimptot", parseFloat(sValue).toFixed(2));
        } else {
          oModelSop.setProperty("/Zimptot", "0.00");
        }
      },

      onValueHelpCentroCosto: async function () {
        var self = this;
        var oSop = self.getModel("Sop").getData();
        var oModelCentroCosto = self.getModel("ZSS4_SEARCH_HELP_SRV")
        var sBukrs = oSop.Bukrs ? oSop.Bukrs : await self.getBukrs()
        var oDialog = self.loadFragment("gestionesop.view.fragment.value-help.CentroCosto");
        var aFilters = []

        self.setFilterEQ(aFilters, "Shlpname", 'ZHX_KOST');
        self.setFilterEQ(aFilters, "FilterValue", "Kokrs|" + sBukrs);

        self.getView().setBusy(true)
        oModelCentroCosto.read("/ZES_RetFieldValueSet", {
          filters: aFilters,
          success: function (data) {
            console.log(data)
            self.getView().setBusy(false)
            self.setModelDialog("CentroCosto", data, "sdCentroCosto", oDialog);
          },
          error: function () {
            self.getView().setBusy(false)
          }
        })
      },

      onValueHelpCentroCostoClose: function (oEvent) {
        var self = this;
        var oModelSop = self.getModel("Sop");
        var oSelectedItem = oEvent.getParameter("selectedItem");

        oModelSop.setProperty("/Kostl", self.setBlank(oSelectedItem?.getTitle()));
        oModelSop.setProperty("/DescKostl", self.setBlank(oSelectedItem?.getDescription()));

        this.unloadFragment();
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
              Zimptot: oSop.Zimptot
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

      onExport: function () {
        var oSheet;
        var self = this;
        var oSop = self.getModel("Sop").getData()

        var aCols = this._createColumnConfig();
        var oSettings = {
          workbook: {
            columns: aCols,
          },
          dataSource: oSop.Position,
          fileName: "Prospetto liquidazione.xlsx",
        };

        oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      _createColumnConfig: function () {
        var self = this;
        var oBundle = self.getResourceBundle();
        var aCols = [
          {
            label: oBundle.getText("labelTipoDocumento"),
            property: "Blart",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelDataDocumento"),
            property: "DataDocumento",
            type: EDM_TYPE.Date,
            format: "dd.mm.yyyy",
          },
          {
            label: oBundle.getText("labelDataCompetenza"),
            property: "DataCompetenza",
            type: EDM_TYPE.Date,
            format: "dd.mm.yyyy",
          },
          {
            label: oBundle.getText("labelDenomBenLiq"),
            property: "ZzragSoc",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelModPagamento"),
            property: "Zdescwels",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelIban"),
            property: "Iban",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelDurc"),
            property: "Zdurc",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelFermoAmm"),
            property: "ZfermAmm",
            type: EDM_TYPE.String,
          },
          {
            label: oBundle.getText("labelImpLiquidazione"),
            property: "Zimptot",
            type: EDM_TYPE.Number,
            scale: 2,
            delimiter: true,
          },
        ];

        return aCols;
      },
    });
  }
);
