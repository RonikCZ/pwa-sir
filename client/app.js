angular.module('forum', ['angular-meteor', 'ui.router', 'accounts.ui'])
.config(function($urlRouterProvider, $stateProvider){

  //výchozí route
  $urlRouterProvider
    .when('/', '/topics')
    .otherwise('/topics');

  // stavy
        $stateProvider.state('topics', {
            url: '/topics',
            templateUrl: 'views/pages/topics.html',
            controller: 'TopicsController'
        });
        $stateProvider.state('topic', {
            url: '/topic/:topicId',
            templateUrl: 'views/pages/topic.html',
            controller: 'TopicController'
        });
        $stateProvider.state('thread', {
            url: '/thread/:threadId',
            templateUrl: 'views/pages/thread.html',
            controller: 'ThreadController'
});
})

.run(function($state){
})
.controller('TopicsController', function($scope){
        $scope.subscribe('topics');
        $scope.helpers({
            topics: function() {
                return Topics.find({}, {sort: {name:1}});
            }
        });
})
.controller('TopicController', function($scope, $stateParams, $meteor){
  $scope.subscribe('topic', function(){ return [$stateParams.topicId]; });
  $scope.subscribe('threads', function(){ return [$stateParams.topicId]; });
  $scope.helpers({
    topic: function() {
      return Topics.findOne({_id: $stateParams.topicId});
    },
    threads: function() {
      return Threads.find({topicId: $stateParams.topicId});
    }
  });
  $scope.createThread = function(thread){
    $meteor.call("createThread", $stateParams.topicId, thread.content).then(function(){
      thread.content = '';
    }).catch(function(){
      alert("Došlo k chybě při vytváření vlákna");
    });
  };
})
.controller('ThreadController', function($scope, $stateParams, $meteor){
  $scope.subscribe('thread', function(){ return [$stateParams.threadId]; });
  $scope.subscribe('posts', function(){ return [$stateParams.threadId]; });
  $scope.helpers({
    thread: function() {
      return Threads.findOne({_id: $stateParams.threadId});
    },
    posts: function() {
      return Posts.find({threadId: $stateParams.threadId});
    }
  });
  $scope.createPost = function(post){
    $meteor.call("createPost", $stateParams.threadId, post.content).then(function(){
      post.content = '';
    }).catch(function(){
      alert("Došlo k chybě při vytváření odpovědi");
     });
        };
});