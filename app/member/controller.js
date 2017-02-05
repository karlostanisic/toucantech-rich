app.controller('membersCtrl', function($scope, $http) {
    
    // Delete member 
    $scope.delete = function(memberID){
        
        // Delete member confirmation
        if(confirm("Are you sure you want to delete this member?")){

            $http({
                method: 'POST',
                data: { 'memberID' : memberID },
                url: 'api/member/delete.php'
            }).then(function successCallback(response) {
                Materialize.toast(response.data, 3000);
                
                // Refresh members 
                $scope.readAll();
            }, function errorCallback(response) {
                Materialize.toast('Unable to delete member.', 3000, 'red');
            });
        }
    };
    
    // Update member
    $scope.update = function(){
        $http({
            method: 'POST',
            data: {
                'memberID' : $scope.memberID,
                'name' : $scope.name,
                'emailAddress' : $scope.emailAddress
            },
            url: 'api/member/update.php'
        }).then(function successCallback(response) {
            Materialize.toast(response.data, 3000);
            
            // If successful, close modal
            $('#modal-form-member').modal('close');
            
            // Clear form and $scope variables
            $scope.clearMemberForm();
            
            // Refresh members array
            $scope.readAll();
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to update member.', 3000, 'red');
        });
    };
    
    // Activate form for update and retrieve member data
    $scope.read = function(memberID){
        
        // Change modal title, we use same form for creating and updating
        $('#modal-form-member-title').text("Edit Member");
        
        // Hide/show appropriate buttons
        $('#btn-update-member').show();
        $('#btn-create-member').hide();
        
        // Show part of form for member's school association 
        $('#form-member-school-section').show();

        $http({
            method: 'POST',
            data: { 'memberID' : memberID },
            url: 'api/member/read.php'
        }).then(function successCallback(response) {
            $scope.memberID = response.data.MemberID;
            $scope.name = response.data.Name;
            $scope.emailAddress = response.data.EmailAddress;
            
            // Retrieve schools associated with selected member
            $scope.retrieveSchools($scope.memberID);
            
            // Open modal for member update
            $('#modal-form-member').modal('open');
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve member data.', 3000, 'red');
        });
    };
    
    // Retrieve all members
    $scope.readAll = function(){
        $http({
            method: 'GET',
            url: 'api/member/read_all.php'
            
        }).then(function successCallback(response) {
            $scope.allMembers = response.data.records;
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve members data.', 3000, 'red');
        });
    };
    
    // Retrieve all schools for select
    $scope.readAllSchools = function() {
        $http({
            method: 'GET',
            url: 'api/school/read_all.php'
            
        }).then(function successCallback(response) {
            $scope.allSchools = response.data.records;
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve schools data.', 3000, 'red');
        });
    };
    
    // Retrieve schools associated with selected member
    $scope.retrieveSchools = function(memberID) {
        $http({
            method: 'POST',
            data: { 'memberID' : memberID },
            url: 'api/member/retrieve_schools.php'
            
        }).then(function successCallback(response) {
            $scope.schools = response.data.records;
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to retrieve schools associated with member.', 3000, 'red');
        });
    };
    
    // Remove school association
    $scope.removeSchool = function(schoolID) {
        $http({
            method: 'POST',
            data: {
                'memberID' : $scope.memberID,
                'schoolID' : schoolID
            },
            url: 'api/member/remove_school.php'
            
        }).then(function successCallback(response) {
            Materialize.toast(response.data, 3000);
            
            // Refresh list of associated schools
            $scope.retrieveSchools($scope.memberID);
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to remove school.', 3000, 'red');
        });
    };
    
    // Associate selected school with member
    $scope.addSchool = function(schoolID) {
        $http({
            method: 'POST',
            data: {
                'memberID' : $scope.memberID,
                'schoolID' : schoolID
            },
            url: 'api/member/add_school.php'
            
        }).then(function successCallback(response) {
            
            Materialize.toast(response.data, 3000);
            
            // Refresh list of associated schools
            $scope.retrieveSchools($scope.memberID);
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to add school.', 3000, 'red');
        });
    };
    
    // Clear form/$scope variables
    $scope.clearMemberForm = function(){
        $scope.memberID = "";
        $scope.name = "";
        $scope.emailAddress = "";
        $scope.schoolID = "";
    };
    
    // Show form for new member
    $scope.showCreateMemberForm = function(){
        
        // Clear form/$scope variables
        $scope.clearMemberForm();
        
        // Change form title - we use same form for creating and updating
        $('#modal-form-member-title').text("Create New Member");
        
        // Hide/show appropriate buttons
        $('#btn-update-member').hide();
        $('#btn-create-member').show();
        
        // This form section is not for new members
        $('#form-member-school-section').hide();
    };
    
    // Create new member
    $scope.create = function(){
        
        $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'emailAddress' : $scope.emailAddress
            },
            url: 'api/member/create.php'
            
        }).then(function successCallback(response) {
            Materialize.toast(response.data, 3000);
            
            // If successful, close form/modal
            $('#modal-form-member').modal('close');
            
            // Clear form/$scope variables
            $scope.clearMemberForm();
            
            // Refresh members list
            $scope.readAll();
            
        }, function errorCallback(response) {
            Materialize.toast('Unable to create new member.', 3000, 'red');
        });
    };

});