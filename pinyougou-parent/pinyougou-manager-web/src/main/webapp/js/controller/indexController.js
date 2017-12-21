app.controller('indexController',function ($scope,$controller,loginService) {

   /* $controller.controller('baseController',{$scope:$scope})*/

    $scope.getName = function () {

        loginService.getName().success(function (data) {

            $scope.loginName = "你好 " +  data.name;

        })

    }



})