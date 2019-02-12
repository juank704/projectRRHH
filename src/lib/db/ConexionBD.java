package lib.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lib.io.config;

public class ConexionBD {
	
	private final static Logger LOG = LoggerFactory.getLogger(ConexionBD.class);
	
	public static Connection connection;

    public static Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
            	LOG.info("Se crea conexion a Base de Datos MySql");
                Runtime.getRuntime().addShutdownHook(new getClose());
                Class.forName(config.getProperty("driverDB"));
                System.out.println(config.getProperty("urlDB"));
                connection = DriverManager.getConnection(config.getProperty("urlDB"), 
                										 config.getProperty("userDB"),
                										 config.getProperty("passDB"));
            }else{
            	LOG.info("Conexion a Base de Datos MySql ya esta creada");
            } 
            return connection;
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException("Conexi�n fallida", e);
        }
    }

    static class getClose extends Thread {

        @Override
        public void run() {
            try {
                Connection conn = ConexionBD.getConnection();
                conn.close();
                LOG.info("Se cierra conexion a Base de Datos MySql");
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
        }
    }
    
    public static void closeConnection() {
    	try {
	    	if (connection != null || !connection.isClosed()) {
	        	Connection conn = ConexionBD.getConnection();
                conn.close();
                LOG.info("Se cierra conexion a Base de Datos MySql");
	        }else{
	        	LOG.info("Conexion a Base de Datos MySql ya esta cerrada");
	        }
    	} catch (SQLException ex) {
    		System.out.println("Error ConexionBD: "+ex.getMessage());
            throw new RuntimeException(ex);
        }
    }

}
