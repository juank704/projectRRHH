package lib.classSW;


public class solicitudVacacion {
	public int idSolicitud;
	public int idTrabajador;
	public int idContrato;
	public int codTrabajador;
	public String rut;
	public String nombre;
	public String apellidoPaterno;
	public String apellidoMaterno;
	public String fechaSolicitud;
	public String fechaInicioSolicitud;
	public String fechaFinSolicitud;
	public int periodoSolicitud;
	public int cantidadDiasSolicitud;
	public String estadoSolicitud;
	public String descripcionSolicitud;
	public int comprobanteSolicitud;
	
	
	public String getRut() {
		return rut;
	}
	public void setRut(String rut) {
		this.rut = rut;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidoPaterno() {
		return apellidoPaterno;
	}
	public void setApellidoPaterno(String apellidoPaterno) {
		this.apellidoPaterno = apellidoPaterno;
	}
	public String getApellidoMaterno() {
		return apellidoMaterno;
	}
	public void setApellidoMaterno(String apellidoMaterno) {
		this.apellidoMaterno = apellidoMaterno;
	}
	public int getIdContrato() {
		return idContrato;
	}
	public void setIdContrato(int idContrato) {
		this.idContrato = idContrato;
	}
	public int getCodTrabajador() {
		return codTrabajador;
	}
	public void setCodTrabajador(int codTrabajador) {
		this.codTrabajador = codTrabajador;
	}
	
	
	public int getIdTrabajador() {
		return idTrabajador;
	}
	public void setIdTrabajador(int idTrabajador) {
		this.idTrabajador = idTrabajador;
	}
	public String getEstadoSolicitud() {
		return estadoSolicitud;
	}
	public void setEstadoSolicitud(String estadoSolicitud) {
		this.estadoSolicitud = estadoSolicitud;
	}
	public String getDescripcionSolicitud() {
		return descripcionSolicitud;
	}
	public void setDescripcionSolicitud(String descripcionSolicitud) {
		this.descripcionSolicitud = descripcionSolicitud;
	}

	
	
	
	public int getIdSolicitud() {
		return idSolicitud;
	}
	public void setIdSolicitud(int idSolicitud) {
		this.idSolicitud = idSolicitud;
	}
	public String getFechaSolicitud() {
		return fechaSolicitud;
	}
	public void setFechaSolicitud(String fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}
	public String getFechaInicioSolicitud() {
		return fechaInicioSolicitud;
	}
	public void setFechaInicioSolicitud(String fechaInicioSolicitud) {
		this.fechaInicioSolicitud = fechaInicioSolicitud;
	}
	public String getFechaFinSolicitud() {
		return fechaFinSolicitud;
	}
	public void setFechaFinSolicitud(String fechaFinSolicitud) {
		this.fechaFinSolicitud = fechaFinSolicitud;
	}
	public int getPeriodoSolicitud() {
		return periodoSolicitud;
	}
	public void setPeriodoSolicitud(int periodoSolicitud) {
		this.periodoSolicitud = periodoSolicitud;
	}
	public int getCantidadDiasSolicitud() {
		return cantidadDiasSolicitud;
	}
	public void setCantidadDiasSolicitud(int cantidadDiasSolicitud) {
		this.cantidadDiasSolicitud = cantidadDiasSolicitud;
	}
	public int getComprobanteSolicitud() {
		return comprobanteSolicitud;
	}
	public void setComprobanteSolicitud(int comprobanteSolicitud) {
		this.comprobanteSolicitud = comprobanteSolicitud;
	}
	public solicitudVacacion createBlankSolicitudVacacion()
	{
		return this;
	}
	
}
