sap.ui.define(
  ["./../BaseAmministrazioneController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "../../../model/formatter", "sap/m/MessageBox"],
  function (BaseAmministrazioneController, Filter, FilterOperator, JSONModel, formatter, MessageBox) {
    "use strict";

    return BaseAmministrazioneController.extend("gestionesop.controller.amm.detail.Scenary2", {
      formatter: formatter,

      onInit: function () {
        var self = this;

        var oModelUtility = new JSONModel({
          ViewId: "gestionesop.view.amm.detail.Scenary2",
        });

        self.setModel(oModelUtility, "Utility");

        self.acceptOnlyImport("iptImpDaOrdEdit");
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

        this.getRouter().getRoute("amm.detail.scenary2").attachPatternMatched(this._onObjectMatched, this);
      },

      onNavBack: function () {
        var self = this;
        var oView = self.getView();
        var oWizard = oView.byId("wizScenario2");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility")

        var bWizard1Step1 = oModelStepScenario.getProperty("/wizard1Step1");
        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var bWizard4 = oModelStepScenario.getProperty("/wizard4");
        var bEnableEditMode = oModelUtility.getProperty("/EnableEditMode")
        var sTable = oModelUtility.getProperty("/Table")

        if (bWizard1Step1) {
          oModelStepScenario.setProperty("/wizard1Step1", false);
          oModelStepScenario.setProperty("/wizard1Step2", true);
          oModelUtility.setProperty("/Table", "Edit")
        } else if (bWizard1Step2) {
          switch (sTable) {
            case "Edit": {
              self.unlockSop()
              self.setModel(new JSONModel({}), "Sop")
              self.getRouter().navTo("amm.home", {
                Reload: false,
              });
              break;
            }
            case "Add": {
              oModelStepScenario.setProperty("/wizard1Step2", false);
              oModelStepScenario.setProperty("/wizard1Step1", true);
              oModelStepScenario.setProperty("/visibleBtnForward", false);
              oModelStepScenario.setProperty("/visibleBtnStart", true);
              break;
            }
          }
        } else if (bWizard1Step3) {
          if (bEnableEditMode) {
            oModelStepScenario.setProperty("/wizard1Step3", false);
            oModelStepScenario.setProperty("/wizard1Step2", true);
            return;
          }
          self.unlockSop()
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
        var oWizard = self.getView().byId("wizScenario2");
        var oModelStepScenario = self.getModel("StepScenario");
        var oModelUtility = self.getModel("Utility")

        var bWizard1Step2 = oModelStepScenario.getProperty("/wizard1Step2");
        var bWizard1Step3 = oModelStepScenario.getProperty("/wizard1Step3");
        var bWizard2 = oModelStepScenario.getProperty("/wizard2");
        var bWizard3 = oModelStepScenario.getProperty("/wizard3");
        var sTable = oModelUtility.getProperty("/Table")

        if (bWizard1Step2) {
          switch (sTable) {
            case "Edit": {
              self.checkWizard1();
              break;
            }
            case "Add": {
              self.checkWizard1Add()
              break;
            }
          }
        } else if (bWizard1Step3) {
          oModelStepScenario.setProperty("/wizard1Step3", false);
          oModelStepScenario.setProperty("/wizard2", true);
          self.createModelModPagamento();
          self.createModelSedeBeneficiario();
          self.setSedeBeneficiario();
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
        self.setModelSop(oParameters);
        self.createModelClassificazione();
        self.createModelStepScenarioDet();
        self.createModelFiltersWizard1();
        await self.createModelUtilityDet("gestionesop.view.amm.detail.Scenary2")
        self.lockSop(oParameters);

      },

      onEdit: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility")
        var oModelStepScenario = self.getModel("StepScenario")

        oModelUtility.setProperty("/EnableEditMode", true)
        oModelUtility.setProperty("/Function", "Rettifica")
        oModelUtility.setProperty("/RemoveFunctionButtons", true)

        self.resetWizard("wizScenario2");
        oModelStepScenario.setProperty("/wizard1Step3", false)
        oModelStepScenario.setProperty("/wizard1Step2", true)
        oModelStepScenario.setProperty("/visibleBtnForward", true)
        oModelStepScenario.setProperty("/visibleBtnSave", false)
        oModelStepScenario.setProperty("/visibleBtnStart", false)
        oModelUtility.setProperty("/Table", "Edit")
        oModelUtility.setProperty("/EnableEdit", true)
        self.createModelEditPositions()
        return;

      },

      onStart: function () {
        var self = this;
        var oModel = self.getModel();
        var oModelStepScenario = self.getModel("StepScenario");
        var aFilters = self.setFiltersWizard1();
        var oPanelCalculator = self.getView().byId("pnlCalculatorList");
        var aPositionsSop = self.getModel("Sop").getProperty("/Position")
        var oModelUtility = self.getModel("Utility")
        var oSop = self.getModel("Sop").getData()

        self.setFilterEQ(aFilters, "ZzTipoent", oSop.ZzTipoent)
        self.setFilterEQ(aFilters, "Zchiavesop", oSop.Zchiavesop)

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
              oModelUtility.setProperty("/Table", "Add")
            }

            var aPosizioni = data?.results;
            aPosizioni?.map((oPosition, iIndex) => {
              oPosition.Index = iIndex + 1;
              oPosition.Zimptot = oPosition.Wrbtr
            });

            //Rimuovo le posizioni già aggiunte al SOA
            if (aPosizioni.length !== 0) {
              aPositionsSop.map((oPosizione) => {
                var iIndex = aPosizioni.findIndex((obj) => {
                  return (
                    obj.Docid === oPosizione.Docid
                  );
                });

                if (iIndex > -1) {
                  aPosizioni.splice(iIndex, 1);
                }
              });
            }
            self.setModel(new JSONModel(aPosizioni), "PosizioniScen2");
            oPanelCalculator.setVisible(aPosizioni.length !== 0);

          },
          error: function () {
            self.getView().setBusy(false);
          },
        });
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
            self.resetWizard("wizScenario2");
            self.setModelSop(oParameters);
            self.createModelStepScenarioDet();
            oModelUtility.setProperty("/EnableEdit", false)
            self.getView().byId("idToolbarDetail").setVisible(true)
            break;
          }
          case "Workflow": {
            self.getView().byId("idToolbarDetail").setVisible(false)
            self.createModelWF()
            break;
          }
          case "Rettifica": {
            self.resetWizard("wizScenario2");
            oModelStepScenario.setProperty("/wizard1Step3", false)
            oModelStepScenario.setProperty("/wizard1Step2", true)
            oModelStepScenario.setProperty("/visibleBtnForward", true)
            oModelStepScenario.setProperty("/visibleBtnSave", false)
            oModelStepScenario.setProperty("/visibleBtnStart", false)
            oModelUtility.setProperty("/Table", "Edit")
            oModelUtility.setProperty("/EnableEdit", true)
            self.createModelEditPositions()
            break;
          }
          case "FascicoloElettronico": {
            self.getView().byId("idToolbarDetail").setVisible(false)
            break;
          }
        }
      },

      onDeletePosition: function () {
        var self = this;
        var oTable = self.getView().byId("tblEditPosizioniScen2");

        MessageBox.warning(
          "Procedere con la cancellazione delle righe selezionate?",
          {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            title: "Rettifica SOP - Cancellazione Righe",
            onClose: function (oAction) {
              if (oAction === "OK") {
                var oModelUtility = self.getModel("Utility");
                var oModelSop = self.getModel("Sop");

                var aDeletedPositions = oModelUtility.getProperty("/DeletedPositions")
                var aSelectedItems = oModelUtility.getProperty(
                  "/SelectedPositions"
                );
                var aPositions = oModelSop.getProperty("/Position");

                oTable.removeSelections();

                aSelectedItems.map((oSelectedItem) => {
                  if (oSelectedItem.Zchiavesop) {
                    oSelectedItem.Tiporiga = 'D'
                    aDeletedPositions.push(oSelectedItem)
                  }
                  var iIndex = aPositions.findIndex((oPosition) => {
                    return (
                      oPosition.Bukrs === oSelectedItem.Bukrs &&
                      oPosition.Zposizione === oSelectedItem.Zposizione &&
                      oPosition.Znumliq === oSelectedItem.Znumliq &&
                      oPosition.Zversione === oSelectedItem.Zversione &&
                      oPosition.ZversioneOrig === oSelectedItem.ZversioneOrig
                    );
                  });


                  if (iIndex > -1) {
                    aPositions.splice(iIndex, 1);
                  }
                });

                oModelSop.setProperty("/Position", aPositions);
                oModelUtility.setProperty("/DeletedPositions", aDeletedPositions)
                oModelUtility.setProperty("/SelectedPositions", [])

                var fTotal = 0;
                aPositions.map((oPosition) => {
                  fTotal += parseFloat(oPosition?.Zimpdaord);
                });

                oModelSop.setProperty("/Zimptot", fTotal.toFixed(2));
              }
            },
          }
        );
      },

      onAddPosition: function () {
        var self = this;
        var oModelUtility = self.getModel("Utility");
        var oModelStepScenario = self.getModel("StepScenario");

        oModelStepScenario.setProperty("/wizard1Step1", true);
        oModelStepScenario.setProperty("/wizard1Step2", false);
        oModelStepScenario.setProperty("/wizard1Step3", false);
        oModelStepScenario.setProperty("/visibleBtnStart", true);
        oModelStepScenario.setProperty("/visibleBtnForward", false);

        oModelUtility.setProperty("/SelectedPositions", [])
        oModelUtility.setProperty("/AddZimptot", "0.00")
        self.createModelBeneficiarioRettifica()

      },

      onSelectedItemEdit: function (oEvent) {
        var self = this;
        var oModelUtility = self.getModel("Utility")
        var bSelected = oEvent.getParameter("selected");

        var oTable = self.getView().byId("tblEditPosizioniScen2");
        var oModelTable = oTable.getModel("Sop");

        var aSelectedItems = oModelUtility.getProperty("/SelectedPositions");
        var aListItems = oEvent.getParameter("listItems");

        aListItems.map((oListItem) => {
          var oSelectedItem = oModelTable.getObject(oListItem.getBindingContextPath());

          if (bSelected) {
            oListItem.getAggregation("cells")[10].setEnabled(true)
            aSelectedItems.push(oSelectedItem);
          } else {
            oListItem.getAggregation("cells")[10].setEnabled(false)
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
          oModelUtility.setProperty("/SelectedPositions", aSelectedItems);
        });
      },

      onSelectedItem: async function (oEvent) {
        var self = this;
        var aError = [];
        var bSelected = oEvent.getParameter("selected");
        //Load Model
        var oTable = self.getView().byId("tblPosizioniScen2")
        var oModelPosizioni = self.getModel("PosizioniScen2");
        var oModelSop = self.getModel("Sop");
        var oModelUtility = self.getModel("Utility")
        //Load Component
        var oButtonCalculate = self.getView().byId("btnCalculate");

        var aSelectedItems = oModelUtility.getProperty("/SelectedPositions");
        var aListItems = oEvent.getParameter("listItems");

        for (var i = 0; i < aListItems.length; i++) {
          var oListItem = aListItems[i];
          var oSelectedItem = oModelPosizioni.getObject(oListItem.getBindingContextPath());

          if (bSelected) {
            aListItems[i].getAggregation("cells")[10].setEnabled(true)
            var oResponse
            if (oModelSop.getProperty("/ZspecieSop") === '1') {
              oResponse = await self.lockQuoteBeneficiario(oSelectedItem)
            } else {
              oResponse = await self.lockQuoteRitenute(oSelectedItem)
            }

            if (oResponse.data.Type === 'S') {
              aSelectedItems.push(oSelectedItem);
              oModelUtility.setProperty("/SelectedPositions", aSelectedItems);
              oButtonCalculate.setVisible(aSelectedItems.length !== 0);
              oModelUtility.setProperty("/AddZimptot", "0.00");
              continue
            }

            aError.push({
              Msgid: "",
              Msgty: oResponse?.data?.Type,
              Msgno: "",
              Message: oResponse?.data?.Message,
            })
            oTable.setSelectedItem(oListItem, false)
            aListItems[i].getAggregation("cells")[10].setEnabled(false)
          } else {
            aListItems[i].getAggregation("cells")[10].setEnabled(false)
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
            if (oModelSop.getProperty("/ZspecieSop") === '1') {
              await self.unlockQuoteBeneficiario(oSelectedItem)
            } else {
              await self.unlockQuoteRitenute(oSelectedItem)
            }

            oModelUtility.setProperty("/SelectedPositions", aSelectedItems);
            oButtonCalculate.setVisible(aSelectedItems.length !== 0);
            oModelUtility.setProperty("/AddZimptot", "0.00");
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

      onImpDaOrdinareChangeAdd: function (oEvent) {
        var self = this;
        var oTable = self.getView().byId("tblPosizioniScen2");
        var oTableModel = oTable.getModel("PosizioniScen2");
        var oModelUtility = self.getModel("Utility");

        var sValue = oEvent.getParameter("value");
        oModelUtility.setProperty("/AddZimptot", "0.00");

        if (sValue) {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = parseFloat(sValue).toFixed(2);
        } else {
          oTableModel.getObject(oEvent.getSource().getParent().getBindingContextPath()).Zimpdaord = "0.00";
        }
      },

      onImpDaOrdinareChangeEdit: function (oEvent) {
        var self = this;
        var oTableDocumenti = self.getView().byId("tblEditPosizioniScen2");
        var oTableModelDocumenti = oTableDocumenti.getModel("Sop");
        var oModelSop = self.getModel("Sop")

        var sValue = oEvent.getParameter("value");

        if (sValue) {
          oTableModelDocumenti.getObject(
            oEvent.getSource().getParent().getBindingContextPath()
          ).Zimpdaord = parseFloat(sValue).toFixed(2);
        } else {
          oTableModelDocumenti.getObject(
            oEvent.getSource().getParent().getBindingContextPath()
          ).Zimpdaord = "0.00";
        }

        var fZimptot = 0.00;
        oTableModelDocumenti.getData().Position.map((oPosizione) => {
          fZimptot += parseFloat(oPosizione.Zimpdaord)
        })

        oModelSop.setProperty("/Zimptot", fZimptot.toFixed(2))
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
