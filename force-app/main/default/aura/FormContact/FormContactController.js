({
	doInit: function(component, event, helper) {        
        helper.getPicklistValues(component, event);
    },

	handleSearch : function(cmp, event, helper) {
		let docId = cmp.get("v.documentId");
        console.log(docId);
		debugger;
		helper.getConctactById(cmp,docId, helper);
	},

	handleSave: function(cmp, event, helper){
		helper.createContact(cmp);
	}
})