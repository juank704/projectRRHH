package lib.classSW;

public class RHCalculo {
	public int idCalculo;
	public String concepto;
	public int idMoneda;
	public Divisas mon;	
	public double valor;
	public int idSociedad;
	public sociedad soc;
	public String modificado;
	public int idUsuario;	
	public Divisas getMon() {
		return mon;
	}
	public void setMon(Divisas mon) {
		this.mon = mon;
	}
	public sociedad getSoc() {
		return soc;
	}
	public void setSoc(sociedad soc) {
		this.soc = soc;
	}
	
	public int getIdCalculo() {
		return idCalculo;
	}
	public void setIdCalculo(int idCalculo) {
		this.idCalculo = idCalculo;
	}
	public String getConcepto() {
		return concepto;
	}
	public void setConcepto(String concepto) {
		this.concepto = concepto;
	}
	public int getMoneda() {
		return idMoneda;
	}
	public void setMoneda(int moneda) {
		this.idMoneda = moneda;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public int getIdSociedad() {
		return idSociedad;
	}
	public void setIdSociedad(int idSociedad) {
		this.idSociedad = idSociedad;
	}
	public String getModificado() {
		return modificado;
	}
	public void setModificado(String modificado) {
		this.modificado = modificado;
	}
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}
