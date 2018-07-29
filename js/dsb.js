var app = angular.module('dsb', ['ionic']);

app.config(
  function ($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

    //将tabs固定在页面底部(默认在Android是在顶部)
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('start', {
        url: '/dsbStart',
        templateUrl: 'tpl/start.html'
      })
      .state('main', {
        url: '/dsbMain',
        templateUrl: 'tpl/main.html',
        controller: 'mainCtrl'
      })
      .state('detail', {
        url: '/dsbDetail/:did',
        templateUrl: 'tpl/detail.html',
        controller:'detailCtrl'
      })
      .state('order', {
        url: '/dsbOrder/:did',
        templateUrl: 'tpl/order.html',
        controller:'orderCtrl'
      })
      .state('myOrder', {
        url: '/dsbMyOrder',
        templateUrl: 'tpl/myOrder.html',
        controller:'myOrderCtrl'
      });

    $urlRouterProvider.otherwise('/dsbStart');

  });

//每次发网络请求时都能够有个加载中的遮盖层,自定义服务
app.service('$dsbHttp',
  ['$ionicLoading','$http',function ($ionicLoading,$http) {
    this.sendRequest = function (url,func) {
      $ionicLoading.show({
        template:'加载中..'
      });

      $http.get(url).success(function (data) {
        func(data);
        $ionicLoading.hide();
      })

    }

}]);


app.controller('bodyCtrl', ['$scope', '$state', function ($scope, $state) {

  $scope.jump = function (desState, args) {
    $state.go(desState, args);
  }

}]);

app.controller('mainCtrl', ['$scope','$dsbHttp',
  function ($scope, $dsbHttp) {
    $scope.bookList = [];
    $scope.hasMore = true;
    $scope.inputTxt = {kw: ''};

    //请求服务器端拿数据
      $dsbHttp.sendRequest(
        'data/book_getbypage.php',
        function (data) {
          $scope.bookList = data;
        }
      );

    //处理加载更多
    $scope.loadMore = function () {
      $dsbHttp.sendRequest(
        'data/book_getbypage.php?start=' + $scope.bookList.length,
        function(data) {
          if (data.length < 5) {
            $scope.hasMore = false;
          }
          $scope.bookList = $scope.bookList.concat(data);
          $scope.$broadcast('scroll.infiniteScrollComplete')
        }
      )
    };

    //处理搜索
    $scope.$watch('inputTxt.kw', function (newValue, oldValue) {
      //console.log(newValue, oldValue);
      if (newValue.length > 0) {
        $dsbHttp.sendRequest(
          'data/book_getbykw.php?kw=' + newValue
          ,
          function (data) {
            //console.log(data);
            if(data.length>0)
            {
              $scope.bookList = data;
            }
          }
        )
      }
    });
  }
]);

app.controller('detailCtrl',
  ['$scope','$dsbHttp', '$stateParams',function ($scope,$dsbHttp,$stateParams) {
    //接收到参数
    //console.log($stateParams);
    $dsbHttp.sendRequest(
      'data/book_getbyid.php?did='+$stateParams.did,
      function (data) {
        //console.log(data);
        $scope.book = data[0];
      }
    )

}]);

app.controller('orderCtrl',
  ['$scope','$dsbHttp','$stateParams','$httpParamSerializerJQLike',
    function ($scope,$dsbHttp,$stateParams,$httpParamSerializerJQLike) {
      //console.log($stateParams);

      $scope.submitResult= "";

      $scope.order = {
        user_name:'',
        sex:'',
        phone:'',
        addr:'',
        did:$stateParams.did
      };

      //$httpParamSerializerJQLike
      $scope.submitOrder = function () {
        //验证当前用户输入数据的完整性
        //console.log( $scope.order);
        //如果数据是完整的，可以将对象处理成urlEncoded字符串：sex=1&addr=&...
        var result = $httpParamSerializerJQLike($scope.order);
        //console.log(result);
        //发给服务器
        $dsbHttp.sendRequest(
          'data/order_add.php?'+result,
          function (data) {
           // console.log(data);
            if(data)
            {
              if(data.msg == 'success')
              {
                sessionStorage.setItem(
                  'phone',$scope.order.phone);
                $scope.submitResult = "下单成功，订单编号为:"+data.oid;
              }
              else if(data.msg == 'error'){
                $scope.submitResult = "下单失败";
              }
            }
          }
        )
      }

  }]);

app.controller('myOrderCtrl',
  ['$scope','$dsbHttp',
    function ($scope,$dsbHttp) {
      $scope.orderList = [];
      //取得下单成功时的手机号
      var myPhone = sessionStorage.getItem('phone');
      //console.log(myPhone);
      //根据手机号 发起网络请求，拿数据回来
      $dsbHttp.sendRequest(
        'data/order_getbyphone.php?phone='+myPhone,
        function (data) {
          //console.log(data);
          $scope.orderList = data;
        }
      )
  }]);








