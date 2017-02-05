app.controller('schoolsCtrl', function($scope, $http) {
    
    // Retrieve all schools
    $scope.readAll = function(){
        
        $http({
            method: 'GET',
            url: 'api/school/read_all.php'
            
        }).then(function successCallback(response) {
            $scope.allSchools = response.data.records;
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve schools data.', 3000, 'red');
        });
    };
    
    // Retrieve members associated with selected school
    $scope.showSchoolMembers = function(school) {
        
        $scope.selectedSchool = school;
        
        $http({
            method: 'POST',
            data: { 'schoolID' : school.SchoolID },
            url: 'api/school/retrieve_members.php'
            
        }).then(function successCallback(response) {
            $scope.selectedSchool.members = response.data.records;
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve school members.', 3000, 'red');
        });
    };
});

