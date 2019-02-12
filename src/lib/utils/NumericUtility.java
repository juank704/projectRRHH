package lib.utils;

import java.text.DecimalFormat;

public class NumericUtility {

	public static String formatDoubleToStringWithoutDecimal(double monto){
		
		try{
		
		 DecimalFormat df = new DecimalFormat("#"); 
		 String formatted = df.format(monto);
		 
		 return formatted;
		
		}catch(Exception e){
			
			return monto+"";
			
			
		} 
		
	}
	
	
	
	
}
