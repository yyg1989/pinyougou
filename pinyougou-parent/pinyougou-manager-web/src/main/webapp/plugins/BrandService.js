app.service('brandService',function ($http) {

    this.findAllBrand = function () {

        return $http.get('../brand/findAll.do');

    }


    this.findBrandByPage = function (entity,page,rows) {


        return $http.post('../brand/findByExample.do?page=' + page + '&rows=' + rows,entity);



    }


})