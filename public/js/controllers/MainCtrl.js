angular.module('MainCtrl', []).controller('MainController', ['$scope', '$parse', 'Train', function ($scope, $parse, Train) {

    $scope.editing = false,
    $scope.trains = Train.query();
    $scope.save = function () {
            if (!$scope.runNumber || $scope.runNumber.length > 4) return;
            var train = new Train({
                TRAIN_LINE: $scope.trainLine.TRAIN_LINE,
                RUN_NUMBER: $scope.runNumber,
                ROUTE_NAME: $scope.routeName,
                OPERATOR_ID: $scope.operatorId
            });
            train.$save(function () {
                $scope.trains.push(train);
                $scope.trainLine = '';
                $scope.routeName = '';
                $scope.operatorId = '';
                $scope.runNumber = ''; // clear textbox
            });
            
        },
       
    
    //    $scope.editing = false;
    $scope.displayedCollection = [].concat($scope.trains);
    $scope.globalConfiguration = {
        
        newField: {},
        removeItem: function removeItem(row) {
            var index = $scope.trains.indexOf(row);
            console.log(index);
            if (index !== -1) {
                Train.delete({
                    id: $scope.trains[index]._id
                }, function () {});
                $scope.trains.splice(index, 1);
            }
        },
        
        updateTrain: function updateTrain (row) {
            var index = $scope.trains.indexOf(row);
            if ($scope.globalConfiguration.editing !== false) {
                $scope.trains[$scope.globalConfiguration.editing] = $scope.globalConfiguration.newField;
                Train.update({
                    id: $scope.trains[index]._id,
                    index
                });

                $scope.globalConfiguration.editing = false;

            }
        },
        edit: function edit(row) {
            var index = $scope.trains.indexOf(row);
            $scope.globalConfiguration.editing = index;
            $scope.globalConfiguration.newField = angular.copy(index);
        },
        cancel: function (index) {

            if ($scope.globalConfiguration.editing !== false) {
                $scope.trains[$scope.globalConfigurationediting] = $scope.globalConfiguration.newField;
                $scope.globalConfiguration.editing = false;
            }
        }
    };



    $scope.csv = {
        content: null,
        header: true,
        separator: ',',
        result: null
    };

    $scope.postData = function (results) {
        angular.forEach(results, function (index) {
            angular.forEach(index, function (v, k) {
                delete index[k];
                index[k.trim()] = v.trim();
            });
        });
        console.log(results);
        Train.saveData(results);
        $scope.trains = Train.query();
    };

            }]);