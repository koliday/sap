package com.koliday.sap.utils;


public class IdConvertToNoUtil {
    public static String convertClient(Integer clid){
        String clidString=String.valueOf(clid);
        String result="CL";
        for(int i=0;i<6-clidString.length();i++){
            result+="0";
        }
        return result+=clidString;
    }
    public static String convertInquiry(Integer inid){
        String inidString=String.valueOf(inid);
        String result="IN";
        for(int i=0;i<6-inidString.length();i++){
            result+="0";
        }
        return result+=inidString;
    }
    public static String converItem(Integer itemid){
        String itemidString=String.valueOf(itemid);
        String result="IT";
        for(int i=0;i<6-itemidString.length();i++){
            result+="0";
        }
        return result+=itemidString;
    }

    public static String convertQuotation(int quid) {
        String quidString=String.valueOf(quid);
        String result="QT";
        for(int i=0;i<6-quidString.length();i++){
            result+="0";
        }
        return result+=quidString;
    }

    public static String convertSalesOrder(int orid) {
        String oridString=String.valueOf(orid);
        String result="OR";
        for(int i=0;i<6-oridString.length();i++){
            result+="0";
        }
        return result+=oridString;
    }

    public static String convertDelivery(int deid) {
        String deidString=String.valueOf(deid);
        String result="DE";
        for(int i=0;i<6-deidString.length();i++){
            result+="0";
        }
        return result+=deidString;
    }
    public static String convertInvoice(int ivid) {
        String ividString=String.valueOf(ivid);
        String result="IV";
        for(int i=0;i<6-ividString.length();i++){
            result+="0";
        }
        return result+=ividString;
    }
}
