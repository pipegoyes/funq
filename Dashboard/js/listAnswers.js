(function () {
	angular.module("dashboardApp")
	.component("listAnswers", {
		templateUrl :"templates/answer.html",
		controller: function ($rootScope){
			this.showAnswerModel = function(a){
				$rootScope.selectedQuestion = a;
				$("#answerModal").modal("show");
			}
		},
		bindings : {
			data : "="
		}
	});
})();
