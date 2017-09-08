
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
	        console.log(response);
	        return response.data;
	      });
	      return promise;
		}
//http://funqapi.azurewebsites.net/api/questions/list
		this.putAnswerQuestion = function(question){
			console.log(question);
			var promise = $http.get('http://funqapi.azurewebsites.net/api/questions/answer?id='+question.id+'&a='+ encodeURI(question.answer.text))
				.then(function (response, requestAnswer) {
		        console.log(response);
		        return response.data;
		      });
	      return promise;
		}

	}

	MainController.$inject = ['apiService', "$scope"];
	function MainController(apiService, scope){
		apiService.getQuestions().then(function(response){
			console.log("response",response)
			scope.questions = response.filter(function(x){
				return x.answer.text;
			});
			scope.questionsWithoutAnswer = response.filter(function(x){
				console.log(x.answer.text);
				return !x.answer.text;
			})
			console.log("questionsWithoutAnswer ", scope.questionsWithoutAnswer);
		});
		scope.sendAnswer = function(){	
			console.log("selectedQuestion", scope.selectedQuestion);
			apiService.putAnswerQuestion(scope.selectedQuestion);
		}

		scope.aggregateQuestion = function(){
			
		}

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