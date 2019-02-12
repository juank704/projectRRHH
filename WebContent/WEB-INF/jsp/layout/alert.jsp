<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%if(session.getAttribute("perfil").equals("agro") || session.getAttribute("perfil").equals("admin")){%>	
 <li class="dropdown dropdown-extended dropdown-notification"
	id="header_notification_bar"><a title="Fitosanitario" href="javascript:;"
	class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	data-close-others="true"> <i class="fa fa-calendar"></i> <span
		class="badge badge-danger" id="notificacion">  </span>
</a>
	<ul class="dropdown-menu">
		<li class="external">
			<h3>
				<span class="bold" id="pending"></span> Notificaciones
			</h3> <a href="incidencias">Ver todo</a>
		</li>
		<li>
			<ul class="dropdown-menu-list scroller" id="listNotificacion" style="height: 250px;"
				data-handle-color="#637283">
				<li>
					<a href="javascript:;">
						<span class="time">just now</span>
						<span class="details">
							<span class="label label-sm label-icon label-success"><i class="fa fa-plus"></i></span> New user registered.
						</span>
					</a>
				</li>

			</ul>
		</li>
	</ul></li>
	
<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
	<a title="Incidencias" href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><i class="icon-bell"></i>
 	 	<span class="badge badge-danger" id="IncidenciasNotify">  </span>
	</a>
	<ul class="dropdown-menu">
		<li class="external">
			<h3>
				<span class="bold" id="inciPending"></span> Notificacion(es)
			</h3> <a href="incidencias">Ver todo</a>
		</li>
		<li>
			<ul class="dropdown-menu-list scroller" id="InciNotificacion" style="height: 250px;"
				data-handle-color="#637283">

			</ul>
		</li>
	</ul>
</li>
	
	<%}%>
	
	<!-- NOTIFICACIONES SIMPLEWORK -->
	
	
	<%if(session.getAttribute("perfil").equals("work") || session.getAttribute("perfil").equals("admin")){%>	

	
<li class="dropdown dropdown-extended dropdown-notification"
	id="header_notification_bar"><a title="Reclutamiento" href="javascript:;"
	class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	data-close-others="true"> <i class="fa fa-users"></i> <span
		class="badge badge-danger" id="notificacionWork">  </span>
</a>
	<ul class="dropdown-menu">
		<li class="external">
			<h3>
				<span class="bold" id="pendingWork"></span> Reclutamiento
			 </h3> <!--<a href="page_user_profile_1.html">view all</a>-->
		</li>
		<li>
			<ul class="dropdown-menu-list scroller" id="listWorkReclutamiento" style="height: 250px;"
				data-handle-color="#637283">
<!-- 				<li><a href="javascript:;"> <span class="time">just -->
<!-- 							now</span> <span class="details"> <span -->
<!-- 							class="label label-sm label-icon label-success"> <i -->
<!-- 								class="fa fa-plus"></i> -->
<!-- 						</span> New user registered. -->
<!-- 					</span> -->
<!-- 				</a></li> -->

			</ul>
		</li>
	</ul></li>
	
	<li class="dropdown dropdown-extended dropdown-notification"
	id="header_notification_bar"><a title="Contratacion" href="javascript:;"
	class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
	data-close-others="true"> <i class="fa fa-briefcase"></i> <span
		class="badge badge-danger" id="notificacionContratacion">  </span>
</a>
	<ul class="dropdown-menu">
		<li class="external">

				<span class="bold" id="pendingContratacion"></span> Contratación
			
		</li>
		<li>
			<ul class="dropdown-menu-list scroller" id="listContratacion" style="height: 250px;"
				data-handle-color="#637283">
				

			</ul>
		</li>
	</ul></li>
	<%}%>