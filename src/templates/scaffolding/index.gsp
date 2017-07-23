<% import grails.persistence.Event %>
<%=packageName%>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="metro">
		<g:set var="entityName" value="\${message(code: '${domainClass.propertyName}.label', default: '${className}')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<div class="pagination">
			<ul>
				<li><a class="home" href="\${createLink(uri: '/')}"><i class="icon-home"></i><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><i class="icon-plus"></i><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-${domainClass.propertyName}" class="row-fluid sortable" role="main">
			<div class="box span12">
				<div class="box-header" data-original-title>
					<h2><i class="icon-folder-open"></i><span class="break"></span><g:message code="default.list.label" args="[entityName]" /></h2>
					<div class="box-icon">
						<a href="#" class="btn-close"><i class="icon-remove-sign"></i></a>
					</div>
				</div>
				<div class="box-content">
					<g:if test="\${flash.message}">
						<div class="message" role="status">\${flash.message}</div>
					</g:if>
					
					<table class="table table-bordered table-striped table-condensed">
						<thead>
							<tr>
							<%  excludedProps = Event.allEvents.toList() << 'id' << 'version'
								allowedNames = domainClass.persistentProperties*.name << 'dateCreated' << 'lastUpdated'
								props = domainClass.properties.findAll { allowedNames.contains(it.name) && !excludedProps.contains(it.name) && it.type != null && !Collection.isAssignableFrom(it.type) }
								Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))
								props.eachWithIndex { p, i ->
									if (i < 6) {
										if (p.isAssociation()) { %>
								<th><g:message code="${domainClass.propertyName}.${p.name}.label" default="${p.naturalName}" /></th>
							<%      } else { %>
								<g:sortableColumn property="${p.name}" title="\${message(code: '${domainClass.propertyName}.${p.name}.label', default: '${p.naturalName}')}" />
							<%  }   }   } %>
							</tr>
						</thead>
						<tbody>
						<g:each in="\${${propertyName}List}" status="i" var="${propertyName}">
							<tr class="\${(i % 2) == 0 ? 'even' : 'odd'}">
							<%  props.eachWithIndex { p, i ->
									if (i == 0) { %>
								<td><g:link action="show" id="\${${propertyName}.id}"><i class="halflings-icon edit"></i>&nbsp;\${fieldValue(bean: ${propertyName}, field: "${p.name}")}</g:link></td>
							<%      } else if (i < 6) {
										if (p.type == Boolean || p.type == boolean) { %>
								<td><g:formatBoolean boolean="\${${propertyName}.${p.name}}" /></td>
							<%          } else if (p.type == Date || p.type == java.sql.Date || p.type == java.sql.Time || p.type == Calendar) { %>
								<td><g:formatDate date="\${${propertyName}.${p.name}}" /></td>
							<%          } else { %>
								<td>\${fieldValue(bean: ${propertyName}, field: "${p.name}")}</td>
							<%  }   }   } %>
							</tr>
						</g:each>
						</tbody>
					</table>
					<div class="pagination pagination-left">
						<g:paginato total="\${${propertyName}Total}" prev="Sebelum" next="Sesudah"/>
					</div>
				</div>
			</div>
			
		</div>
	</body>
</html>
