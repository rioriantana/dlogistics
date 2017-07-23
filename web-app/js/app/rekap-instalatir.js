
app.controller('RekaKinerjaInstalatirCtrl', 
  ['$scope', '$http',
  function ($scope, $http) {

  $scope.instalatirs = [];

  $scope.open = function($event, n) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope[n] = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
    

  $scope.today = function() {
    $scope.dtFrom = new Date();
    $scope.dtTo = new Date();
  };

  $scope.openRekap = function() {
		$http({
  		url: appContext + '/rekap/rincianKinerjaInstalatir',
  		method: "POST",
  		data: { 'id' : $scope.instalatir, 'dtFrom': $scope.dtFrom, 'dtTo': $scope.dtTo }
		})
		.then(function(response) {
				$scope.kinerjas = response.data.list;
				$scope.rekaps = response.data.rekap;
				$scope.visible = $scope.rekaps.length > 0;
			}, 
			function(response) { // optional
				// failed
			}
		);
  };

  $scope.openRekapan = function() {
    $http({
      url: appContext + '/rekap/testRekapInstalatir',
      method: "POST",
      data: { 'dtFrom': $scope.dtFrom, 'dtTo': $scope.dtTo }
    })
    .then(function(response) {
        $scope.rekaps = response.data;
        $scope.visible = $scope.rekaps.length > 0;
      }, 
      function(response) { // optional
        // failed
      }
    );
  };

  $scope.visible = false;

  $scope.loadInstalatir = function() {
    $http.get(appContext + "/rekap/listInstalatir/" + $scope.pencarian)
		.success(function(response) {
			$scope.instalatirs = response;
			$scope.instalatir = $scope.instalatirs[0].id;
			});
  };

  $scope.pencarian = '';
  $scope.loadInstalatir();
  $scope.today();

  $scope.bobotNilai = function (hasil, jml) {
    if(hasil == 'Laik Operasi')
      return jml;
    else if(hasil == 'Laik Operasi dengan catatan')
      return 0.5 * jml;
    return 0;
  };

  $scope.getSumPelanggan = function() {
    var total = 0;
    for(var i = 0; i < $scope.rekaps.length; i++) {
        var rekap = $scope.rekaps[i];
        total += rekap.count;
    }
    return total;
  };

  $scope.getSumNilai = function() {
    var total = 0;
    for(var i = 0; i < $scope.rekaps.length; i++) {
        var rekap = $scope.rekaps[i];
        total += ($scope.bobotNilai(rekap.hasil, rekap.count));
    }
    return total;
  };

  $scope.getSumKinerja = function() {
    var plg = $scope.getSumPelanggan();
    if(plg > 0)
      return 100 * $scope.getSumNilai()/plg;
    return 0;
  };

  $scope.getPeringkat = function() {
    var sumKinerja = $scope.getSumKinerja();
    if(sumKinerja >= 90) {
      return "A";
    } else if(sumKinerja >= 80) {
      return "A-";
    } else if(sumKinerja >= 76) {
      return "B+";
    } else if(sumKinerja >= 72) {
      return "B";
    } else if(sumKinerja >= 68) {
      return "B-";
    } else if(sumKinerja >= 62) {
      return "C+";
    } else if(sumKinerja >= 56) {
      return "C-";
    } else if(sumKinerja >= 45) {
      return "D";
    }
    return "E";
  };

  $scope.getKeterangan = function() {
    var sumKinerja = $scope.getSumKinerja();
    if(sumKinerja >= 90) {
      return "Sangat Memuaskan";
    } else if(sumKinerja >= 80) {
      return "Memuaskan";
    } else if(sumKinerja >= 76) {
      return "Sangat Baik";
    } else if(sumKinerja >= 72) {
      return "Baik";
    } else if(sumKinerja >= 68) {
      return "Kurang Baik";
    } else if(sumKinerja >= 62) {
      return "Lebih dari Cukup";
    } else if(sumKinerja >= 56) {
      return "Cukup Baik";
    } else if(sumKinerja >= 45) {
      return "Kurang";
    }
    return "Sangat Kurang";
  };

}]);
