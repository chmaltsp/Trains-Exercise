angular.module('TrainService', []).factory('Train', function($resource) {
    
//        return $http.get('api/trains');
//            return $resource('/api/trains');
    return $resource('api/trains/:id', { id: '@_id' }, {
            'update': { method:'PUT' },
            'saveData': { method: 'POST', isArray: false}
          });
         
  
     

});