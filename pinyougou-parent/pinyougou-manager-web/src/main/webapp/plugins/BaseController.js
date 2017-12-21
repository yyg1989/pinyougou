app.controller('baseController',function ($scope) {


    $scope.reloadList = function () {

        $scope.findByPage($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage)


    }


    $scope.paginationConf = {

        currentPage: 1,

        totalItems: 10,

        itemsPerPage: 10,

        perPageOptions: [10, 20, 30, 40, 50],

        onChange: function () {
            $scope.reloadList();//重新加载
        }
    };
})