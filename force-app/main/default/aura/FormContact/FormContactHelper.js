({
	getConctactById : function(component, idDoc, hlp) {
        // Update the items via a server-side action
        var action = component.get("c.getSearchContact");
        action.setParams({"documentId" : idDoc});
        // Set any optional callback and enqueue the action
        
		action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
				if(response.getReturnValue() != null){
					//console.log(response.getReturnValue());
					component.set("v.Contacto", response.getReturnValue())
					component.set('v.Id', response.getReturnValue().Id);
					console.log(component.get("v.Contacto"));
					this.showSuccess(component);
					this.handleFormReadOrNot(component);
				}else if(response.getReturnValue() == null){
					this.showError(component);
					component.set('v.Contacto', null);
				}
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Error Desconocido");
                }
            }
        });

        $A.enqueueAction(action);
    },

	createContact : function(component, hlp) {
        // Update the items via a server-side action
		var contacts = component.get("v.Contacto");
        if(contacts.LastName != "" && contacts.Numero_de_documento__c != ""){
            var action = component.get("c.saveContact");
            action.setParams({"con" : contacts});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log("El contacto se edito");
                    this.showSave(component);
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                     errors[0].message);
                            this.showErrorSave(component);
                        }
                    } else {
                        console.log("Error Desconocido");
                    }
                }
            });
        }else{
            this.showErrorSave(component);
        }
        // Set any optional callback and enqueue the action
        $A.enqueueAction(action);
    },

	getPicklistValues: function(component, event) {
        var action = component.get("c.getPicklistOptions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                
                component.set("v.pickList", result);
				console.log(result);
            }
        });
        $A.enqueueAction(action);
    },

	handleFormReadOrNot: function(cmp){
		var contacto = cmp.get("v.Contacto");
		if(contacto.Altura__c != undefined ){
			cmp.set("v.EditAltura", true);
		}else{
			cmp.set("v.EditAltura", false);
		}
		if(contacto.Color_de_cabello__c != undefined){
			cmp.set("v.EditCcabello", true);
		}else{
			cmp.set("v.EditCcabello", false);
		}
		if(contacto.Color_de_ojos__c != undefined){
			cmp.set("v.EditCojos", true);
		}else{
			cmp.set("v.EditCojos", false);
		}
		if(contacto.Genero__c != undefined){
			cmp.set("v.EditGenero", true);
		}else{
			cmp.set("v.EditGenero", false);
		}
		if(contacto.LastName != undefined){
			cmp.set("v.EditLastName", true);
		}else{
			cmp.set("v.EditLastName", false);
		}
		if(contacto.Numero_de_documento__c != undefined){
			cmp.set("v.EditDoc", true);
		}else{
			cmp.set("v.EditDoc", false);
		}

	},

	showSuccess : function(cmp) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Éxito',
            message: 'Se ha encontrado un registro',
            duration:' 2000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },

	showSave : function(cmp) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Éxito',
            message: 'Se ha editado con éxito el contacto',
            duration:' 2000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },

	showError : function(cmp) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message: 'No se han encontrado registros',
            duration:' 2000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },

	showErrorSave : function(cmp) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message: 'No se pudo editar el registro',
            duration:' 2000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    }
})