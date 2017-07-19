angular.module('todoApp', [])
  .controller('TodoListController', function($scope, $http) {
    var todoList = this;

    todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    todoList.remainingTodos = 0;

    function httpRequest(type, url, data){
        $http({
	    method: type,
	    url: url,
	    data: data
	}).then(function mySuccess(response) {	
		todoList.todos_data = angular.fromJson(response.data); 
		todoList.remaining();

		if (todoList.todos_data.deadTodos.length > 0){
		    todoList.showArchives = true;
		}
	    }, function myError(response){
	    	console.log("there was an error: " + response.status);
	});
    }

    //Initial data load
    httpRequest("GET", todoList.data_url, null);
 
    todoList.addTodo = function() {
      var newTodo = {text:todoList.todoText, done:false};
      todoList.todos_data.todos.push(newTodo);
      todoList.todoText = '';
      
      httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data)); 
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos_data.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var currentTodos = todoList.todos_data.todos;
      var temp = [];
      angular.forEach(currentTodos, function(todo) {
        if (!todo.done) {
		temp.push(todo);
	} else {
		todoList.showArchives = true;
		todoList.todos_data.deadTodos.push(todo);		
      	} 
      });

      todoList.todos_data.todos = temp;
      httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
    };

    todoList.clear = function(data) {
	switch(data) {
		case "todos":
			todoList.todos_data.todos = [];
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
		case "deadTodos":
			todoList.todos_data.deadTodos = [];	
			todoList.showArchives = false;
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
	    	case "all":			
			todoList.todos_data.todos = [];
			todoList.todos_data.deadTodos = [];	
			todoList.showArchives = false;
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
    	}//end switch
    };
  });
