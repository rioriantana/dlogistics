var app=angular.module("dds.rekap.konsuil",["ui.bootstrap"]);
app.service("userService",function(){this.peringkat=function(a,d){var b=a/d*100;return 90<=b?"A":80<=b?"A-":76<=b?"B+":72<=b?"B":68<=b?"B-":62<=b?"C+":56<=b?"C-":45<=b?"D":"E"}}).controller("ModalInstanceCtrl",["$scope","$http","$modalInstance","rekapAreas","dtFrom","dtTo","userService",function(a,d,b,c,e,f,g){a.rekapAreas=c;a.dtFrom=e;a.dtTo=f;a.peringkat=g.peringkat;a.visibleRincian=!1;a.ok=function(){a.visibleRincian?a.visibleRincian=!1:b.dismiss("ok")};a.sumFieldArea=function(b){for(var c=0,e=
0;e<a.rekapAreas.length;e++)c+=a.rekapAreas[e][b];return c};a.openRincianArea=function(b,c,e,d){0!=d&&(a.rayonId=b,a.day1=c,a.day2=e,a.totalItems=d,a.visibleRincian=0<d,a.numPages=Math.ceil(d/a.itemsPerPage),a.setPage(1))};a.setPage=function(b){a.currentPage=b;d({url:appContext+"/kinerja/openRincianArea",method:"POST",data:{dtFrom:a.dtFrom,dtTo:a.dtTo,rayonId:a.rayonId,day1:a.day1,day2:a.day2,offset:(a.currentPage-1)*a.itemsPerPage,max:a.itemsPerPage}}).then(function(b){a.rincians=b.data})};a.pageChanged=
function(){a.setPage(a.currentPage)};a.itemsPerPage=15}]).controller("RekapWilayahCtrl",["$scope","$http","$modal","userService",function(a,d,b,c){a.openArea=function(c){b.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",size:c,resolve:{rekapAreas:function(){return a.rekapAreas},dtFrom:function(){return a.dtFrom},dtTo:function(){return a.dtTo}}})};a.open=function(b,c){b.preventDefault();b.stopPropagation();a[c]=!0};a.dateOptions={formatYear:"yy",startingDay:1};a.today=function(){a.dtFrom=
new Date;a.dtTo=new Date};a.openRekapWilayah=function(){d({url:appContext+"/kinerja/openRekapWilayah",method:"POST",data:{dtFrom:a.dtFrom,dtTo:a.dtTo}}).then(function(b){a.rekaps=b.data.rekaps;a.visible=0<a.rekaps.length},function(a){})};a.openRekapArea=function(b){d({url:appContext+"/kinerja/openRekapArea",method:"POST",data:{dtFrom:a.dtFrom,dtTo:a.dtTo,id:b}}).then(function(b){a.rekapAreas=b.data.rekaps;a.openArea("lg")},function(a){})};a.sumField=function(b){for(var c=0,d=0;d<a.rekaps.length;d++)c+=
a.rekaps[d][b];return c};a.today();a.peringkat=c.peringkat}]);app.controller("RekaKinerjaInstalatirCtrl",["$scope","$http",function(a,d){a.instalatirs=[];a.open=function(b,c){b.preventDefault();b.stopPropagation();a[c]=!0};a.dateOptions={formatYear:"yy",startingDay:1};a.today=function(){a.dtFrom=new Date;a.dtTo=new Date};a.openRekap=function(){d({url:appContext+"/rekap/rincianKinerjaInstalatir",method:"POST",data:{id:a.instalatir,dtFrom:a.dtFrom,dtTo:a.dtTo}}).then(function(b){a.kinerjas=b.data.list;a.rekaps=b.data.rekap;a.visible=0<a.rekaps.length},function(a){})};
a.openRekapan=function(){d({url:appContext+"/rekap/testRekapInstalatir",method:"POST",data:{dtFrom:a.dtFrom,dtTo:a.dtTo}}).then(function(b){a.rekaps=b.data;a.visible=0<a.rekaps.length},function(a){})};a.visible=!1;a.loadInstalatir=function(){d.get(appContext+"/rekap/listInstalatir/"+a.pencarian).success(function(b){a.instalatirs=b;a.instalatir=a.instalatirs[0].id})};a.pencarian="";a.loadInstalatir();a.today();a.bobotNilai=function(a,c){return"Laik Operasi"==a?c:"Laik Operasi dengan catatan"==a?.5*
c:0};a.getSumPelanggan=function(){for(var b=0,c=0;c<a.rekaps.length;c++)b+=a.rekaps[c].count;return b};a.getSumNilai=function(){for(var b=0,c=0;c<a.rekaps.length;c++)var d=a.rekaps[c],b=b+a.bobotNilai(d.hasil,d.count);return b};a.getSumKinerja=function(){var b=a.getSumPelanggan();return 0<b?100*a.getSumNilai()/b:0};a.getPeringkat=function(){var b=a.getSumKinerja();return 90<=b?"A":80<=b?"A-":76<=b?"B+":72<=b?"B":68<=b?"B-":62<=b?"C+":56<=b?"C-":45<=b?"D":"E"};a.getKeterangan=function(){var b=a.getSumKinerja();
return 90<=b?"Sangat Memuaskan":80<=b?"Memuaskan":76<=b?"Sangat Baik":72<=b?"Baik":68<=b?"Kurang Baik":62<=b?"Lebih dari Cukup":56<=b?"Cukup Baik":45<=b?"Kurang":"Sangat Kurang"}}]);app.controller("RekaKinerjaCtrl",["$scope","$http",function(a,d){a.wilayahs=[];a.areas=[];a.rekaps=[];a.open=function(b,c){b.preventDefault();b.stopPropagation();a[c]=!0};a.dateOptions={formatYear:"yy",startingDay:1};a.today=function(){a.dtFrom=new Date;a.dtTo=new Date};a.openRekap=function(){d({url:appContext+"/rekap/rincianKinerja",method:"POST",data:{id:a.area,dtFrom:a.dtFrom,dtTo:a.dtTo}}).then(function(b){a.kinerjas=b.data.list;a.rekaps=b.data.rekap;a.visible=0<a.rekaps.length},function(a){})};
a.visible=!1;a.loadWilayah=function(){d.get(appContext+"/rekap/listWilayah").success(function(b){a.wilayahs=b;a.wilayah=a.wilayahs[0].id;a.loadArea(a.wilayah)})};a.loadArea=function(b){d.get(appContext+"/rekap/listArea/"+b).success(function(b){a.areas=b;a.area=a.areas[0].id;a.visible=!1})};a.loadWilayah();a.today();a.bobotNilai=function(a,c){return 2>=a?c:4>=a?.5*c:0};a.getSumPelanggan=function(){for(var b=0,c=0;c<a.rekaps.length;c++)b+=a.rekaps[c].count;return b};a.getSumNilai=function(){for(var b=
0,c=0;c<a.rekaps.length;c++)var d=a.rekaps[c],b=b+a.bobotNilai(d.day,d.count);return b};a.getSumKinerja=function(){var b=a.getSumPelanggan();return 0<b?100*a.getSumNilai()/b:0};a.getPeringkat=function(){var b=a.getSumKinerja();return 90<=b?"A":80<=b?"A-":76<=b?"B+":72<=b?"B":68<=b?"B-":62<=b?"C+":56<=b?"C-":45<=b?"D":"E"};a.getKeterangan=function(){var b=a.getSumKinerja();return 90<=b?"Sangat Memuaskan":80<=b?"Memuaskan":76<=b?"Sangat Baik":72<=b?"Baik":68<=b?"Kurang Baik":62<=b?"Lebih dari Cukup":
56<=b?"Cukup Baik":45<=b?"Kurang":"Sangat Kurang"}}]);