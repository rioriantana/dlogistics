<%=packageName%>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="metro">
		<g:set var="entityName" value="\${message(code: '${domainClass.propertyName}.label', default: '${className}')}" />
		<title><g:message code="default.edit.label" args="[entityName]" /></title>
	</head>
	<body>
		<div class="pagination" role="navigation">
			<ul>
				<li><a class="home" href="\${createLink(uri: '/')}"><i class="icon-home"></i><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><i class="icon-list"></i><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><i class="icon-plus"></i><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="edit-${domainClass.propertyName}" class="content scaffold-edit" role="main">
			<g:if test="\${flash.message}">
			<div class="message" role="status">\${flash.message}</div>
			</g:if>
			<g:hasErrors bean="\${${propertyName}}">
			<ul class="errors" role="alert">
				<g:eachError bean="\${${propertyName}}" var="error">
				<li <g:if test="\${error in org.springframework.validation.FieldError}">data-field-id="\${error.field}"</g:if>><g:message error="\${error}"/></li>
				</g:eachError>
			</ul>
			</g:hasErrors>
			
			<div class="row-fluid sortable">
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon edit"></i><span class="break"></span><g:message code="default.edit.label" args="[entityName]" /></h2>
						<div class="box-icon">
							<a href="#" class="btn-close"><i class="icon-remove-sign"></i></a>
						</div>
					</div>
					<div class="box-content">
						<g:form method="post" class="form-horizontal" <%= multiPart ? ' enctype="multipart/form-data"' : '' %>>
							<g:hiddenField name="id" value="\${${propertyName}?.id}" />
							<g:hiddenField name="version" value="\${${propertyName}?.version}" />
							<fieldset class="form">
								<g:render template="form"/>
							</fieldset>
							<fieldset class="form-actions">
								<g:actionSubmit class="btn btn-primary" action="update" value="\${message(code: 'default.button.update.label', default: 'Update')}" />
								<g:actionSubmit class="btn btn-danger" action="delete" value="\${message(code: 'default.button.delete.label', default: 'Delete')}" formnovalidate="" onclick="return confirm('\${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
							</fieldset>
						</g:form>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
