var registrationModule=angular.module("registrationModule",["ngRoute","LocalStorageModule","ui.bootstrap","angularUtils.directives.dirPagination","cgBusy"]).config(function(t,l){t.when("/",{templateUrl:"AngularJS/Templates/login.html",controller:"loginController"}),t.when("/cita",{templateUrl:"AngularJS/Templates/cita.html",controller:"citaController"}),t.when("/citatrabajo",{templateUrl:"AngularJS/Templates/citatrabajo.html",controller:"citaController"}),t.when("/tallerCita",{templateUrl:"AngularJS/Templates/tallerCita.html",controller:"citaController"}),t.when("/cotizacionNueva",{templateUrl:"AngularJS/Templates/cotizacionNueva.html",controller:"cotizacionController"}),t.when("/cotizacionConsulta",{templateUrl:"AngularJS/Templates/cotizacionConsulta.html",controller:"cotizacionConsultaController"}),t.when("/cotizacionAutorizacion",{templateUrl:"AngularJS/Templates/cotizacionAutorizacion.html",controller:"cotizacionAutorizacionController"}),t.when("/trabajo",{templateUrl:"AngularJS/Templates/trabajo.html",controller:"trabajoController"}),t.when("/menu",{templateUrl:"AngularJS/Templates/menu.html",controller:"loginController"}),l.html5Mode({enabled:!0,requireBase:!1})});registrationModule.directive("resize",function(t){return function(l,e){var o=angular.element(t),r=function(){e.css("height",o.height()-20+"px")};o.bind("resize",function(){r()}),r()}});