package lib.utils;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class GeneralUtility {

	public static BigDecimal formatStringToBigDecimal(String monto){
		
		String value = monto;
		BigDecimal money = new BigDecimal(value.replaceAll(",", ""));
		
		return money;
	}
	
	
	
	public static String FormatearRUT(String rut) {

		if (rut == null || rut.trim().isEmpty()) {
			return "";
		}

		int cont = 0;
		String format;
		rut = rut.replace(".", "");
		rut = rut.replace("-", "");
		format = "-" + rut.substring(rut.length() - 1);
		for (int i = rut.length() - 2; i >= 0; i--) {
			format = rut.substring(i, i + 1) + format;
			cont++;
			if (cont == 3 && i != 0) {
				format = "." + format;
				cont = 0;
			}
		}
		return format;
	}
	
	
	public static String convertDecimalNumber(String decimalNumber){
		
		try {
			
			double doubleHora = Double.parseDouble(decimalNumber);
			double taktTime = doubleHora;
			String stringTime = String.valueOf(taktTime);
			
			return stringTime; 
			
		} catch (Exception e) {
			return "0.0";
		}
		
	}
	
	public static boolean isArray(String cadena) {
		try {

			if (cadena.split(",").length >= 2) {
				return true;
			}

		} catch (Exception e) {
			return false;
		}

		return false;

	}

	public static String convertJSONArrayToArray(String cadena){
		
		try{
			String newCadena = cadena.replace("[", "").replace("]", "").replace("{", "").replace("}", "");
			return newCadena;
		}
		catch(Exception e){
			return "";
		}
	
		
	}
	
	public static String getCurrentDate() {
		DateFormat df = new SimpleDateFormat("dd-MM-yy_HHmmss");
		Calendar calobj = Calendar.getInstance();
		return df.format(calobj.getTime());
	}
	
	public static String getTodayDate() {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calobj = Calendar.getInstance();
		return df.format(calobj.getTime());
	}

	public static String getCurrentDateDDMMYYYY() {
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		Calendar calobj = Calendar.getInstance();
		return df.format(calobj.getTime());
	}

	public static boolean isNumeric(String str) {
		try {
			double d = Double.parseDouble(str);
			if (d == 0) {
			}
		} catch (NumberFormatException nfe) {
			return false;
		}
		return true;
	}
	
	public static String convertStringMMDDToDDMMYYY(String fecha) {

		String anio = fecha.substring(0, 4);
		String mes = fecha.replace(anio, "");
		String dia = "01";

		String fechaCompleta = dia + "-" + mes + "-" + anio;

		return fechaCompleta;
	}
	
	public static Integer convertYYYYMMToInt(int mmyyyy) {

		try {
			
			String cadena = String.valueOf(mmyyyy);
			
			if(cadena.length() != 6){
				cadena = "0"+cadena;
			}
			String mes  = cadena.substring(0, 2);
			String anio = cadena.substring(2, 6);
			
			String result = anio+mes;
			
			return Integer.valueOf(result);
			
			
		} catch (Exception e) {
			return 0;
		}

	}

	public static String capitalizeFirstLetter(String original) {
		if (original == null || original.length() == 0) {
			return original;
		}
		return original.substring(0, 1).toUpperCase() + original.substring(1);
	}

	/**
	 * Retorna String Convertido en YYYY-MM-DD Si el valor es null o vacio
	 * retorna null
	 * 
	 * @param fecha
	 * @return String
	 * @throws ParseException
	 */
	public static String convertStringToYYYYMMDD(String fecha) throws ParseException {

		try{
		
		if (fecha == null || fecha.isEmpty()) {
			return null;
		}

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		SimpleDateFormat output = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = output.parse(fecha.replace("/", "-"));

		if (fecha.equals(output.format(date))) {
			return fecha;
		}

		java.util.Date data = sdf.parse(fecha.replace("/", "-"));
		String formattedDate = output.format(data);

		return formattedDate;
		
		}catch(Exception e){
			
			return null;
			
		}
		

	}

	public static String formatStringNumberWithDotAndDecimal(String numberString) {

		try{
		
		String number = numberString;
		double amount = Double.parseDouble(number);
		String numberFormated = String.format("%,.0f", amount);
		return numberFormated;

		}catch(Exception e){
			
			return "";
			
		}

	}

	public static String convertStringDDMMYYToDateInWord(String fecha) {

		try {
		
		if (fecha == null) {
			return "";
		}

		Integer d, m, a;
		String Mes[] = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
				"Octubre", "Noviembre", "Diciembre" };
		String date[] = fecha.split("-");

		d = Integer.parseInt(date[0]);
		m = Integer.parseInt(date[1]);
		a = Integer.parseInt(date[2]);

		return (d + " de " + Mes[m - 1] + " de " + a);
		
		}catch(Exception e){
			return "";
		}

	}

	private static final String UNIDADES[] = { "", "Un ", "Dos ", "Tres ", "Cuatro ", "Cinco ", "Seis ", "Siete ",
			"Ocho ", "Nueve " };
	private static final String DECENAS[] = { "", "Dieci", "Veinti", "Treinta ", "Cuarenta ", "Cincuenta ", "Sesenta ",
			"Setenta ", "Ochenta ", "Noventa " };
	private static final String CENTENAS[] = { "", "Ciento ", "Doscientos ", "Trescientos ", "Cuatrocientos ",
			"Quinientos ", "Seiscientos ", "Setecientos ", "Ochocientos ", "Novecientos " };

	/**
	 * Convierte el n�mero que recibe como argumento a su representaci�n escrita
	 * con letra.
	 * 
	 * @param s
	 *            Una cadena de texto que contiene los d�gitos de un n�mero.
	 * @return Una cadena de texto que contiene la representaci�n con letra de
	 *         la parte entera del n�mero que se recibi� como argumento.
	 */
	public static String cantidadConLetra(String s) {
		StringBuilder result = new StringBuilder();
		BigDecimal totalBigDecimal = new BigDecimal(s).setScale(2, BigDecimal.ROUND_DOWN);
		long parteEntera = totalBigDecimal.toBigInteger().longValue();
		int triUnidades = (int) ((parteEntera % 1000));
		int triMiles = (int) ((parteEntera / 1000) % 1000);
		int triMillones = (int) ((parteEntera / 1000000) % 1000);
		int triMilMillones = (int) ((parteEntera / 1000000000) % 1000);

		if (parteEntera == 0) {
			result.append("Cero ");
			return result.toString();
		}

		if (triMilMillones > 0)
			result.append(triTexto(triMilMillones).toString() + "Mil ");
		if (triMillones > 0)
			result.append(triTexto(triMillones).toString());

		if (triMilMillones == 0 && triMillones == 1)
			result.append("Mill�n ");
		else if (triMilMillones > 0 || triMillones > 0)
			result.append("Millones ");

		if (triMiles > 0)
			result.append(triTexto(triMiles).toString() + "Mil ");
		if (triUnidades > 0)
			result.append(triTexto(triUnidades).toString());

		return result.toString();
	}

	/**
	 * Convierte una cantidad de tres cifras a su representaci�n escrita con
	 * letra.
	 * 
	 * @param n
	 *            La cantidad a convertir.
	 * @return Una cadena de texto que contiene la representaci�n con letra del
	 *         n�mero que se recibi� como argumento.
	 */
	private static StringBuilder triTexto(int n) {
		StringBuilder result = new StringBuilder();
		int centenas = n / 100;
		int decenas = (n % 100) / 10;
		int unidades = (n % 10);

		if (n == 100) {
			result.append("Cien ");
			return result;
		} else
			result.append(CENTENAS[centenas]);

		if (decenas == 1 && unidades <= 5) {
			if (unidades == 0)
				result.append("Diez ");
			else if (unidades == 1)
				result.append("Once ");
			else if (unidades == 2)
				result.append("Doce ");
			else if (unidades == 3)
				result.append("Trece ");
			else if (unidades == 4)
				result.append("Catorce ");
			else if (unidades == 5)
				result.append("Quince ");
			return result;
		} else if (decenas == 2 && unidades == 0) {
			result.append("Veinte ");
			return result;
		} else
			result.append(DECENAS[decenas]);

		if (decenas > 2 && unidades > 0)
			result.append("y ");

		result.append(UNIDADES[unidades]);

		return result;
	}

}
