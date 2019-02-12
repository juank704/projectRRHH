package lib.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import lib.io.config;

public class ConnectionDB {

	public Connection conn = null;

	public ConnectionDB() {
		try {

			Class.forName(config.getProperty("driverDB"));
			conn = DriverManager.getConnection(config.getProperty("urlDB"), config.getProperty("userDB"),
					config.getProperty("passDB"));

		} catch (ClassNotFoundException e) {
			System.out.println("Clase no encontrada: " + e.getMessage());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("Error Conexion: " + e.getMessage());
		}
	}

	public void close() {
		try {
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			System.out.println("Error cerrar conexion: " + e.getMessage());
		}
	}

}
