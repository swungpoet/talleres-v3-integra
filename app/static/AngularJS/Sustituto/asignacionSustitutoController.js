registrationModule.controller('asignacionSustitutoController', function (MarkerCreatorService, $scope, $modal, $route, $rootScope, $location, localStorageService, alertFactory, globalFactory, sustitutoRepository, uploadRepository, citaRepository, commonService, ordenAnticipoRepository, trabajoRepository ) {
	
	$scope.motivos= [];
    $scope.address = '';
    $scope.show_mapUnidad = false;
    $scope.show_mapSustituto = false;
    $scope.select_sustituto = ''; 
    $scope.select_unidad = '';
    $scope.selectedMotivo = '';
    $scope.dataSustituto = '';
    $scope.datoUnidad = '';
        

	$scope.init_asignacion = function (){

         $scope.getMotivo();

	}


    $scope.getMotivo = function () {
        sustitutoRepository.getMotivo().then(function (motivo) {
            if (motivo.data.length > 0) {
                $scope.motivos = motivo.data;
                
                alertFactory.success("Motivos cargados");
            } else {
                alertFactory.info("No se encontraron motivos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar motivos");
        });
    }
  

    $scope.getUnidad = function (datoUnidad) {

        if ($scope.datoUnidad != '' || $scope.selectedMotivo != '') {

            $('#btnBuscar').button('Buscando...');
           // $scope.promise = citaRepository.getUnidadInformation(datoUnidad, $scope.userData.idUsuario).then(function (unidadInfo) {
            sustitutoRepository.getSustituto(datoUnidad, 0).then(function (unidadInfo) {
                $('.dataTableUnidad').DataTable().destroy();
                $scope.unidades = unidadInfo.data;
                if (unidadInfo.data.length > 0) {
                    globalFactory.waitDrawDocument("dataTableUnidad", "Unidad");
                    alertFactory.success('Datos encontrados');
                    $('#btnBuscar').button('reset');
                } else {
                    alertFactory.info('No se encontraron datos');
                    $('#btnBuscar').button('reset');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
                $('#btnBuscar').button('reset');
            });
        }else{

            alertFactory.info('Debe llenar todos los campos');
        }
    }

    $scope.getSustituto = function (dataSustituto) {

        if ($scope.dataSustituto != '' ) {
            $('#btnSustituto').button('Buscando...');
            sustitutoRepository.getSustituto(dataSustituto, 1).then(function (Info) {
                $('.dataTableSustituto').DataTable().destroy();
                $scope.sustitutos = Info.data;
                if (Info.data.length > 0) {
                    globalFactory.waitDrawDocument("dataTableSustituto", "Sustituto");
                    alertFactory.success('Datos encontrados');
                    $('#btnSustituto').button('reset');
                } else {
                    alertFactory.info('No se encontraron datos');
                    $('#btnSustituto').button('reset');
                }
            }, function (error) {
                alertFactory.error('Error al obtener los datos');
                $('#btnSustituto').button('reset');
            });
        }else{

            alertFactory.info('Debe llenar todos los campos');
        }
    }


    $scope.selUnidad = function (unidad) {
         $scope.show_mapUnidad = true;
         $scope.select_unidad=unidad.idUnidad;
         $scope.obtieneUbicacionUnidad ($scope.select_unidad, 'unidad');

    }

    $scope.selsustituto = function (sustituto) {
        $scope.show_mapSustituto = true;
        $scope.select_sustituto=sustituto.idUnidad;
        $scope.obtieneUbicacionUnidad ($scope.select_sustituto, 'sustituto');

    }
    

    // OBTENEMOS LA UBICACION ACTUAL DE LA UNIDAD Y DE NO TENERLA MANDAMOS UN ALERTA EN BOOTSTRAP
    $scope.obtieneUbicacionUnidad = function (idUnidad, tipo) {
        citaRepository.ubicaUnidad(idUnidad).then(function (result) {     
            debugger;   
             if (result.data.length > 0) {
               alertFactory.info('La unidad ha sido ubicada exitosamente');
               $scope.latitud = result.data[0].lat;
               $scope.longitud = result.data[0].long;
               $scope.direccion = result.data[0].direccion;
                $scope.bandera = 0;

                
                    if (tipo == 'unidad') {
                        MarkerCreatorService.createByCoords(parseFloat($scope.latitud), parseFloat($scope.longitud), function (marker) {
                            marker.options.labelContent = $scope.direccion;
                            $scope.autentiaMarker = marker;
                        });

                        $scope.map1 = {
                        centera: {
                            latitude: $scope.autentiaMarker.latitude,
                            longitude: $scope.autentiaMarker.longitude
                        },
                        zoom: 17,
                        markers: [],
                        control: {},
                        options: {
                            scrollwheel: false
                        }
                    }
                    $scope.map1.markers.push($scope.autentiaMarker); 

                }else{

                    MarkerCreatorService.createByCoords(parseFloat($scope.latitud), parseFloat($scope.longitud), function (marker) {
                        marker.options.labelContent = $scope.direccion;
                        $scope.autentiaMarker = marker;
                    });


                        $scope.map = {
                        center: {
                            latitude: $scope.autentiaMarker.latitude,
                            longitude: $scope.autentiaMarker.longitude
                        },
                        zoom: 17,
                        markers: [],
                        control: {},
                        options: {
                            scrollwheel: false
                        }
                    }
                    $scope.map.markers.push($scope.autentiaMarker);
                }    
            }else{
                alertFactory.info('La unidad aun no tiene ubicacion GPS');
                $scope.bandera = 1
            }
        }, function (error) {
            alertFactory.error('No se encontro la ubicacion de la Unidad');
       });
    }

    $scope.validateSustituto = function (){
        if ($scope.select_sustituto != '' || $scope.select_unidad != '' || $scope.selectedMotivo != '') {
            return true;
        }else{
            return false;
        }
    }

    $scope.addUnidadSusituto = function () {
        debugger;
        sustitutoRepository.addUnidadSustituto($scope.select_unidad, $scope.select_sustituto, $scope.selectedMotivo.idMotivo, $scope.userData.idUsuario ).then(function (motivo) {
            debugger;
        }, function (error) {
            alertFactory.error("Error al cargar motivos");
        });
    }

});