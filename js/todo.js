angular.module('todoApp', [])
  .controller('TodoListController', function($scope, $http) {
    var todoList = this;

    todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    todoList.remainingTodos = 0;
    todoList.user = "Guest";
    todoList.selectedUser = todoList.user;

    todoList.setUser = function(user) {
        todoList.user = user;
	todoList.showArchives = false;

	//black out data for UX as user waits for their data to return and display
	todoList.todos_data.todos = [];
	todoList.todos_data.deadTodos = [];
    	
	switch(user) {
		case "Mom":
			todoList.data_url = "https://api.myjson.com/bins/79i8j";
    			httpRequest("GET", todoList.data_url, null);
			break;
		case "Pappa":
			todoList.data_url = "https://api.myjson.com/bins/12thar";
    			httpRequest("GET", todoList.data_url, null);
			break;
		case "Jules":
			todoList.data_url = "https://api.myjson.com/bins/9n8nn";
    			httpRequest("GET", todoList.data_url, null);
			break;
		case "Celia":
			todoList.data_url = "https://api.myjson.com/bins/s3oer";
    			httpRequest("GET", todoList.data_url, null);
			break;
		case "Guest":
			todoList.data_url = "https://api.myjson.com/bins/16ez9b";
    			httpRequest("GET", todoList.data_url, null);
			break;
	}
    }

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

    function getObjectKeyIndex(obj, keyToFind) {
    	var i = 0;

    	for (key in obj) {
        	if (obj[key].text == keyToFind) {
            		return i;
        	}
        	i++;
    	}

    	return null;
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
	var ok = confirm(data + " WILL BE PERMENTLY DELETED.");
	
	if (ok) {
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
	    	case "everything":			
			todoList.todos_data.todos = [];
			todoList.todos_data.deadTodos = [];	
			todoList.showArchives = false;
			httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	    		break;
    	    }
	}
    };

    todoList.removeTodo = function(todo) {
	var todoIndex = getObjectKeyIndex(todoList.todos_data.todos, todo.text);
	
	var ok = confirm("ARE YOU SURE? YOU CAN'T GET IT BACK ONCE YOU DELETE IT.");    
	
	if (ok) {
	    todoList.todos_data.todos.splice(todoIndex,1);
	    httpRequest("PUT", todoList.data_url, angular.toJson(todoList.todos_data));
	}
    };
  });
