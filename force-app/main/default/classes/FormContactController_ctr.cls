public with sharing class FormContactController_ctr {
    
    @AuraEnabled(cacheable = true)
    public static Contact getSearchContact(Integer documentId){
        
        System.debug(documentId);
        Contact c = new Contact();
        try{
            c = [SELECT Id, LastName, Altura__c, Genero__c, Color_de_cabello__c, Color_de_ojos__c, Numero_de_documento__c 
                 FROM Contact
                 WHERE Numero_de_documento__c =: documentId WITH SECURITY_ENFORCED LIMIT 1];
            return c;        
        }catch(Exception e){
            System.debug(e.getMessage());
        }
        
        return null;
    }

    @AuraEnabled
    public static void saveContact(Contact con){

        System.debug('Entro!!!: '+ con);

        try {
            upsert con;
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw new AuraHandledException('An error has ocurred');
        }
    }

    @AuraEnabled 
    public static List<SelectOptionObj> getPicklistOptions() {
        List<SelectOptionObj> picklistOptions = new List<SelectOptionObj>();
        try {
            Schema.SObjectType objDescribe = Schema.getGlobalDescribe().get('Contact');
            Schema.DescribeSObjectResult objDescribeResult = objDescribe.getDescribe();
            Map<String,Schema.SObjectField> fields = objDescribeResult.fields.getMap();
            Schema.DescribeFieldResult fieldResult = fields.get('Genero__c').getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            SelectOptionObj option = null;
            for (Schema.PicklistEntry pickListVal : ple) {
                option = new SelectOptionObj(pickListVal.getLabel(), pickListVal.getValue(), pickListVal.isDefaultValue());
                picklistOptions.add(option);
            }
            
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return picklistOptions;
    }

    public class SelectOptionObj {
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String value { get; set; }
        @AuraEnabled
        public Boolean isDefault {get; set;}
        
        public SelectOptionObj(String label, String val,Boolean isDefault) {
            this.label = label;
            this.value = val;
            this.isDefault = isDefault;
        }
    }

}