var app = angular.module('dds.rekap.konsuil', ['ui.bootstrap'])

app.service('userService', function() {
  this.peringkat = function(nilai, jumlahPelanggan) { 
    var sumKinerja = nilai / jumlahPelanggan * 100;
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
})

.controller('ModalInstanceCtrl', 
  ['$scope', '$http', '$modalInstance', 'rekapAreas', 'dtFrom', 'dtTo', 'userService',
  function ($scope, $http, $modalInstance, rekapAreas, dtFrom, dtTo, userService) {

  $scope.rekapAreas = rekapAreas;
  $scope.dtFrom = dtFrom;
  $scope.dtTo = dtTo;
  $scope.peringkat = userService.peringkat;
  $scope.visibleRincian = false;

  $scope.ok = function () {
    if($scope.visibleRincian) {
      $scope.visibleRincian = false;
    } else {
      $modalInstance.dismiss('ok');
    }
  };

  $scope.sumFieldArea = function(fn) {
    var total = 0;
    for(var i = 0; i < $scope.rekapAreas.length; i++) {
        total += $scope.rekapAreas[i][fn];
    }
    return total;
  };

  $scope.openRincianArea = function(rayonId, day1, day2, jumlahPelanggan) {
    if(jumlahPelanggan == 0)
      return;
    $scope.rayonId = rayonId;
    $scope.day1 = day1;
    $scope.day2 = day2;
    $scope.totalItems = jumlahPelanggan;
    $scope.visibleRincian = jumlahPelanggan > 0;
    $scope.numPages = Math.ceil(jumlahPelanggan / $scope.itemsPerPage);;

    $scope.setPage(1);
  };

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    
    $http({
      url: appContext + '/kinerja/openRincianArea',
      method: "POST",
      data: { 'dtFrom': $scope.dtFrom, 'dtTo': $scope.dtTo, 'rayonId': $scope.rayonId, 'day1': $scope.day1, 'day2': $scope.day2, 'offset': begin, 'max': $scope.itemsPerPage }
    })
    .then(function(response) {
        $scope.rincians = response.data;
      }
    );
  };

  $scope.pageChanged = function() {
    $scope.setPage($scope.currentPage);
  };

  $scope.itemsPerPage = 15;

}])

.controller('RekapWilayahCtrl', 
  ['$scope', '$http', '$modal', 'userService',
  function ($scope, $http, $modal, userService) {

  $scope.openArea = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        rekapAreas: function () {
          return $scope.rekapAreas;
        },
        dtFrom: function () {
          return $scope.dtFrom;
        },
        dtTo: function () {
          return $scope.dtTo;
        }
      }
    });

  };

  // untuk membuka datePicker
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

  $scope.openRekapWilayah = function() {
		$http({
  		url: appContext + '/kinerja/openRekapWilayah',
  		method: "POST",
  		data: { 'dtFrom': $scope.dtFrom, 'dtTo': $scope.dtTo }
		})
		.then(function(response) {
				$scope.rekaps = response.data.rekaps;
				$scope.visible = $scope.rekaps.length > 0;
			}, 
			function(response) { // optional
				// failed
			}
		);
  };

  $scope.openRekapArea = function(id) {
    $http({
      url: appContext + '/kinerja/openRekapArea',
      method: "POST",
      data: { 'dtFrom': $scope.dtFrom, 'dtTo': $scope.dtTo, 'id': id }
    })
    .then(function(response) {
        $scope.rekapAreas = response.data.rekaps;
        $scope.openArea('lg');
      }, 
      function(response) { // optional
        // failed
      }
    );
  };

  $scope.sumField = function(fn) {
    var total = 0;
    for(var i = 0; i < $scope.rekaps.length; i++) {
        total += $scope.rekaps[i][fn];
    }
    return total;
  };

  $scope.today();

  $scope.peringkat = userService.peringkat;

}]);
