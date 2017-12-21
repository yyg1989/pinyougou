 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{

            $scope.entity.parentId = $scope.parentId;

			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
                    $scope.findByParentId($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}


	$scope.findByParentId = function (parentId) {

        $scope.parentId = parentId;

		itemCatService.findByParentId(parentId).success(function (data) {

			$scope.list = data;

        })

    }


    //面包屑导航
	$scope.grand = 1;

	$scope.setGrand = function (value) {

        $scope.grand = value;

    }

    $scope.selectList = function (s_enetiy) {

		if($scope.grand == 1){

			$scope.entity_1 = null;
			$scope.entity_2 = null;

		}else if ($scope.grand == 2){

            $scope.entity_1 = s_enetiy;
            $scope.entity_2 = null;

		}else {
            $scope.entity_2 = s_enetiy;

        }

		$scope.findByParentId(s_enetiy.id);

    }


	//添加
	$scope.parentId = 0;





});	
