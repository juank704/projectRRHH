package lib.data.json;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConvierteNumToPalabras {
	
	private static final String UNIDADES[] = {"", "Un ", "Dos ", "Tres ", "Cuatro ", "Cinco ", "Seis ", "Siete ", "Ocho ", "Nueve "};
    private static final String DECENAS[]  = {"", "Dieci", "Veinti", "Treinta ", "Cuarenta ", "Cincuenta ", "Sesenta ", "Setenta ", "Ochenta ", "Noventa "};
    private static final String CENTENAS[] = {"", "Ciento ", "Doscientos ", "Trescientos ", "Cuatrocientos ", "Quinientos ", "Seiscientos ", "Setecientos ", "Ochocientos ", "Novecientos "};

    private final static Logger LOG = LoggerFactory.getLogger(ConvierteNumToPalabras.class);
    
    
    
    /**
     * Convierte el n�mero que recibe como argumento a su representaci�n escrita con letra.
     * 
     * @param s Una cadena de texto que contiene los d�gitos de un n�mero.
     * @return  Una cadena de texto que contiene la representaci�n con letra de
     *          la parte entera del n�mero que se recibi� como argumento.
     */
    public static String cantidadConLetra(String s) {
        StringBuilder result = new StringBuilder();
        BigDecimal totalBigDecimal = new BigDecimal(s).setScale(2, BigDecimal.ROUND_DOWN);
        long parteEntera = totalBigDecimal.toBigInteger().longValue();
        int triUnidades      = (int)((parteEntera % 1000));
        int triMiles         = (int)((parteEntera / 1000) % 1000);
        int triMillones      = (int)((parteEntera / 1000000) % 1000);
        int triMilMillones   = (int)((parteEntera / 1000000000) % 1000);
        
        if (parteEntera == 0) {
            result.append("Cero ");
            return result.toString();
        }
        
        if (triMilMillones > 0) result.append(triTexto(triMilMillones).toString() + "Mil ");
        if (triMillones > 0)    result.append(triTexto(triMillones).toString());
        
        if (triMilMillones == 0 && triMillones == 1) result.append("Mill�n ");
        else if (triMilMillones > 0 || triMillones > 0) result.append("Millones ");
        
        if (triMiles > 0)       result.append(triTexto(triMiles).toString() + "Mil ");
        if (triUnidades > 0)    result.append(triTexto(triUnidades).toString());
        
        return result.toString();
    }
    
    /**
     * Convierte una cantidad de tres cifras a su representaci�n escrita con letra.
     * 
     * @param n La cantidad a convertir.
     * @return  Una cadena de texto que contiene la representaci�n con letra 
     *          del n�mero que se recibi� como argumento.
     */
    private static StringBuilder triTexto(int n) {
        StringBuilder result = new StringBuilder();
        int centenas = n / 100;
        int decenas  = (n % 100) / 10;
        int unidades = (n % 10);
        
        if (n == 100) {
            result.append("Cien ");
            return result;
        }
        else result.append(CENTENAS[centenas]);
        
        if (decenas == 1 && unidades <= 5) {
            if (unidades == 0) result.append("Diez ");
            else if (unidades == 1) result.append("Once ");
            else if (unidades == 2) result.append("Doce ");
            else if (unidades == 3) result.append("Trece ");
            else if (unidades == 4) result.append("Catorce ");
            else if (unidades == 5) result.append("Quince ");
            return result;
        }
        else if (decenas == 2 && unidades == 0) {
            result.append("Veinte ");
            return result;
        }
        else result.append(DECENAS[decenas]);
        
        if (decenas > 2 && unidades > 0)
            result.append("y ");
        
        result.append(UNIDADES[unidades]);
        
        return result;
    }

}
