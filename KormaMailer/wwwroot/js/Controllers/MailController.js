app.controller('MailController', ['$scope', function ($scope) {

    var vm = $scope;

    vm.templates = [
        "template 1",
        "template 2",
        "template 3"
    ];
    vm.functions = [
        "Testfunctie 1",
        "Testfunctie 2",
        "Testfunctie 3"
    ];
    vm.groupes = [
        "Testgroep 1",
        "Testgroep 2",
        "Testgroep 3"
    ];
}]);