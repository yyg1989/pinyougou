app.controller('brandController', function ($scope, $http,brandService,$controller) {

   $controller('baseController',{$scope:$scope});


    $scope.searchEntity={}

    $scope.findByPage = function (page,rows) {

        /* $http.get('../brand/findPage.do?page=' + page + '&rows=' + rows).success(function (data) {


             $scope.list = data.rows;

             $scope.paginationConf.totalItems = data.total;

         })*/

        brandService.findBrandByPage($scope.searchEntity,page,rows).success(function (data) {


            $scope.list = data.rows;

            $scope.paginationConf.totalItems = data.total;


        })
    }

    $scope.addBrand = function () {
        var methodName = "add";
        if($scope.entity.id != null){

            methodName = "update";


        }
        $http.post('../brand/'+ methodName +'.do',$scope.entity).success(function (data) {

            if(data.success){

                $scope.reloadList();

            }else{

                alert(data.message);


            }


        })

    }

    $scope.findById = function (id) {

        $http.get('../brand/findById.do?id=' + id).success(function (data) {

            $scope.entity = data;


        })


    }
    $scope.selectIds = [];
    $scope.updateSelect = function ($event, id) {

        if($event.target.checked) {
            $scope.selectIds.push(id);
        }else {

            var index = $scope.selectIds.indexOf(id);
            $scope.selectIds.splice(index,1);

        }


    }
    $scope.dele = function () {

        $http.get('../brand/deleteByIds.do?ids=' +  $scope.selectIds).success(function (data) {

            if(data.success){

                $scope.reloadList();

            }else{

                alert(data.message);


            }


        })


    }

})
