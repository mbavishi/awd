var app = angular.module("myApp", []);
app.controller("myCTRL", function ($scope, $http) {
  $scope.list = [];
  $scope.newData = {};
  $scope.temp = 0;
  $scope.order = "Ascending";
  $scope.upda = {};

  $scope.userList = [
    { userID: "User1", pwd: "user1" },
    { userID: "User2", pwd: "user1" },
    { userID: "User3", pwd: "user1" },
    { userID: "User4", pwd: "user1" },
  ];

  $scope.stat;
  $scope.authenticate = function (id, pass) {
    for (i in $scope.userList) {
      if ($scope.userList[i].userID == id) {
        $scope.stat = 1;
        break;
      } else {
        $scope.stat = 0;
      }
    }
  };

  $scope.getData = () => {
    $http.get("/api/get").then((res) => {
      $scope.list = res.data;
    });
  };

  $scope.addData = () => {
    $http.post("/api/post", $scope.newData).then((res) => {
      $scope.list = res.data;
      $scope.getData();
      $scope.newData = {};
    });
  };

  $scope.delete = (item) => {
    $http.delete(`/api/delete/${item.proID}`).then((res) => {
      $scope.list = res.data;
      $scope.getData();
    });
  };

  $scope.update = (item) => {
    $scope.temp = 1;
    $scope.upda = {
      proID: item.proID,
      proName: item.proName,
      price: item.price,
      qty: item.qty,
    };
  };

  $scope.updateData = () => {
    $http.put("/api/put", $scope.upda).then((res) => {
      $scope.list = res.data;
      $scope.getData();
      $scope.temp = 0;
    });
  };

  $scope.getData();
});
