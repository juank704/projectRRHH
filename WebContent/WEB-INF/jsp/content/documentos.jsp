<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	
	<tr role ="row">
				
				<td>
					<div class="margin-bottom-5" align="right">
						<button class="btn btn-sm green btn-outline filter-submit margin-bottom" onclick="addDoc();">
							Agregar Documento  <i class="fa fa-plus"></i>
						</button>
					</div>
				</td>
	</tr>

	<table
		class="table table-striped table-bordered table-hover table-checkable"
		id="datatable_ajax">
		<thead>
		
			
		
			<tr role="row" class="heading">
				<th width="60%">Nombre</th>
				<th width="20%">Acciones</th>
			</tr>
			
			<tr role="row" class="filter">
				<td><input type="text"
					class="form-control form-filter " id="test2" name="vw_nombre">
				</td>
				
				<td>
					<div class="margin-bottom-5">
						<button class="btn btn-sm green btn-outline filter-submit margin-bottom">
							<i class="fa fa-search"></i>
						</button>
						<button class="btn btn-sm red btn-outline filter-cancel">
							<i class="fa fa-times"></i> Reset
						</button>
					</div>

				</td>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>



</body>
</html>