<% import grails.persistence.Event %>
<%=packageName%>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="metro">
		<g:set var="entityName" value="\${message(code: '${domainClass.propertyName}.label', default: '${className}')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<div class="pagination" role="navigation">
			<ul>
				<li><a class="home" href="\${createLink(uri: '/')}"><i class="icon-home"></i><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><i class="icon-list"></i><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><i class="icon-plus"></i><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div class="row-fluid sortable">
			<div class="box span12">
				<div class="box-header" data-original-title>
					<h2><i class="icon-folder-open"></i><span class="break"></span><g:message code="default.show.label" args="[entityName]" /></h2>
					<div class="box-icon">
						<a href="#" class="btn-close"><i class="icon-remove-sign"></i></a>
					</div>
				</div>
				<div class="box-content">
					<div id="show-${domainClass.propertyName}" class="content scaffold-show" role="main">
						<g:if test="\${flash.message}">
						<div class="message" role="status">\${flash.message}</div>
						</g:if>
						<table class="table">
						<%  excludedProps = Event.allEvents.toList() << 'id' << 'version'
							allowedNames = domainClass.persistentProperties*.name << 'dateCreated' << 'lastUpdated'
							props = domainClass.properties.findAll { allowedNames.contains(it.name) && !excludedProps.contains(it.name) }
							Collections.sort(props, comparator.constructors[0].newInstance([domainClass] as Object[]))
							props.each { p -> %>
							<g:if test="\${${propertyName}?.${p.name}}">
							<tr>
							
								<td class="span3">
								<span id="${p.name}-label" class="property-label"><g:message code="${domainClass.propertyName}.${p.name}.label" default="${p.naturalName}" /></span>
								</td class="span6">
								<td>
								<%  if (p.isEnum()) { %>
									<span class="property-value" aria-labelledby="${p.name}-label"><g:fieldValue bean="\${${propertyName}}" field="${p.name}"/></span>
								<%  } else if (p.oneToMany || p.manyToMany) { %>
									<g:each in="\${${propertyName}.${p.name}}" var="${p.name[0]}">
									<span class="property-value" aria-labelledby="${p.name}-label"><g:link controller="${p.referencedDomainClass?.propertyName}" action="show" id="\${${p.name[0]}.id}">\${${p.name[0]}?.encodeAsHTML()}</g:link></span>
									</g:each>
								<%  } else if (p.manyToOne || p.oneToOne) { %>
									<span class="property-value" aria-labelledby="${p.name}-label"><g:link controller="${p.referencedDomainClass?.propertyName}" action="show" id="\${${propertyName}?.${p.name}?.id}">\${${propertyName}?.${p.name}?.encodeAsHTML()}</g:link></span>
								<%  } else if (p.type == Boolean || p.type == boolean) { %>
									<span class="property-value" aria-labelledby="${p.name}-label"><g:formatBoolean boolean="\${${propertyName}?.${p.name}}" /></span>
								<%  } else if (p.type == Date || p.type == java.sql.Date || p.type == java.sql.Time || p.type == Calendar) { %>
									<span class="property-value" aria-labelledby="${p.name}-label"><g:formatDate date="\${${propertyName}?.${p.name}}" /></span>
								<%  } else if(!p.type.isArray()) { %>
									<span class="property-value" aria-labelledby="${p.name}-label"><g:fieldValue bean="\${${propertyName}}" field="${p.name}"/></span>
								<%  } %>
								</td>
							</tr>
							</g:if>
						<%  } %>
						</table>
						<g:form>
							<fieldset class="form-actions">
								<g:hiddenField name="id" value="\${${propertyName}?.id}" />
								<g:link class="btn btn-primary" action="edit" id="\${${propertyName}?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
								<g:actionSubmit class="btn btn-danger" action="delete" value="\${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('\${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
							</fieldset>
						</g:form>
					</div>
				</div>
			</div>
	</body>
</html>
