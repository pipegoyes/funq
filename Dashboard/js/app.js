
(function () {
	'use strict';
	var app = angular.module("dashboardApp", []);

	angular.module("dashboardApp")
	.controller("MainController", MainController);

	angular.module("dashboardApp")
	.service("apiService", apiService);

	apiService.$inject = ["$http"];
	function apiService($http){
		var service = this;

		this.getQuestions = function(){
		 var promise = $http.get('http://funqapi.azurewebsites.net/api/questions/list')
		 .then(function (response) {

	        return response.data;
	      });
	      return promise;
		}
		this.putAnswerQuestion = function(question){
			var text = $("#answerId").val();
			console.log("here i", text, question.id)

			var promise = $http.get('http://funqapi.azurewebsites.net/api/questions/answer?id='+question.id+'&a='+ encodeURI(text))
				.then(function (response, requestAnswer) {
		        	return response.data;
		      });
	      return promise;
		}

		this.aggredateQuestion = function(parent, child){

			var promise = $http.get('http://funqapi.azurewebsites.net/api/questions/combine?q1='+parent.id+'&q2='+child.id)
				.then(function (response, requestAnswer) {
		        return response.data;
		      });
	      return promise;
		}

	}

	MainController.$inject = ['apiService', "$scope", "$rootScope"];
	function MainController(apiService, scope, rootScope){
		apiService.getQuestions().then(function(response){
			scope.questions = response.filter(function(x){
				return x.answer.text;
			});
			scope.questionsWithoutAnswer = response.filter(function(x){
				return !x.answer.text;
			})
		});
		scope.sendAnswer = function(){	
			apiService.putAnswerQuestion(scope.selectedQuestion).then(function(){
				$("#answerModal").modal("hide");
			});
		}

		scope.aggregateQuestion = function(){
			var questionChild = rootScope.markedQuestions.pop();
			var questionParent = rootScope.markedQuestions.pop();
			apiService.aggredateQuestion(questionParent, questionChild)
					.then(function () {
						apiService.getQuestions()
								.then(function(response){
							scope.questions = response.filter(function(x){
								return x.answer.text;
							});
							scope.questionsWithoutAnswer = response.filter(function(x){
								return !x.answer.text;
							});
							rootScope.isMerging = false;
					});	
			});
			
		}

		rootScope.isMerging = false;
		rootScope.markedQuestions = [];

	}

	function Answer(data){
		this.Text = data.Text || "";
		this.QuestionId = data.QuestionId || 0;
		this.ArticleId = data.ArticleId || 0;
	}

	function Question(data){
		this.Text = data.Text || "";
		this.Author = data.Author || "unbekannt";
		this.IsDone = data.IsDone || false;
	}

})();