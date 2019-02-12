package lib.db.sw;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;

import lib.classSW.VacacionesTrabajador;
import lib.db.ConnectionDB;
import lib.struc.filterSql;

public class VacacionesDB {

	// Obtener Todos los Trabajadores con filtros
		public static ArrayList<VacacionesTrabajador> getAllVacacionesWithFilter(ArrayList<filterSql> filter) throws Exception {

			PreparedStatement ps = null;
			String sql = "";
			ConnectionDB db = new ConnectionDB();

			ArrayList<VacacionesTrabajador> lista = new ArrayList<VacacionesTrabajador>();

			try {

				// Crear sentencia en Sql
				sql = " SELECT * FROM sw_r_vacacionesTrabajador ";
				ps = db.conn.prepareStatement(sql);

				// Si contiene datos asignarlo al WHERE
				if (filter.size() > 0) {
					String andSql = "";
					andSql += " WHERE ";
					Iterator<filterSql> f = filter.iterator();

					while (f.hasNext()) {
						filterSql row = f.next();

						if (!row.getValue().equals("")) {

							if (row.getCampo().endsWith("_to")) {

								SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
								SimpleDateFormat sqlDate = new SimpleDateFormat("yyyyMMdd");
								sql += andSql + row.getCampo().substring(0, row.getCampo().length() - 3) + " <='"
										+ sqlDate.format(formatter.parse(row.getValue())) + "'";
							}

							else if (row.getCampo().endsWith("_from")) {

								SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
								SimpleDateFormat sqlDate = new SimpleDateFormat("yyyyMMdd");
								sql += andSql + row.getCampo().substring(0, row.getCampo().length() - 5) + " >='"
										+ sqlDate.format(formatter.parse(row.getValue())) + "'";
							}

							else

								sql += andSql + row.getCampo() + " like '%" + row.getValue() + "%'";

							andSql = " and ";
						}
					} // Fin While

				}

				ResultSet rs = ps.executeQuery(sql);

				while (rs.next()) {

					VacacionesTrabajador vacacionesTrabajador = VacacionesDB.setObjectVacacionesTrabajador(rs);
					lista.add(vacacionesTrabajador);

				}
				
				//Retornar Lista de Trabajadores
				return lista;
				
				// Fin Try
			} catch (Exception e) {
				throw new Exception("getAllTrabajadoresWithFilter: " + e.getMessage());
			} finally {
				db.close();
			}

		}// Fin getAllTrabajadors
	
	
	
		public static VacacionesTrabajador setObjectVacacionesTrabajador(ResultSet rs) throws SQLException {

			VacacionesTrabajador vt = new VacacionesTrabajador();
			
			vt.setIdVacacionesTrabajador(rs.getInt("idVacacionesTrabajador"));
			vt.setCodTrabajador(rs.getInt("codTrabajador"));
			vt.setFechaSolicitud(rs.getString("fechaSolicitud"));
			vt.setFechaAprobacion(rs.getString("fechaAprobacion"));
			vt.setDias(rs.getInt("dias"));
			vt.setEstado(rs.getInt("estado"));
			vt.setIdVacacion(rs.getInt("idVacacion"));	
			vt.setIdContrato(rs.getInt("idContrato"));
			vt.setFechaInicioVacacion(rs.getString("fechaInicioVacacion"));
			vt.setFechaFinVacacion(rs.getString("fechaFinVacacion"));
			vt.setIdFeriadosLegales(rs.getInt("idFeriadosLegales"));	
			vt.setIdFeriadosProgresivos(rs.getInt("idFeriadosProgresivos"));	
			vt.setIdFeriadosConvencionales(rs.getInt("idFeriadosConvencionales"));
			vt.setDiasHabiles(rs.getInt("diasHabiles"));
			vt.setRut(rs.getString("rut"));

			return vt;

		}
		
		
	
}
