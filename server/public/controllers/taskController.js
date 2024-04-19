var app = angular.module("taskApp", []);
app.controller("taskCtrl", function ($scope, $http) {
  $scope.getTask = function () {
    $http({
      method: "GET",
      url: "/tasks",
    }).then(
      function mySuccess(response) {
        $scope.tasks = response.data;
        console.log(response);
      },
      function myError(response) {
        $scope.tasks = response.statusText;
      }
    );
  };

  $scope.getTask();

  $scope.addTask = function () {
    $http({
      method: "POST",
      url: "/tasks",
      data: {
        task: $scope.taskInput,
        complete: false,
      },
    }).then(
      function mySuccess(response) {
        console.log("posting", response);
        $scope.getTask();
        $scope.taskInput = "";
      },
      function myError(response) {
        console.log(response);
      }
    );

    console.log("in addTask!", $scope.taskInput);
  };

  $scope.deleteTask = function () {
    task = this.task.id;
    console.log("delete", task);
    $http({
      method: "DELETE",
      url: `/tasks/${task}`,
    }).then(
      function mySuccess(response) {
        console.log("delete", response);
        $scope.getTask();
      },
      function myError(response) {
        console.log(response);
      }
    );
  };

  $scope.completeTask = function () {
    task = this.task.id;
    console.log("complete", task);
    $http({
      method: "PUT",
      url: `/tasks/${task}`,
    }).then(
      function mySuccess(response) {
        console.log("put", response);
        $scope.getTask();
      },
      function myError(response) {
        console.log(response);
      }
    );
  };
});
