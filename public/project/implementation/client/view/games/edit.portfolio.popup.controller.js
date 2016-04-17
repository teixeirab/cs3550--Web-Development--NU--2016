(function(){
    "use strict";
    angular
        .module("SimulyApp")
        .controller("EditPortfolioPopupController", EditPortfolioPopupController);

    function EditPortfolioPopupController(portfolio, $scope, PortfolioService, $rootScope, $route) {
        var vm = this;
        vm.init = init;
        $scope.cancel = cancel;
        $scope.editPortfolio= editPortfolio;


        function init() {
            console.log(portfolio)
            $scope.portfolio = portfolio;
        }
        init();

        function editPortfolio (portfolio){
            var newPortfolio = {
                _id: game._id,
            };

            PortfolioService
                .updatePortfolio(portfolio._id, newPortfolio)
                .then(function (response) {
                    if (response.data) {
                        $route.reload();
                        $rootScope.modalInstance.dismiss('cancel');
                    }
                });
        }

        function cancel() {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();
