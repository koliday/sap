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
}
