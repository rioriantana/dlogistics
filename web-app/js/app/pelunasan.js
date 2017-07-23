var app = angular.module('dds.konsuil.pelunasan', ['ui.bootstrap']);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'informasi', '$log', function($scope, $modalInstance, informasi, $log) {
    $log.log(informasi);
    $scope.informasi = informasi;
    $scope.ok = function() {
        $modalInstance.close('OK');
    };
}]);

app.controller('PelunasanCtrl', ['$scope', '$http', '$modal', '$log', function($scope, $http, $modal, $log) {
    $scope.tagihan = {}

    $scope.cetak = function() {
        var mywindow = window.open('', 'Cetak', 'height=400,width=600');
        var css = '@page { size: 100mm 148mm }' +
            '@media print { html, body { width: 100mm; height: 148mm; } }' +
            '.row { margin-left: 20px; }' +
            '.label { float: left; width: 200px; }' +
            '.value { margin-left: 20px; }' +
            '.center { text-align: center; width: 400px; }';
        
        var createRow = function(label, value) {
            return '<div class="row"><div class="label">' + label + '</div><div class="value">' + value + '</div></div>';
        }
        
        var createHeader = function(label) {
            return '<div class="center">' + label + '</div>';
        }
        
        mywindow.moveTo(0, 0);
        mywindow.resizeTo(screen.availWidth, screen.availHeight);
        mywindow.document.write('<html><head><title>Cetak</title>');
        mywindow.document.write('<style>');
        mywindow.document.write(css);
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(createHeader('STRUK PEMBAYARAN KONSUIL'));
        mywindow.document.write(createHeader('---'));
        mywindow.document.write(createHeader(' '));
        mywindow.document.write(createRow('No. Pendaftaran: ', $scope.tagihan.nomorPendaftaran));
        mywindow.document.write(createRow('Nama: ', $scope.tagihan.nama));
        mywindow.document.write(createRow('Alamat: ', $scope.tagihan.alamat));
        mywindow.document.write(createRow('Daya: ', $scope.tagihan.tarifDaya));
        mywindow.document.write(createRow('Biaya: ', $scope.tagihan.biaya));
        mywindow.document.write(createRow('Admin: ', $scope.tagihan.biayaAdmin));
        mywindow.document.write(createRow('Total Tagihan: ', $scope.tagihan.totalTagihan));
        mywindow.document.write(createRow('#Reff: ', $scope.tagihan.referensiPembayaran));
        mywindow.document.write('</body></html>');
        
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        mywindow.close();
        
        return true;
        
    }
    
    $scope.open = function(size, info) {
        $modal.open({
            templateUrl: 'informasi.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                informasi: function() {
                    return info;
                }
            }
        });
    }
    
    $scope.inquiry = function() {
		$http({
  		    url: appContext + '/pelunasan/inquiry',
  		    method: "POST",
  		    data: { 'nomorPendaftaran' : $scope.tagihan.nomorPendaftaran }
		}).then(function(response) {
			$log.log(response);
            if(response.data.responseCode == '00') {
				$scope.tagihan = response.data;
            } else {
                $scope.open('sm', response.data.message);
			}
        }, function(response) {
            $log.log(response);
		});
    }

    $scope.payment = function() {
		$http({
  		    url: appContext + '/pelunasan/payment',
  		    method: "POST",
  		    data: $scope.tagihan
		}).then(function(response) {
			$log.log(response);
            if(response.data.responseCode == '00') {
                $scope.open('sm', response.data.message);
            } else {
                $scope.open('sm', response.data.message);
			}
        }, function(response) {
            $log.log(response);
		});
    }

    $scope.clear = function() {
        $scope.tagihan = {}
    }
}]);
