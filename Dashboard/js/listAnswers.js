(function () {
	angular.module("dashboardApp")
	.component("listAnswers", {
		templateUrl :"templates/answer.html",
		controller: function ($rootScope){
			this.showAnswerModel = function(a){
				$rootScope.selectedQuestion = a;
				$("#answerModal").modal("show");
			}
			this.markQuestion = function(a){
				if($rootScope.markedQuestions.length >0){
					$rootScope.isMerging = true;
				}
				$rootScope.markedQuestions.push(a);	
				console.log("$rootScope.markedQuestions",$rootScope.markedQuestions)
			}
		},
		bindings : {
			data : "="
		}
	});
})();
